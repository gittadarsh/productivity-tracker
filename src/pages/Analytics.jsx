import {

  motion,

} from "framer-motion";

export default function Analytics() {

  const stats = [

    {
      title:
        "Weekly Focus",

      value:
        "42h",

      growth:
        "+18%",

      color:
        "from-cyan-500 to-blue-500",

      icon:
        "⚡",
    },

    {
      title:
        "Habit Completion",

      value:
        "89%",

      growth:
        "+12%",

      color:
        "from-green-500 to-emerald-500",

      icon:
        "🎯",
    },

    {
      title:
        "Consistency Score",

      value:
        "92%",

      growth:
        "+24%",

      color:
        "from-purple-500 to-pink-500",

      icon:
        "🔥",
    },

    {
      title:
        "AI Efficiency",

      value:
        "95%",

      growth:
        "+31%",

      color:
        "from-orange-500 to-red-500",

      icon:
        "🤖",
    },
  ];

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

        className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 backdrop-blur-xl p-8 md:p-10 shadow-2xl"
      >

        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/20 blur-[120px]" />

        <div className="relative z-10">

          <p className="text-cyan-400 font-semibold tracking-widest uppercase mb-3">

            Productivity Analytics

          </p>

          <h1 className="text-5xl md:text-6xl font-black leading-tight max-w-4xl">

            Analyze your
            {" "}

            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              performance
            </span>

            {" "}
            deeply.
          </h1>

          <p className="text-slate-400 text-lg mt-6 max-w-2xl leading-relaxed">

            Monitor consistency,
            productivity trends,
            focus patterns,
            and AI-generated performance insights.

          </p>

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
              className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-20 blur-3xl`}
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
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-3xl shadow-xl`}
                >

                  {stat.icon}

                </div>

              </div>

              <div className="mt-6 flex items-center gap-2">

                <span className="text-green-400 font-bold">

                  {stat.growth}

                </span>

                <span className="text-slate-400 text-sm">

                  vs last week

                </span>

              </div>

            </div>

          </motion.div>
        ))}

      </div>

      {/* MAIN GRID */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* CHART */}

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

                📈 Productivity Trends

              </h2>

              <p className="text-slate-400 mt-2">

                AI-powered weekly analysis

              </p>

            </div>

            <button className="bg-white/5 hover:bg-white/10 border border-white/10 transition px-5 py-3 rounded-2xl">

              Last 30 Days

            </button>

          </div>

          {/* CHART PLACEHOLDER */}

          <div className="h-[400px] rounded-[30px] bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 flex items-center justify-center">

            <div className="text-center">

              <div className="text-7xl mb-5">

                📊

              </div>

              <p className="text-slate-400 text-lg">

                Advanced analytics charts here

              </p>

            </div>

          </div>

        </motion.div>

        {/* AI PANEL */}

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

            🤖 AI Analysis

          </h2>

          <div className="space-y-5">

            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-5">

              <h3 className="font-bold text-cyan-400 mb-2">

                Productivity Spike

              </h3>

              <p className="text-slate-300 leading-relaxed">

                Your efficiency increases dramatically after focused morning sessions.

              </p>

            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-5">

              <h3 className="font-bold text-purple-400 mb-2">

                Focus Pattern

              </h3>

              <p className="text-slate-300 leading-relaxed">

                AI detected your highest focus window between 9AM–12PM.

              </p>

            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5">

              <h3 className="font-bold text-green-400 mb-2">

                Consistency Growth

              </h3>

              <p className="text-slate-300 leading-relaxed">

                Your consistency improved by 24% over the previous cycle.

              </p>

            </div>

          </div>

        </motion.div>

      </div>

      {/* ACTIVITY */}

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
          delay: 0.2,
        }}

        className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl"
      >

        <div className="flex items-center justify-between mb-8">

          <div>

            <h2 className="text-3xl font-black">

              ⚡ Activity Timeline

            </h2>

            <p className="text-slate-400 mt-2">

              Recent productivity activity

            </p>

          </div>

        </div>

        <div className="space-y-5">

          {[
            "Completed 5 productivity goals",
            "Maintained 12-day streak",
            "AI planner generated new study workflow",
            "Focus score increased by 18%",
          ].map((item, index) => (

            <motion.div

              key={index}

              whileHover={{
                x: 6,
              }}

              className="flex items-center gap-5 bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-300 rounded-2xl p-5"
            >

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-2xl shadow-xl">

                ⚡

              </div>

              <div>

                <h3 className="font-bold text-lg">

                  {item}

                </h3>

                <p className="text-slate-400 mt-1">

                  AI productivity tracking event

                </p>

              </div>

            </motion.div>
          ))}

        </div>

      </motion.div>

    </div>
  );
}