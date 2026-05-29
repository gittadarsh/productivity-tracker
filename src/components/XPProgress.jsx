import {
  motion,
} from "framer-motion";

import {
  useProductivity,
} from "../context/ProductivityContext";

export default function XPProgress() {

  const productivity =
    useProductivity();

  const currentLevelXP =
    productivity.level * 250;

  const nextLevelXP =
    (
      productivity.level + 1
    ) * 250;

  const progress =
    (
      (
        productivity.xp -
        currentLevelXP
      ) /

      (
        nextLevelXP -
        currentLevelXP
      )
    ) * 100;

  return (

    <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-slate-400">

            XP Progress

          </p>

          <h2 className="text-4xl font-black mt-3">

            Level {productivity.level}

          </h2>

        </div>

        <div className="text-right">

          <p className="text-slate-400">

            Next Level

          </p>

          <h2 className="text-2xl font-black mt-3 text-cyan-400">

            {nextLevelXP} XP

          </h2>

        </div>

      </div>

      <div className="w-full h-5 rounded-full bg-white/5 overflow-hidden mt-8">

        <motion.div
          initial={{
            width: 0,
          }}
          animate={{
            width:
              `${progress}%`,
          }}
          transition={{
            duration: 1,
          }}
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
        />

      </div>

    </div>
  );
}