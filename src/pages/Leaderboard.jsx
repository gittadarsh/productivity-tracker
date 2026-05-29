import {
  useEffect,
  useState,
} from "react";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import {
  db,
} from "../firebase";

import {
  motion,
} from "framer-motion";

export default function Leaderboard() {

  const [users, setUsers] =
    useState([]);

  useEffect(() => {

    const unsub =
      onSnapshot(

        collection(
          db,
          "users"
        ),

        (
          snapshot
        ) => {

          const data =
            snapshot.docs.map(

              doc => ({

                id:
                  doc.id,

                ...doc.data(),
              })
            );

          data.sort(

            (
              a,
              b
            ) =>

              (b.xp || 0)

              -

              (a.xp || 0)
          );

          setUsers(data);
        }
      );

    return () =>
      unsub();

  }, []);

  return (

    <div className="space-y-8">

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-yellow-500/10 to-orange-500/5 backdrop-blur-xl p-8 md:p-12 shadow-2xl"
      >

        <h1 className="text-5xl md:text-7xl font-black">

          🏆 Leaderboard

        </h1>

      </motion.div>

      <div className="space-y-5">

        {users.map(
          (
            user,
            index
          ) => {

            const level =
              Math.max(

                1,

                Math.floor(
                  (
                    user.xp || 0
                  ) / 250
                )
              );

            return (

              <motion.div
                key={user.id}
                whileHover={{
                  y: -4,
                }}
                className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-7 shadow-2xl"
              >

                <div className="flex items-center justify-between flex-wrap gap-5">

                  <div className="flex items-center gap-5">

                    <div className="text-5xl font-black text-cyan-400">

                      #{index + 1}

                    </div>

                    <img
                      src={
                        user.photo ||

                        `https://ui-avatars.com/api/?name=${user.name}`
                      }
                      alt="profile"
                      className="w-16 h-16 rounded-2xl object-cover"
                    />

                    <div>

                      <h2 className="text-3xl font-black">

                        {user.name}

                      </h2>

                      <p className="text-slate-400 mt-2">

                        Level {level}

                      </p>

                    </div>

                  </div>

                  <div className="text-right">

                    <h2 className="text-5xl font-black text-yellow-400">

                      {user.xp || 0}

                    </h2>

                    <p className="text-slate-400 mt-2">

                      XP

                    </p>

                  </div>

                </div>

              </motion.div>
            );
          }
        )}

      </div>

    </div>
  );
}