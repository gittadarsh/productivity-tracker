import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  db,
} from "../firebase";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";

export default function Leaderboard() {

  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadLeaderboard();

  }, []);

  const loadLeaderboard =
    async () => {

      try {

        onSnapshot(

          collection(
            db,
            "users"
          ),

          (snapshot) => {

            const users =
              snapshot.docs

                .map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
                }))

                .filter(
                  (user) =>
                    user.role ===
                    "student"
                )

                .sort(
                  (a, b) =>

                    (
                      b.xp || 0
                    ) -

                    (
                      a.xp || 0
                    )
                );

            setStudents(users);

            setLoading(false);

          }
        );

      } catch (error) {

        console.log(error);

        setLoading(false);

      }
    };

  return (

    <div className="space-y-8">

      {/* HERO */}

      <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-yellow-500/10 to-orange-500/5 backdrop-blur-xl p-10 shadow-2xl">

        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-500/20 blur-[120px]" />

        <div className="relative z-10">

          <p className="text-yellow-400 uppercase tracking-[6px] text-sm font-semibold">

            Productivity Rankings

          </p>

          <h1 className="text-6xl font-black mt-5">

            🏆 Global Leaderboard

          </h1>

          <p className="text-slate-400 text-lg mt-5">

            Ranked by real productivity consistency and XP intelligence.

          </p>

        </div>

      </div>

      {/* CONTENT */}

      <div className="space-y-5">

        {
          loading ? (

            <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-xl p-20 text-center shadow-2xl">

              <div className="absolute top-0 right-0 w-60 h-60 bg-cyan-500/10 blur-[100px]" />

              <div className="relative z-10">

                <div className="text-8xl mb-6">

                  🏆

                </div>

                <h2 className="text-4xl font-black">

                  Loading Rankings...

                </h2>

                <p className="text-slate-400 text-lg mt-4">

                  Fetching real-time leaderboard intelligence.

                </p>

              </div>

            </div>

          ) : (

            students.map(
              (
                student,
                index
              ) => (

                <motion.div
                  key={student.id}
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
                      index * 0.05,
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  className="relative overflow-hidden rounded-[32px] border border-white/10 hover:border-cyan-500/20 bg-white/5 backdrop-blur-xl p-7 shadow-2xl transition-all duration-300 hover:scale-[1.015]"
                >

                  <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/10 blur-3xl" />

                  <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                    <div className="flex items-center gap-5">

                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-2xl font-black">

                        #
                        {index + 1}

                      </div>

                      <img
                        src={
                          student.photo ||

                          `https://ui-avatars.com/api/?name=${student.name}`
                        }
                        alt="student"
                        className="w-16 h-16 rounded-2xl object-cover border border-white/10"
                      />

                      <div>

                        <h2 className="text-3xl font-black">

                          {student.name}

                        </h2>

                        <p className="text-slate-400 mt-2">

                          {student.email}

                        </p>

                      </div>

                    </div>

                    <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 rounded-2xl px-8 py-5">

                      <p className="text-cyan-300 text-sm">

                        Total XP

                      </p>

                      <h3 className="text-5xl font-black text-cyan-400 mt-2">

                        {
                          student.xp ||
                          0
                        }

                      </h3>

                    </div>

                  </div>

                </motion.div>
              )
            )

          )
        }

      </div>

    </div>
  );
}