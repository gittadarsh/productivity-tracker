import {

  useState,

} from "react";

import {

  motion,

} from "framer-motion";

export default function Goals() {

  const [
    goals,
    setGoals
  ] = useState([

    {
      title:
        "Complete DSA Practice",

      progress:
        75,

      color:
        "from-cyan-500 to-blue-500",
    },

    {
      title:
        "Workout Consistency",

      progress:
        58,

      color:
        "from-orange-500 to-red-500",
    },

    {
      title:
        "Study 5 Hours Daily",

      progress:
        90,

      color:
        "from-green-500 to-emerald-500",
    },
  ]);

  const [
    newGoal,
    setNewGoal
  ] = useState("");

  /* ADD GOAL */

  const addGoal =
    () => {

      if (!newGoal.trim())
        return;

      setGoals([

        ...goals,

        {
          title:
            newGoal,

          progress:
            0,

          color:
            "from-purple-500 to-pink-500",
        },
      ]);

      setNewGoal("");
    };

  return (

    <div className="space-y-8">

      {/* HERO */}

      <motion.div

        initial={{
          opacity: 0,
          y: 20,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-purple-500/10 to-pink-500/5 backdrop-blur-xl p-8 md:p-10 shadow-2xl"
      >

        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/20 blur-[120px]" />

        <div className="relative z-10">

          <p className="text-purple-400 font-semibold tracking-widest uppercase mb-3">

            Goal Management System

          </p>

          <h1 className="text-5xl md:text-6xl font-black leading-tight max-w-4xl">

            Build
            {" "}

            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">

              long-term
            </span>

            {" "}
            consistency.
          </h1>

          <p className="text-slate-400 text-lg mt-6 max-w-2xl leading-relaxed">

            Set meaningful goals,
            track progress,
            and stay consistent with AI-powered productivity workflows.

          </p>

        </div>

      </motion.div>

      {/* ADD GOAL */}

      <motion.div

        initial={{
          opacity: 0,
          y: 20,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          delay: 0.1,
        }}

        className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl"
      >

        <div className="flex flex-col lg:flex-row gap-4">

          <input
            type="text"

            value={newGoal}

            onChange={(e) =>
              setNewGoal(
                e.target.value
              )
            }

            placeholder="Enter your new productivity goal..."

            className="flex-1 bg-white/5 border border-white/10 focus:border-cyan-400 transition-all duration-300 outline-none px-6 py-5 rounded-2xl text-lg placeholder:text-slate-500"
          />

          <button
            onClick={addGoal}

            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-[1.03] transition-all duration-300 px-8 py-5 rounded-2xl font-bold shadow-2xl"
          >

            ➕ Add Goal

          </button>

        </div>

      </motion.div>

      {/* GOALS GRID */}

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">

        {goals.map((goal, index) => (

          <motion.div

            key={index}

            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: index * 0.08,
            }}

            whileHover={{
              y: -6,
            }}

            className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-7 shadow-2xl"
          >

            {/* GLOW */}

            <div
              className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${goal.color} opacity-20 blur-3xl`}
            />

            <div className="relative z-10">

              {/* HEADER */}

              <div className="flex items-start justify-between gap-4">

                <div>

                  <h2 className="text-2xl font-black leading-snug">

                    {goal.title}

                  </h2>

                  <p className="text-slate-400 mt-2">

                    Goal Progress Tracking

                  </p>

                </div>

                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${goal.color} flex items-center justify-center text-2xl shadow-xl`}
                >

                  🎯

                </div>

              </div>

              {/* PROGRESS */}

              <div className="mt-10">

                <div className="flex items-center justify-between mb-3">

                  <span className="text-slate-400">

                    Completion

                  </span>

                  <span className="font-bold text-xl">

                    {goal.progress}%

                  </span>

                </div>

                <div className="h-4 bg-white/5 rounded-full overflow-hidden">

                  <motion.div

                    initial={{
                      width: 0,
                    }}

                    animate={{
                      width:
                        `${goal.progress}%`,
                    }}

                    transition={{
                      duration: 1,
                    }}

                    className={`h-full bg-gradient-to-r ${goal.color} rounded-full shadow-lg`}
                  />

                </div>

              </div>

              {/* FOOTER */}

              <div className="flex items-center justify-between mt-10">

                <button className="bg-white/5 hover:bg-white/10 border border-white/10 transition px-5 py-3 rounded-2xl">

                  ✏ Edit

                </button>

                <button className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition px-5 py-3 rounded-2xl text-red-400">

                  🗑 Delete

                </button>

              </div>

            </div>

          </motion.div>
        ))}

      </div>

      {/* EMPTY STATE */}

      {
        goals.length === 0 && (

          <motion.div

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            className="rounded-[36px] border border-dashed border-white/10 bg-white/5 backdrop-blur-xl p-16 text-center"
          >

            <div className="text-8xl mb-6">

              🎯

            </div>

            <h2 className="text-4xl font-black mb-4">

              No Goals Yet

            </h2>

            <p className="text-slate-400 text-lg max-w-xl mx-auto">

              Create your first productivity goal
              and start building unstoppable consistency.

            </p>

          </motion.div>
        )
      }

    </div>
  );
}