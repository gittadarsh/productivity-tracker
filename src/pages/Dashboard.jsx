import {

  motion,

} from "framer-motion";

import {

  useState,

} from "react";

import FocusSessionModal from "../components/FocusSessionModal";

export default function Dashboard() {

  const [
    focusOpen,
    setFocusOpen
  ] = useState(false);

  const stats = [

    {
      title:
        "Productivity Score",

      value:
        "87%",

      icon:
        "⚡",

      gradient:
        "from-cyan-500 to-blue-500",
    },

    {
      title:
        "Current Streak",

      value:
        "12 Days",

      icon:
        "🔥",

      gradient:
        "from-orange-500 to-red-500",
    },

    {
      title:
        "Goals Completed",

      value:
        "18",

      icon:
        "🎯",

      gradient:
        "from-green-500 to-emerald-500",
    },

    {
      title:
        "AI Consistency",

      value:
        "92%",

      icon:
        "🤖",

      gradient:
        "from-purple-500 to-pink-500",
    },
  ];

  return (

    <>

      {/* FOCUS MODAL */}

      <FocusSessionModal
        open={focusOpen}
        setOpen={setFocusOpen}
      />

      <div className="space-y-8">

        {/* HERO */}

        <motion.div

          initial={{
            opacity: 0,
            y: 30,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 backdrop-blur-xl p-8 md:p-10 shadow-2xl"
        >

          {/* GLOW */}

          <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/20 blur-[120px]" />

          <div className="relative z-10">

            <p className="text-cyan-400 font-semibold tracking-widest uppercase mb-3">

              AI Productivity Platform

            </p>

            <h1 className="text-5xl md:text-6xl font-black leading-tight max-w-4xl">

              Build
              {" "}

              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                unstoppable

              </span>

              {" "}
              productivity habits.
            </h1>

            <p className="text-slate-400 text-lg mt-6 max-w-2xl leading-relaxed">

              Track habits, monitor consistency, analyze performance,
              and unlock AI-powered insights for maximum growth.

            </p>

            {/* ACTIONS */}

            <div className="flex flex-wrap gap-4 mt-8">

              <button
                onClick={() =>
                  setFocusOpen(
                    true
                  )
                }

                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-[1.03] transition-all duration-300 px-8 py-4 rounded-2xl font-bold shadow-2xl"
              >

                🚀 Start Focus Session

              </button>

              <button className="bg-white/5 hover:bg-white/10 border border-white/10 transition px-8 py-4 rounded-2xl font-semibold">

                📊 View Analytics

              </button>

            </div>

          </div>

        </motion.div>

        {/* STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

          {stats.map((stat, index) => (

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

              className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl"
            >

              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-20 blur-3xl`}
              />

              <div className="relative z-10">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-slate-400 text-sm">

                      {stat.title}

                    </p>

                    <h2 className="text-4xl font-black mt-3">

                      {stat.value}

                    </h2>

                  </div>

                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center text-3xl shadow-xl`}
                  >

                    {stat.icon}

                  </div>

                </div>

              </div>

            </motion.div>
          ))}

        </div>

        {/* MAIN GRID */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* PRODUCTIVITY */}

          <motion.div

            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            className="xl:col-span-2 rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl"
          >

            <div className="flex items-center justify-between mb-8">

              <div>

                <h2 className="text-3xl font-black">

                  📈 Productivity Overview

                </h2>

                <p className="text-slate-400 mt-2">

                  Weekly performance analysis

                </p>

              </div>

              <button className="bg-white/5 hover:bg-white/10 border border-white/10 transition px-5 py-3 rounded-2xl">

                This Week

              </button>

            </div>

            <div className="h-[350px] rounded-[28px] bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 flex items-center justify-center">

              <div className="text-center">

                <div className="text-7xl mb-4">

                  📊

                </div>

                <p className="text-slate-400 text-lg">

                  Live productivity analytics will appear here

                </p>

              </div>

            </div>

          </motion.div>

          {/* AI INSIGHTS */}

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

            <h2 className="text-3xl font-black mb-8">

              🤖 AI Insights

            </h2>

            <div className="space-y-5">

              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-5">

                <h3 className="font-bold text-cyan-400 mb-2">

                  Peak Focus Time

                </h3>

                <p className="text-slate-300 leading-relaxed">

                  Your highest productivity occurs between
                  8AM - 11AM consistently.

                </p>

              </div>

              <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-5">

                <h3 className="font-bold text-purple-400 mb-2">

                  Consistency Improvement

                </h3>

                <p className="text-slate-300 leading-relaxed">

                  Your habit completion rate improved
                  by 24% this month.

                </p>

              </div>

              <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5">

                <h3 className="font-bold text-green-400 mb-2">

                  AI Recommendation

                </h3>

                <p className="text-slate-300 leading-relaxed">

                  Add a focused evening revision block
                  to maximize retention.

                </p>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </>
  );
}