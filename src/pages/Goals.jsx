import { useState } from "react";

export default function Goals() {

  const [goals, setGoals] = useState([
    {
      title: "DSA Consistency",
      frequency: "Daily",
      streak: 12,
    },
    {
      title: "Workout",
      frequency: "Daily",
      streak: 7,
    },
  ]);

  const [newGoal, setNewGoal] =
    useState("");

  const addGoal = () => {

    if (!newGoal.trim())
      return;

    setGoals([
      ...goals,
      {
        title: newGoal,
        frequency: "Daily",
        streak: 0,
      },
    ]);

    setNewGoal("");
  };

  return (

    <div className="space-y-8">

      {/* HERO */}

      <div className="rounded-[36px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 backdrop-blur-xl p-8 md:p-10 shadow-2xl">

        <p className="text-cyan-400 font-semibold tracking-widest uppercase mb-3">

          Goal System

        </p>

        <h1 className="text-5xl md:text-6xl font-black leading-tight max-w-4xl">

          Build consistency,
          not fake productivity.

        </h1>

        <p className="text-slate-400 text-lg mt-6 max-w-2xl leading-relaxed">

          Your goals remain private between you and approved mentors.

        </p>

      </div>

      {/* ADD GOAL */}

      <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

        <div className="flex flex-col lg:flex-row gap-4">

          <input
            type="text"
            value={newGoal}
            onChange={(e) =>
              setNewGoal(e.target.value)
            }
            placeholder="Enter your goal..."
            className="flex-1 bg-white/5 border border-white/10 focus:border-cyan-400 transition-all duration-300 outline-none px-6 py-5 rounded-2xl text-lg placeholder:text-slate-500"
          />

          <button
            onClick={addGoal}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-[1.03] transition-all duration-300 px-8 py-5 rounded-2xl font-bold shadow-2xl"
          >

            ➕ Add Goal

          </button>

        </div>

      </div>

      {/* GOALS */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {goals.map((goal, index) => (

          <div
            key={index}
            className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-7 shadow-2xl"
          >

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-3xl font-black">
                  {goal.title}
                </h2>

                <p className="text-slate-400 mt-2">
                  {goal.frequency}
                </p>

              </div>

              <div className="text-green-400 font-bold text-xl">

                🔥 {goal.streak} Days

              </div>

            </div>

            <div className="flex gap-3 mt-10">

              <button className="bg-green-500 hover:bg-green-600 transition px-5 py-3 rounded-2xl font-semibold">
                Done
              </button>

              <button className="bg-yellow-500 hover:bg-yellow-600 transition px-5 py-3 rounded-2xl font-semibold">
                Progress
              </button>

              <button className="bg-red-500 hover:bg-red-600 transition px-5 py-3 rounded-2xl font-semibold">
                Missed
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}