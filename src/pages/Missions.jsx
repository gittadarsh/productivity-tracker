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
  generateMissions,
} from "../utils/missionEngine";

export default function Missions() {

  const [missions, setMissions] =
    useState([]);

  useEffect(() => {

    loadMissions();

  }, []);

  const loadMissions =
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

      setMissions(

        generateMissions({

          xp:
            userData.xp || 0,

          sessions:
            focusData.sessions || 0,

          streak:
            Math.floor(
              (
                focusData.sessions ||
                0
              ) / 3
            ),
        })
      );
    };

  return (

    <div className="space-y-6">

      {missions.map(
        (
          mission,
          index
        ) => (

          <motion.div
            key={index}
            whileHover={{
              y: -5,
            }}
            className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl"
          >

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-3xl font-black">

                  {mission.title}

                </h2>

                <p className="text-orange-400 mt-3 font-bold">

                  {mission.reward}

                </p>

              </div>

              <h3 className="text-4xl font-black">

                {
                  Math.floor(
                    mission.progress
                  )
                }%

              </h3>

            </div>

            <div className="w-full h-5 rounded-full bg-white/5 overflow-hidden mt-8">

              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width:
                    `${mission.progress}%`,
                }}
                className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500"
              />

            </div>

          </motion.div>
        )
      )}

    </div>
  );
}