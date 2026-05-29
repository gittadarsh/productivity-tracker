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

  const quickActions = [

    {
      title: "Start Focus",
      icon: "🧠",
      path: "/focus",
      gradient:
        "from-cyan-500 to-blue-500",
    },

    {
      title: "Analytics",
      icon: "📈",
      path: "/analytics",
      gradient:
        "from-purple-500 to-pink-500",
    },

    {
      title: "Leaderboard",
      icon: "🏆",
      path: "/leaderboard",
      gradient:
        "from-yellow-500 to-orange-500",
    },

    {
      title: "Goals",
      icon: "🎯",
      path: "/assigned-goals",
      gradient:
        "from-green-500 to-emerald-500",
    },
  ];

  const statCards = [

    {
      title: "Total XP",
      value: stats.xp,
      icon: "⚡",
      color:
        "from-cyan-500 to-blue-500",
    },

    {
      title: "Focus Sessions",
      value: stats.sessions,
      icon: "🧠",
      color:
        "from-purple-500 to-pink-500",
    },

    {
      title: "Current Streak",
      value: stats.streak,
      icon: "🔥",
      color:
        "from-orange-500 to-red-500",
    },

    {
      title: "Completed Goals",
      value: stats.goals,
      icon: "🎯",
      color:
        "from-green-500 to-emerald-500",
    },
  ];

  if (loading) {

    return (

      <div className="flex items-center justify-center min-h-[60vh]">

        <div className="text-slate-400 text-2xl font-semibold">

          Loading productivity intelligence...

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
        className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 backdrop-blur-xl p-8 md:p-12 shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
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

          <p className="text-slate-400 text-lg md:text-xl mt-6 max-w-3xl leading-relaxed">

            Real-time productivity tracking powered by focus intelligence and accountability systems.

          </p>

        </div>

      </motion.div>

      {/* QUICK ACTIONS */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

        {quickActions.map(
          (
            action,
            index
          ) => (

            <Link
              key={index}
              to={action.path}
            >

              <motion.div
                whileHover={{
                  y: -5,
                }}
                className="relative overflow-hidden rounded-[32px] border border-white/10 hover:border-cyan-500/20 bg-white/5 backdrop-blur-xl p-7 shadow-2xl transition-all duration-300 hover:scale-[1.03]"
              >

                <div className={`

                absolute inset-0 opacity-10

                bg-gradient-to-br

                ${action.gradient}`}
                />

                <div className="relative z-10">

                  <div className="text-5xl">

                    {action.icon}

                  </div>

                  <h3 className="text-2xl font-black mt-6">

                    {action.title}

                  </h3>

                </div>

              </motion.div>

            </Link>
          )
        )}

      </div>

      {/* LIVE STATS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {statCards.map(
          (
            stat,
            index
          ) => (

            <motion.div
              key={index}
              whileHover={{
                y: -6,
              }}
              className="relative overflow-hidden rounded-[32px] border border-white/10 hover:border-cyan-500/20 bg-white/5 backdrop-blur-xl p-7 shadow-2xl transition-all duration-300 hover:scale-[1.02]"
            >

              <div className={`

              absolute top-0 right-0

              w-52 h-52 blur-[110px]

              opacity-20

              bg-gradient-to-br

              ${stat.color}`}
              />

              <div className="relative z-10">

                <div className="flex items-center justify-between">

                  <div className="text-5xl">

                    {stat.icon}

                  </div>

                  <div className={`

                  px-4 py-2 rounded-xl text-xs font-bold

                  bg-gradient-to-r

                  ${stat.color}`}
                  >

                    LIVE

                  </div>

                </div>

                <p className="text-slate-400 mt-7 text-lg">

                  {stat.title}

                </p>

                <h2 className="text-5xl md:text-6xl font-black mt-4">

                  {stat.value}

                  {
                    stat.title ===
                    "Current Streak"

                      ? "d"

                      : ""
                  }

                </h2>

              </div>

            </motion.div>
          )
        )}

      </div>

    </div>
  );
}