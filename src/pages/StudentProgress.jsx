import {

  useEffect,
  useState,

} from "react";

import {

  useParams,

} from "react-router-dom";

import {

  motion,

} from "framer-motion";

import {

  db,

} from "../firebase";

import {

  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,

} from "firebase/firestore";

export default function StudentProgress() {

  const { uid } =
    useParams();

  const [
    student,
    setStudent
  ] = useState(null);

  const [
    habits,
    setHabits
  ] = useState([]);

  const [
    sessions,
    setSessions
  ] = useState([]);

  const [
    loading,
    setLoading
  ] = useState(true);

  /* LOAD */

  useEffect(() => {

    loadStudent();

  }, []);

  const loadStudent =
    async () => {

      try {

        /* USER */

        const userRef =
          doc(
            db,
            "users",
            uid
          );

        const userSnap =
          await getDoc(
            userRef
          );

        if (
          userSnap.exists()
        ) {

          setStudent(
            userSnap.data()
          );
        }

        /* HABITS */

        const habitQuery =
          query(

            collection(
              db,
              "habits"
            ),

            where(
              "uid",
              "==",
              uid
            )
          );

        const habitSnap =
          await getDocs(
            habitQuery
          );

        const habitData =
          habitSnap.docs.map(
            (doc) => ({

              id:
                doc.id,

              ...doc.data(),
            })
          );

        setHabits(
          habitData
        );

        /* SESSIONS */

        const sessionQuery =
          query(

            collection(
              db,
              "focusSessions"
            ),

            where(
              "uid",
              "==",
              uid
            )
          );

        const sessionSnap =
          await getDocs(
            sessionQuery
          );

        const sessionData =
          sessionSnap.docs.map(
            (doc) => ({

              id:
                doc.id,

              ...doc.data(),
            })
          );

        setSessions(
          sessionData
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  /* CALCULATIONS */

  const completedHabits =
    habits.filter(
      (h) =>
        h.completed
    ).length;

  const highestStreak =
    habits.reduce(
      (
        max,
        habit
      ) =>

        Math.max(
          max,
          habit.streak || 0
        ),

      0
    );

  const productivityScore =
    sessions.length *
      10 +
    completedHabits *
      5;

  if (loading) {

    return (

      <div className="text-center text-slate-400 py-20">

        Loading student analytics...

      </div>
    );
  }

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

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

          <div className="flex items-center gap-6">

            <img
              src={
                student?.photo ||

                `https://ui-avatars.com/api/?name=${student?.name}`
              }

              alt="student"

              className="w-28 h-28 rounded-[32px] border border-white/10 object-cover shadow-2xl"
            />

            <div>

              <p className="text-cyan-400 uppercase tracking-[6px] text-sm font-semibold">

                Student Analytics

              </p>

              <h1 className="text-5xl font-black mt-4">

                {student?.name}

              </h1>

              <p className="text-slate-400 text-lg mt-3">

                {student?.email}

              </p>

            </div>

          </div>

          <div className="bg-green-500/10 border border-green-500/20 px-6 py-4 rounded-3xl">

            <div className="flex items-center gap-3">

              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />

              <span className="font-bold text-green-400 text-lg">

                Live Tracking Active

              </span>

            </div>

          </div>

        </div>

      </motion.div>

      {/* STATS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {[
          {
            title: "XP",
            value: student?.xp || 0,
            icon: "⚡",
            color: "from-cyan-500 to-blue-500",
          },

          {
            title: "Focus Sessions",
            value: sessions.length,
            icon: "🧠",
            color: "from-purple-500 to-pink-500",
          },

          {
            title: "Highest Streak",
            value: highestStreak,
            icon: "🔥",
            color: "from-orange-500 to-red-500",
          },

          {
            title: "Productivity Score",
            value: productivityScore,
            icon: "📈",
            color: "from-green-500 to-emerald-500",
          },
        ].map((card, index) => (

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
              className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.color} opacity-20 blur-3xl`}
            />

            <div className="relative z-10">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-slate-400 text-sm">

                    {card.title}

                  </p>

                  <h2 className="text-4xl font-black mt-3">

                    {card.value}

                  </h2>

                </div>

                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${card.color} flex items-center justify-center text-3xl shadow-xl`}
                >

                  {card.icon}

                </div>

              </div>

            </div>

          </motion.div>
        ))}

      </div>

      {/* HABITS */}

      <motion.div

        initial={{
          opacity: 0,
          y: 20,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        className="rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl"
      >

        <div className="flex items-center justify-between mb-10">

          <div>

            <h2 className="text-4xl font-black">

              ⚡ Habit Performance

            </h2>

            <p className="text-slate-400 mt-2">

              Live student habit consistency

            </p>

          </div>

        </div>

        {
          habits.length === 0

            ? (

              <div className="text-center py-16 text-slate-400">

                No habits tracked yet.

              </div>
            )

            : (

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {habits.map(
                  (
                    habit,
                    index
                  ) => (

                    <motion.div

                      key={
                        habit.id
                      }

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
                          index *
                          0.05,
                      }}

                      className="rounded-[30px] border border-white/10 bg-white/5 p-6"
                    >

                      <div className="flex items-center justify-between">

                        <div>

                          <h3 className="text-2xl font-black">

                            {
                              habit.title
                            }

                          </h3>

                          <p className="text-slate-400 mt-2">

                            Habit consistency tracking

                          </p>

                        </div>

                        <div className="text-4xl">

                          {
                            habit.completed

                              ? "✅"

                              : "⚡"
                          }

                        </div>

                      </div>

                      <div className="mt-8">

                        <div className="flex items-center justify-between mb-3">

                          <span className="text-slate-400">

                            Streak

                          </span>

                          <span className="font-bold text-2xl">

                            🔥
                            {" "}
                            {
                              habit.streak
                            }

                          </span>

                        </div>

                        <div className="h-4 bg-white/5 rounded-full overflow-hidden">

                          <motion.div

                            initial={{
                              width: 0,
                            }}

                            animate={{
                              width:
                                `${
                                  Math.min(
                                    habit.streak *
                                      10,
                                    100
                                  )
                                }%`,
                            }}

                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                          />

                        </div>

                      </div>

                    </motion.div>
                  )
                )}

              </div>
            )
        }

      </motion.div>

      {/* FOCUS SESSIONS */}

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

        <div className="flex items-center justify-between mb-10">

          <div>

            <h2 className="text-4xl font-black">

              🧠 Focus Session Analytics

            </h2>

            <p className="text-slate-400 mt-2">

              Deep work consistency tracking

            </p>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">

            <p className="text-slate-400">

              Total Sessions

            </p>

            <h2 className="text-5xl font-black mt-4">

              {sessions.length}

            </h2>

          </div>

          <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">

            <p className="text-slate-400">

              Total Focus Time

            </p>

            <h2 className="text-5xl font-black mt-4">

              {
                sessions.length *
                25
              }
              m

            </h2>

          </div>

          <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">

            <p className="text-slate-400">

              Productivity Rating

            </p>

            <h2 className="text-5xl font-black mt-4">

              Elite

            </h2>

          </div>

        </div>

      </motion.div>

    </div>
  );
}