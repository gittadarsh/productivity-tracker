import {

  motion,

} from "framer-motion";

export default function Achievements() {

  const achievements = [

    {
      title:
        "Consistency Master",

      description:
        "Maintain a 30-day productivity streak.",

      icon:
        "🔥",

      unlocked:
        true,

      rarity:
        "Legendary",

      color:
        "from-orange-500 to-red-500",
    },

    {
      title:
        "Deep Focus",

      description:
        "Complete 100 focused sessions.",

      icon:
        "🧠",

      unlocked:
        true,

      rarity:
        "Epic",

      color:
        "from-purple-500 to-pink-500",
    },

    {
      title:
        "Goal Crusher",

      description:
        "Complete 50 productivity goals.",

      icon:
        "🎯",

      unlocked:
        true,

      rarity:
        "Rare",

      color:
        "from-cyan-500 to-blue-500",
    },

    {
      title:
        "AI Discipline",

      description:
        "Reach elite AI consistency score.",

      icon:
        "🤖",

      unlocked:
        false,

      rarity:
        "Mythic",

      color:
        "from-green-500 to-emerald-500",
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

        className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-yellow-500/10 to-orange-500/5 backdrop-blur-xl p-8 md:p-10 shadow-2xl"
      >

        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-500/20 blur-[120px]" />

        <div className="relative z-10">

          <p className="text-yellow-400 font-semibold tracking-widest uppercase mb-3">

            Achievement System

          </p>

          <h1 className="text-5xl md:text-6xl font-black leading-tight max-w-4xl">

            Unlock
            {" "}

            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">

              elite productivity
            </span>

            {" "}
            milestones.
          </h1>

          <p className="text-slate-400 text-lg mt-6 max-w-2xl leading-relaxed">

            Earn rewards, maintain streaks,
            level up discipline,
            and build unstoppable consistency.

          </p>

        </div>

      </motion.div>

      {/* XP SECTION */}

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

        className="rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl"
      >

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

          <div>

            <p className="text-slate-400 uppercase tracking-widest mb-3">

              Current Level

            </p>

            <h2 className="text-6xl font-black">

              Level 12

            </h2>

            <p className="text-slate-400 mt-3 text-lg">

              1,820 XP Earned

            </p>

          </div>

          <div className="flex-1">

            <div className="flex items-center justify-between mb-3">

              <span className="text-slate-400">

                XP Progress

              </span>

              <span className="font-bold">

                82%

              </span>

            </div>

            <div className="h-5 bg-white/5 rounded-full overflow-hidden">

              <motion.div

                initial={{
                  width: 0,
                }}

                animate={{
                  width: "82%",
                }}

                transition={{
                  duration: 1,
                }}

                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg"
              />

            </div>

            <p className="text-slate-400 mt-3">

              380 XP remaining for Level 13

            </p>

          </div>

        </div>

      </motion.div>

      {/* ACHIEVEMENTS GRID */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {achievements.map((achievement, index) => (

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

            className={`

            relative overflow-hidden

            rounded-[32px]

            border

            ${
              achievement.unlocked

                ? "border-white/10 bg-white/5"

                : "border-white/5 bg-white/[0.03]"
            }

            backdrop-blur-xl

            p-8

            shadow-2xl
          `}
          >

            {/* GLOW */}

            <div
              className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${achievement.color} opacity-20 blur-3xl`}
            />

            <div className="relative z-10">

              <div className="flex items-start justify-between gap-5">

                <div
                  className={`w-20 h-20 rounded-3xl bg-gradient-to-r ${achievement.color} flex items-center justify-center text-4xl shadow-2xl`}
                >

                  {achievement.icon}

                </div>

                <div
                  className={`px-4 py-2 rounded-2xl text-sm font-bold

                  ${
                    achievement.unlocked

                      ? "bg-green-500/10 text-green-400 border border-green-500/20"

                      : "bg-white/5 text-slate-400 border border-white/10"
                  }`}
                >

                  {
                    achievement.unlocked

                      ? "Unlocked"

                      : "Locked"
                  }

                </div>

              </div>

              <div className="mt-8">

                <h2 className="text-3xl font-black">

                  {achievement.title}

                </h2>

                <p className="text-slate-400 mt-4 leading-relaxed text-lg">

                  {achievement.description}

                </p>

              </div>

              <div className="mt-8 flex items-center justify-between">

                <div>

                  <p className="text-slate-500 text-sm uppercase tracking-widest">

                    Rarity

                  </p>

                  <h3 className="font-bold text-xl mt-1">

                    {achievement.rarity}

                  </h3>

                </div>

                <div className="text-5xl">

                  {
                    achievement.unlocked

                      ? "🏆"

                      : "🔒"
                  }

                </div>

              </div>

            </div>

          </motion.div>
        ))}

      </div>

      {/* LEADERBOARD PREVIEW */}

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

        <div className="flex items-center justify-between mb-8">

          <div>

            <h2 className="text-4xl font-black">

              🏅 Achievement Rankings

            </h2>

            <p className="text-slate-400 mt-2">

              Top productivity performers

            </p>

          </div>

        </div>

        <div className="space-y-5">

          {[
            "Adarsh Kumar",
            "Rahul Sharma",
            "Priya Verma",
          ].map((user, index) => (

            <motion.div

              key={index}

              whileHover={{
                x: 6,
              }}

              className="flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-300 rounded-3xl p-5"
            >

              <div className="flex items-center gap-5">

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-2xl font-black shadow-xl">

                  #{index + 1}

                </div>

                <div>

                  <h3 className="text-xl font-bold">

                    {user}

                  </h3>

                  <p className="text-slate-400 mt-1">

                    Productivity Champion

                  </p>

                </div>

              </div>

              <div className="text-3xl">

                🏆

              </div>

            </motion.div>
          ))}

        </div>

      </motion.div>

    </div>
  );
}