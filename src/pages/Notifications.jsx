import {
  useEffect,
  useState,
} from "react";

import {
  auth,
  db,
} from "../firebase";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import {
  motion,
} from "framer-motion";

import {
  generateNotifications,
} from "../utils/notificationEngine";

export default function Notifications() {

  const [notifications,
    setNotifications] =
    useState([]);

  useEffect(() => {

    loadNotifications();

  }, []);

  const loadNotifications =
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

      setNotifications(

        generateNotifications({

          xp,
          sessions,
          streak,
          score,
        })
      );
    };

  return (

    <div className="space-y-6">

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="rounded-[40px] border border-white/10 bg-gradient-to-br from-orange-500/10 to-red-500/5 backdrop-blur-xl p-8 md:p-12 shadow-2xl"
      >

        <h1 className="text-5xl md:text-7xl font-black">

          🔔 Notifications

        </h1>

      </motion.div>

      {notifications.map(
        (
          item,
          index
        ) => (

          <motion.div
            key={index}
            whileHover={{
              y: -4,
            }}
            className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-7 shadow-2xl"
          >

            <h2 className="text-3xl font-black">

              {item.title}

            </h2>

            <p className="text-slate-400 text-lg mt-4">

              {item.description}

            </p>

          </motion.div>
        )
      )}

    </div>
  );
}