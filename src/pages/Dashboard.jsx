import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  Link,
} from "react-router-dom";

import {
  auth,
  db,
} from "../firebase";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import AICoachDashboard from "../components/AICoachDashboard";

import XPProgress from "../components/XPProgress";

export default function Dashboard() {

  const [stats, setStats] =
    useState({

      xp: 0,

      sessions: 0,

      streak: 0,

      goals: 0,
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard =
    async () => {

      try {

        const user =
          auth.currentUser;

        if (!user) {

          setLoading(false);

          return;
        }

        const userRef =
          doc(
            db,
            "users",
            user.uid
          );

        const userSnap =
          await getDoc(
            userRef
          );

        const focusRef =
          doc(
            db,
            "focusSessions",
            user.uid
          );

        const focusSnap =
          await getDoc(
            focusRef
          );

        const userData =
          userSnap.exists()

            ? userSnap.data()

            : {};

        const focusData =
          focusSnap.exists()

            ? focusSnap.data()

            : {};

        const sessions =
          focusData.sessions || 0;

        const streak =
          sessions > 0

            ? Math.floor(
                sessions / 3
              )

            : 0;

        setStats({

          xp:
            userData.xp || 0,

          sessions,

          streak,

          goals:
            userData.completedGoals || 0,
        });

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  const level =
    Math.max(
      1,
      Math.floor(
        stats.xp / 250
      )
    );

  const rank =

    level >= 20
      ? "Elite Performer"

    : level >= 10
      ? "Deep Worker"

    : level >= 5
      ? "Consistent"

    : "Beginner";

  const quickActions = [

    {
      title: "Focus",
      icon: "🧠",
      path: "/focus",
    },

    {
      title: "Analytics",
      icon: "📈",
      path: "/analytics",
    },

    {
      title: "Missions",
      icon: "🚀",
      path: "/missions",
    },

    {
      title: "Achievements",
      icon: "🏆",
      path: "/achievements",
    },
  ];

  const statCards = [

    {
      title: "Total XP",
      value: stats.xp,
      icon: "⚡",
    },

    {
      title: "Focus Sessions",
      value: stats.sessions,
      icon: "🧠",
    },

    {
      title: "Current Streak",
      value: stats.streak,
      icon: "🔥",
    },

    {
      title: "Goals Completed",
      value: stats.goals,
      icon: "🎯",
    },
  ];

  if (loading) {

    return (

      <div className="flex items-center justify-center min-h-[60vh]">

        <div className="text-slate-400 text-2xl">

          Loading dashboard...

        </div>

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

        className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 backdrop-blur-xl p-8 md:p-12 shadow-2xl"
      >

        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/20 blur-[120px]" />

        <div className="relative z-10">

          <p className="text-cyan-400 uppercase tracking-[6px] text-sm font-semibold">

            Productivity Intelligence

          </p>

          <h1 className="text-5xl md:text-7xl font-black mt-6 leading-tight">

            Build{" "}

            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              elite consistency

            </span>

          </h1>

          <p className="text-slate-400 text-lg md:text-xl mt-6 max-w-3xl">

            AI-powered productivity intelligence and behavioral coaching platform.

          </p>

          <div className="flex flex-wrap gap-5 mt-8">

            <div className="px-6 py-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">

              <p className="text-slate-400 text-sm">

                Current Level

              </p>

              <h3 className="text-3xl font-black text-cyan-400 mt-2">

                Level {level}

              </h3>

            </div>

            <div className="px-6 py-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">

              <p className="text-slate-400 text-sm">

                Productivity Rank

              </p>

              <h3 className="text-3xl font-black text-purple-400 mt-2">

                {rank}

              </h3>

            </div>

          </div>

        </div>

      </motion.div>

      {/* AI COACH */}

      <AICoachDashboard />

      {/* XP PROGRESS */}

      <XPProgress />

      {/* QUICK ACTIONS */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

        {quickActions.map((action, index) => (

          <Link
            key={index}
            to={action.path}
          >

            <motion.div
              whileHover={{
                y: -5,
              }}
              className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-7 shadow-2xl hover:bg-white/10 transition-all"
            >

              <div className="text-5xl">

                {action.icon}

              </div>

              <h3 className="text-2xl font-black mt-6">

                {action.title}

              </h3>

            </motion.div>

          </Link>
        ))}

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {statCards.map((stat, index) => (

          <motion.div
            key={index}
            whileHover={{
              y: -5,
            }}
            className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-7 shadow-2xl"
          >

            <div className="text-5xl">

              {stat.icon}

            </div>

            <p className="text-slate-400 mt-7 text-lg">

              {stat.title}

            </p>

            <h2 className="text-5xl md:text-6xl font-black mt-4">

              {stat.value}

            </h2>

          </motion.div>
        ))}

      </div>

    </div>
  );
}