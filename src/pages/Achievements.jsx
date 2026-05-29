import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  auth,
  db,
} from "../firebase";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import {
  getAchievements,
} from "../utils/achievementEngine";

export default function Achievements() {

  const [badges, setBadges] =
    useState([]);

  useEffect(() => {

    loadAchievements();

  }, []);

  const loadAchievements =
    async () => {

      const user =
        auth.currentUser;

      if (!user)
        return;

      const userSnap =
        await getDoc(

          doc(
            db,
            "users",
            user.uid
          )
        );

      const focusSnap =
        await getDoc(

          doc(
            db,
            "focusSessions",
            user.uid
          )
        );

      const userData =
        userSnap.exists()

          ? userSnap.data()

          : {};

      const focusData =
        focusSnap.exists()

          ? focusSnap.data()

          : {};

      const xp =
        userData.xp || 0;

      const sessions =
        focusData.sessions || 0;

      const streak =
        Math.floor(
          sessions / 3
        );

      const score =
        Math.min(

          100,

          xp * 0.02 +
          sessions * 2 +
          streak * 4
        );

      setBadges(

        getAchievements({

          xp,
          sessions,
          streak,
          score,
        })
      );
    };

  return (

    <div className="space-y-8">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {badges.map(
          (
            badge,
            index
          ) => (

            <motion.div
              key={index}
              whileHover={{
                y: -5,
              }}
              className={`

              rounded-[32px]

              border

              p-8

              shadow-2xl

              transition-all duration-300

              ${
                badge.unlocked

                  ? "border-yellow-500/30 bg-yellow-500/10"

                  : "border-white/10 bg-white/5 opacity-60"
              }`}
            >

              <h2 className="text-4xl font-black">

                {badge.title}

              </h2>

              <p className="mt-4 text-slate-400">

                {
                  badge.unlocked

                    ? "Achievement unlocked"

                    : "Locked"
                }

              </p>

            </motion.div>
          )
        )}

      </div>

    </div>
  );
}