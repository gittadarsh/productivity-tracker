import {

  motion,

} from "framer-motion";

export default function Heatmap() {

  const months = [

    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
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

        className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-green-500/10 to-emerald-500/5 backdrop-blur-xl p-8 md:p-10 shadow-2xl"
      >

        <div className="absolute top-0 right-0 w-72 h-72 bg-green-500/20 blur-[120px]" />

        <div className="relative z-10">

          <p className="text-green-400 font-semibold tracking-widest uppercase mb-3">

            Consistency Tracking

          </p>

          <h1 className="text-5xl md:text-6xl font-black leading-tight max-w-4xl">

            Visualize your
            {" "}

            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">

              daily consistency
            </span>

            {" "}
            growth.
          </h1>

          <p className="text-slate-400 text-lg mt-6 max-w-2xl leading-relaxed">

            Monitor long-term discipline,
            habit streaks,
            and productivity consistency through AI-powered tracking.

          </p>

        </div>

      </motion.div>

      {/* STATS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {[
          {
            title: "Longest Streak",
            value: "48 Days",
            icon: "🔥",
            color: "from-orange-500 to-red-500",
          },

          {
            title: "Consistency Rate",
            value: "91%",
            icon: "⚡",
            color: "from-cyan-500 to-blue-500",
          },

          {
            title: "Focus Sessions",
            value: "126",
            icon: "🧠",
            color: "from-purple-500 to-pink-500",
          },

          {
            title: "AI Discipline",
            value: "Elite",
            icon: "🤖",
            color: "from-green-500 to-emerald-500",
          },
        ].map((stat, index) => (

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

            </div>

          </motion.div>
        ))}

      </div>

      {/* HEATMAP */}

      <motion.div

        initial={{
          opacity: 0,
          y: 20,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        className="rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl overflow-hidden"
      >

        <div className="flex items-center justify-between flex-wrap gap-4 mb-10">

          <div>

            <h2 className="text-4xl font-black">

              🔥 Productivity Heatmap

            </h2>

            <p className="text-slate-400 mt-2">

              Daily productivity consistency visualization

            </p>

          </div>

          <button className="bg-white/5 hover:bg-white/10 border border-white/10 transition px-5 py-3 rounded-2xl">

            This Year

          </button>

        </div>

        {/* MONTHS */}

        <div className="grid grid-cols-7 gap-6 mb-6">

          {months.map((month, index) => (

            <div
              key={index}

              className="text-slate-400 font-semibold text-center"
            >

              {month}

            </div>
          ))}

        </div>

        {/* HEATMAP GRID */}

        <div className="grid grid-cols-7 gap-6">

          {Array.from({

            length: 49,

          }).map((_, index) => {

            const levels = [

              "bg-white/5",
              "bg-green-500/20",
              "bg-green-500/40",
              "bg-green-500/70",
              "bg-green-400",
            ];

            const randomLevel =
              levels[
                Math.floor(
                  Math.random() *
                  levels.length
                )
              ];

            return (

              <motion.div

                key={index}

                whileHover={{
                  scale: 1.12,
                }}

                className={`aspect-square rounded-2xl ${randomLevel} border border-white/5 transition-all duration-300 shadow-lg`}
              />
            );
          })}

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
          delay: 0.2,
        }}

        className="rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl"
      >

        <h2 className="text-4xl font-black mb-8">

          🤖 AI Consistency Insights

        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-3xl p-6">

            <h3 className="text-cyan-400 font-bold text-xl mb-3">

              Peak Discipline

            </h3>

            <p className="text-slate-300 leading-relaxed">

              Your consistency is strongest during structured morning sessions.

            </p>

          </div>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-3xl p-6">

            <h3 className="text-purple-400 font-bold text-xl mb-3">

              Habit Recovery

            </h3>

            <p className="text-slate-300 leading-relaxed">

              AI predicts rapid recovery after productivity dips.

            </p>

          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-6">

            <h3 className="text-green-400 font-bold text-xl mb-3">

              Long-Term Growth

            </h3>

            <p className="text-slate-300 leading-relaxed">

              Your productivity trend shows sustainable long-term improvement.

            </p>

          </div>

        </div>

      </motion.div>

    </div>
  );
}