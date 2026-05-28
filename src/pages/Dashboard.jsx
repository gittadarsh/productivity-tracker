import {

  motion,

} from "framer-motion";

import {

  useEffect,
  useState,

} from "react";

import FocusSessionModal from "../components/FocusSessionModal";

import {

  auth,
  db,

} from "../firebase";

import {

  collection,
  getDocs,
  query,
  where,

} from "firebase/firestore";

export default function Dashboard() {

  const [
    focusOpen,
    setFocusOpen
  ] = useState(false);

  const [
    loading,
    setLoading
  ] = useState(true);

  const [
    stats,
    setStats
  ] = useState({

    xp: 0,

    sessions: 0,

    habits: 0,

    completedHabits: 0,

    streak: 0,
  });

  /* LOAD DATA */

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard =
    async () => {

      try {

        const user =
          auth.currentUser;

        if (!user)
          return;

        /* FOCUS SESSIONS */

        const sessionQuery =
          query(

            collection(
              db,
              "focusSessions"
            ),

            where(
              "uid",
              "==",
              user.uid
            )
          );

        const sessionSnap =
          await getDocs(
            sessionQuery
          );

        const sessions =
          sessionSnap.docs.map(
            (doc) =>
              doc.data()
          );

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
              user.uid
            )
          );

        const habitSnap =
          await getDocs(
            habitQuery
          );

        const habits =
          habitSnap.docs.map(
            (doc) =>
              doc.data()
          );

        /* CALCULATIONS */

        const totalXP =
          sessions.reduce(
            (
              acc,
              curr
            ) =>

              acc +
              (
                curr.xp ||
                0
              ),

            0
          );

        const totalSessions =
          sessions.length;

        const totalHabits =
          habits.length;

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
                habit.streak ||
                  0
              ),

            0
          );

        setStats({

          xp: totalXP,

          sessions:
            totalSessions,

          habits:
            totalHabits,

          completedHabits,

          streak:
            highestStreak,
        });

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  const cards = [

    {
      title:
        "Total XP",

      value:
        stats.xp,

      icon:
        "⚡",

      gradient:
        "from-cyan-500 to-blue-500",
    },

    {
      title:
        "Focus Sessions",

      value:
        stats.sessions,

      icon:
        "🧠",

      gradient:
        "from-purple-500 to-pink-500",
    },

    {
      title:
        "Habits Completed",

      value:
        `${stats.completedHabits}/${stats.habits}`,

      icon:
        "🎯",

      gradient:
        "from-green-500 to-emerald-500",
    },

    {
      title:
        "Highest Streak",

      value:
        `${stats.streak} Days`,

      icon:
        "🔥",

      gradient:
        "from-orange-500 to-red-500",
    },
  ];

  return (

    <>

      {/* FOCUS MODAL */}

      <FocusSessionModal
        open={focusOpen}
        setOpen={setFocusOpen}
      />

      <div className="space-y-8">

        {/* HERO */}

        <motion.div

          initial={{
            opacity: 0,
            y: 30,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 backdrop-blur-xl p-8 md:p-10 shadow-2xl"
        >

          <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/20 blur-[120px]" />

          <div className="relative z-10">

            <p className="text-cyan-400 font-semibold tracking-widest uppercase mb-3">

              Live Productivity System

            </p>

            <h1 className="text-5xl md:text-6xl font-black leading-tight max-w-4xl">

              Build
              {" "}

              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                unstoppable
              </span>

              {" "}
              productivity consistency.
            </h1>

            <p className="text-slate-400 text-lg mt-6 max-w-2xl leading-relaxed">

              Your live productivity metrics,
              focus sessions,
              habits,
              streaks,
              and AI insights all in one place.

            </p>

            <div className="flex flex-wrap gap-4 mt-8">

              <button
                onClick={() =>
                  setFocusOpen(
                    true
                  )
                }

                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-[1.03] transition-all duration-300 px-8 py-4 rounded-2xl font-bold shadow-2xl"
              >

                🚀 Start Focus Session

              </button>

            </div>

          </div>

        </motion.div>

        {/* STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

          {cards.map((card, index) => (

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
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.gradient} opacity-20 blur-3xl`}
              />

              <div className="relative z-10">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-slate-400 text-sm">

                      {card.title}

                    </p>

                    <h2 className="text-4xl font-black mt-3">

                      {
                        loading

                          ? "--"

                          : card.value
                      }

                    </h2>

                  </div>

                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${card.gradient} flex items-center justify-center text-3xl shadow-xl`}
                  >

                    {card.icon}

                  </div>

                </div>

              </div>

            </motion.div>
          ))}

        </div>

        {/* LIVE STATUS */}

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

          <div className="flex items-center justify-between flex-wrap gap-5">

            <div>

              <h2 className="text-4xl font-black">

                ⚡ Productivity Status

              </h2>

              <p className="text-slate-400 mt-3">

                Real-time productivity overview powered by Firebase data.

              </p>

            </div>

            <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 px-5 py-3 rounded-2xl">

              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />

              <span className="font-bold text-green-400">

                Live Tracking Active

              </span>

            </div>

          </div>

        </motion.div>

      </div>

    </>
  );
}