import {
  motion,
} from "framer-motion";

export default function Missions() {

  const missions = [

    {
      title:
        "Complete 2 Focus Sessions",

      reward:
        "+100 XP",

      progress:
        50,

      icon: "🧠",
    },

    {
      title:
        "Finish 3 Tasks",

      reward:
        "+80 XP",

      progress:
        75,

      icon: "🎯",
    },

    {
      title:
        "Maintain Streak",

      reward:
        "+120 XP",

      progress:
        90,

      icon: "🔥",
    },

    {
      title:
        "Review Analytics",

      reward:
        "+40 XP",

      progress:
        100,

      icon: "📈",
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
        className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-orange-500/10 to-red-500/5 backdrop-blur-xl p-8 md:p-12 shadow-2xl"
      >

        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/20 blur-[120px]" />

        <div className="relative z-10">

          <p className="text-orange-400 uppercase tracking-[6px] text-sm font-semibold">

            Retention Engine

          </p>

          <h1 className="text-5xl md:text-7xl font-black mt-6 leading-tight">

            Daily
            {" "}

            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">

              Missions

            </span>

          </h1>

          <p className="text-slate-400 text-lg md:text-xl mt-6 max-w-3xl leading-relaxed">

            Complete missions, earn rewards, and maintain elite productivity consistency.

          </p>

        </div>

      </motion.div>

      {/* MISSIONS */}

      <div className="space-y-6">

        {missions.map(
          (
            mission,
            index
          ) => (

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
                delay:
                  index * 0.08,
              }}
              whileHover={{
                y: -5,
              }}
              className="relative overflow-hidden rounded-[32px] border border-white/10 hover:border-orange-500/20 bg-white/5 backdrop-blur-xl p-8 shadow-2xl transition-all duration-300 hover:scale-[1.01]"
            >

              <div className="absolute top-0 right-0 w-60 h-60 bg-orange-500/10 blur-[120px]" />

              <div className="relative z-10">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                  <div className="flex items-center gap-6">

                    <div className="text-6xl">

                      {mission.icon}

                    </div>

                    <div>

                      <h2 className="text-3xl font-black">

                        {mission.title}

                      </h2>

                      <p className="text-orange-400 text-lg font-bold mt-2">

                        Reward:
                        {" "}
                        {mission.reward}

                      </p>

                    </div>

                  </div>

                  <div className="text-right">

                    <p className="text-slate-400 mb-3">

                      Progress

                    </p>

                    <h3 className="text-4xl font-black">

                      {mission.progress}%

                    </h3>

                  </div>

                </div>

                {/* PROGRESS */}

                <div className="w-full h-5 rounded-full bg-white/5 overflow-hidden mt-8">

                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width:
                        `${mission.progress}%`,
                    }}
                    transition={{
                      duration: 1,
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500"
                  />

                </div>

              </div>

            </motion.div>
          )
        )}

      </div>

    </div>
  );
}