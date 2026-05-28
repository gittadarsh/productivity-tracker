import {
  motion,
} from "framer-motion";

export default function Dashboard() {

  const stats = [

    {
      title: "Total XP",
      value: "2,480",
      icon: "⚡",
    },

    {
      title: "Focus Sessions",
      value: "128",
      icon: "🧠",
    },

    {
      title: "Current Streak",
      value: "16 Days",
      icon: "🔥",
    },

    {
      title: "Completed Goals",
      value: "42",
      icon: "🎯",
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

          <p className="text-cyan-400 uppercase tracking-[6px] text-sm font-semibold">

            Productivity Intelligence

          </p>

          <h1 className="text-5xl md:text-6xl font-black mt-5 leading-tight">

            Build
            {" "}

            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              elite consistency

            </span>

          </h1>

          <p className="text-slate-400 text-lg mt-6 max-w-3xl leading-relaxed">

            Track habits, improve focus, complete goals, and level up your productivity system.

          </p>

        </div>

      </motion.div>

      {/* QUICK ACTIONS */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

        <button className="rounded-[28px] border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-500/20 transition-all duration-300 p-6 text-left hover:scale-[1.02]">

          <div className="text-4xl">

            ⚡

          </div>

          <h3 className="text-xl font-black mt-4">

            Start Focus

          </h3>

        </button>

        <button className="rounded-[28px] border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-500/20 transition-all duration-300 p-6 text-left hover:scale-[1.02]">

          <div className="text-4xl">

            🎯

          </div>

          <h3 className="text-xl font-black mt-4">

            Add Goal

          </h3>

        </button>

        <button className="rounded-[28px] border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-500/20 transition-all duration-300 p-6 text-left hover:scale-[1.02]">

          <div className="text-4xl">

            📈

          </div>

          <h3 className="text-xl font-black mt-4">

            View Analytics

          </h3>

        </button>

        <button className="rounded-[28px] border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-500/20 transition-all duration-300 p-6 text-left hover:scale-[1.02]">

          <div className="text-4xl">

            🧠

          </div>

          <h3 className="text-xl font-black mt-4">

            AI Insights

          </h3>

        </button>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

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
              delay: index * 0.05,
            }}
            whileHover={{
              y: -5,
            }}
            className="relative overflow-hidden rounded-[32px] border border-white/10 hover:border-cyan-500/20 bg-white/5 backdrop-blur-xl p-7 shadow-2xl transition-all duration-300 hover:scale-[1.015]"
          >

            <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 blur-3xl" />

            <div className="relative z-10">

              <div className="text-5xl">

                {stat.icon}

              </div>

              <p className="text-slate-400 mt-6">

                {stat.title}

              </p>

              <h2 className="text-5xl font-black mt-3">

                {stat.value}

              </h2>

            </div>

          </motion.div>

        ))}

      </div>

    </div>
  );
}