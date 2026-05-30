import {
  useState,
} from "react";

import PremiumCard from "../components/PremiumCard";

import {
  motion,
} from "framer-motion";

export default function Habits() {

  const [

    habits,

    setHabits,

  ] = useState(

    JSON.parse(

      localStorage.getItem(
        "habits"
      ) || "[]"
    )
  );

  const [

    input,

    setInput,

  ] = useState("");

  /* ADD HABIT */

  const addHabit =
    () => {

      const trimmed =
        input.trim();

      if (!trimmed)
        return;

      const newHabit = {

        id: Date.now(),

        title: trimmed,

        completed: false,
      };

      const updated = [

        newHabit,

        ...habits,
      ];

      setHabits(updated);

      localStorage.setItem(

        "habits",

        JSON.stringify(updated)
      );

      setInput("");
    };

  /* ENTER KEY */

  const handleKeyDown =
    e => {

      if (
        e.key === "Enter"
      ) {

        addHabit();
      }
    };

  /* TOGGLE */

  const toggleHabit =
    id => {

      const updated =
        habits.map(
          habit =>

            habit.id === id

              ? {

                  ...habit,

                  completed:
                    !habit.completed,
                }

              : habit
        );

      setHabits(updated);

      localStorage.setItem(

        "habits",

        JSON.stringify(updated)
      );
    };

  /* DELETE */

  const deleteHabit =
    id => {

      const updated =
        habits.filter(
          habit =>
            habit.id !== id
        );

      setHabits(updated);

      localStorage.setItem(

        "habits",

        JSON.stringify(updated)
      );
    };

  return (

    <div className="space-y-8">

      {/* HERO */}

      <div className="rounded-[40px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 backdrop-blur-xl p-10 shadow-2xl">

        <h1 className="text-6xl font-black">

          Habit System

        </h1>

        <p className="text-slate-400 text-xl mt-5 max-w-3xl">

          Build elite consistency through daily behavioral systems.

        </p>

      </div>

      {/* INPUT */}

      <PremiumCard className="p-8">

        <h2 className="text-3xl font-black mb-6">

          Add Habit

        </h2>

        <div className="flex flex-col md:flex-row gap-4">

          <input
            type="text"
            value={input}
            onChange={e =>
              setInput(
                e.target.value
              )
            }
            onKeyDown={
              handleKeyDown
            }
            placeholder="Enter a habit..."
            className="flex-1 rounded-2xl bg-white/5 border border-white/10 px-6 py-5 text-lg outline-none focus:border-cyan-400 transition-all"
          />

          <button
            onClick={addHabit}
            className="rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition-all px-8 py-5 font-bold text-lg"
          >

            Add Habit

          </button>

        </div>

      </PremiumCard>

      {/* HABITS */}

      <div className="space-y-5">

        {habits.length === 0 && (

          <PremiumCard className="p-10 text-center">

            <h2 className="text-3xl font-black">

              No habits yet

            </h2>

            <p className="text-slate-400 text-lg mt-4">

              Start building your productivity identity.

            </p>

          </PremiumCard>
        )}

        {habits.map(
          habit => (

            <motion.div
              key={habit.id}

              initial={{
                opacity: 0,
                y: 10,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}
            >

              <PremiumCard className="p-6 flex items-center justify-between gap-5">

                <div className="flex items-center gap-5">

                  <button
                    onClick={() =>
                      toggleHabit(
                        habit.id
                      )
                    }
                    className={`

                    w-8 h-8 rounded-full border-2 transition-all

                    ${
                      habit.completed

                        ? "bg-green-500 border-green-500"

                        : "border-white/20"
                    }
                    `}
                  />

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

                </div>

                <button
                  onClick={() =>
                    deleteHabit(
                      habit.id
                    )
                  }
                  className="text-red-400 hover:text-red-300 transition-all text-lg"
                >

                  Delete

                </button>

              </PremiumCard>

            </motion.div>
          )
        )}

      </div>

    </div>
  );
}