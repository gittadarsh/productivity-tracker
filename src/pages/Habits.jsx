import { useState } from "react";

import {
  Plus,
  Trash2,
  Check,
  Flame,
} from "lucide-react";

import PageWrapper from "../components/PageWrapper";

import PremiumCard from "../components/PremiumCard";

import {
  useHabitStore,
} from "../store/habitStore";

export default function Habits() {

  const [input, setInput] =
    useState("");

  const {
    habits,
    addHabit,
    toggleHabit,
    deleteHabit,
  } = useHabitStore();

  const handleAddHabit = () => {

    addHabit(input);

    setInput("");
  };

  return (

    <PageWrapper>

      <div className="space-y-8 pb-20">

        {/* HEADER */}

        <div className="rounded-[40px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 p-8">

          <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">

            Habit System

          </h1>

          <p className="text-slate-400 text-xl mt-3">

            Build elite routines with consistency.

          </p>

        </div>

        {/* ADD HABIT */}

        <PremiumCard className="rounded-[36px] p-6 border border-white/10 bg-white/[0.03]">

          <div className="flex gap-4">

            <input
              value={input}

              onChange={(e) =>
                setInput(
                  e.target.value
                )
              }

              onKeyDown={(e) => {

                if (e.key === "Enter") {

                  handleAddHabit();
                }
              }}

              placeholder="Add a new habit..."

              className="flex-1 bg-slate-900 border border-white/10 rounded-2xl px-6 py-5 text-xl outline-none focus:border-cyan-500"
            />

            <button
              onClick={handleAddHabit}
              className="w-16 h-16 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition-all flex items-center justify-center"
            >

              <Plus size={28} />

            </button>

          </div>

        </PremiumCard>

        {/* HABITS */}

        <div className="grid gap-5">

          {habits.length === 0 && (

            <PremiumCard className="rounded-[36px] p-10 text-center border border-white/10 bg-white/[0.03]">

              <h2 className="text-3xl font-bold text-slate-300">

                No habits yet

              </h2>

              <p className="text-slate-500 mt-3 text-lg">

                Start building your productivity system.

              </p>

            </PremiumCard>
          )}

          {habits.map((habit) => (

            <PremiumCard
              key={habit.id}
              className="rounded-[36px] p-6 border border-white/10 bg-white/[0.03]"
            >

              <div className="flex items-center justify-between">

                {/* LEFT */}

                <div className="flex items-center gap-5">

                  <button
                    onClick={() =>
                      toggleHabit(
                        habit.id
                      )
                    }

                    className={`

                    w-14 h-14 rounded-2xl flex items-center justify-center transition-all

                    ${
                      habit.completed
                        ? "bg-green-500"
                        : "bg-white/5 border border-white/10"
                    }
                    `}
                  >

                    <Check size={24} />

                  </button>

                  <div>

                    <h2 className={`

                    text-2xl font-bold

                    ${
                      habit.completed
                        ? "line-through text-slate-500"
                        : "text-white"
                    }
                    `}>

                      {habit.title}

                    </h2>

                    <div className="flex items-center gap-2 mt-2 text-orange-400">

                      <Flame size={18} />

                      <span>

                        {habit.streak}
                        {" "}
                        day streak

                      </span>

                    </div>

                  </div>

                </div>

                {/* DELETE */}

                <button
                  onClick={() =>
                    deleteHabit(
                      habit.id
                    )
                  }

                  className="w-14 h-14 rounded-2xl bg-red-500/10 hover:bg-red-500/20 transition-all flex items-center justify-center text-red-400"
                >

                  <Trash2 size={22} />

                </button>

              </div>

            </PremiumCard>
          ))}

        </div>

      </div>

    </PageWrapper>
  );
}