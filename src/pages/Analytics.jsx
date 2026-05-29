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

export default function Analytics() {

  const [data, setData] =
    useState({

      xp: 0,

      sessions: 0,

      streak: 0,

      goals: 0,

      score: 0,
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadAnalytics();

  }, []);

  const loadAnalytics =
    async () => {

      try {

        const user =
          auth.currentUser;

        if (!user)
          return;

        /* USER */

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

        /* FOCUS */

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

        const xp =
          userData.xp || 0;

        const sessions =
          focusData.sessions || 0;

        const goals =
          userData.completedGoals || 0;

        const streak =
          Math.floor(
            sessions / 3
          );

        /* PRODUCTIVITY SCORE */

        const score =
          Math.min(

            100,

            Math.floor(

              xp * 0.02 +

              sessions * 2 +

              streak * 4 +

              goals * 5
            )
          );

        setData({

          xp,

          sessions,

          streak,

          goals,

          score,
        });

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

  const insights = [

    {
      title:
        "Peak Productivity",

      description:
        "Your productivity is improving rapidly through focus consistency.",

      icon: "🚀",
    },

    {
      title:
        "Focus Intelligence",

      description:
        "You perform best when completing multiple focus sessions daily.",

      icon: "🧠",
    },

    {
      title:
        "Streak Momentum",

      description:
        "Maintaining your streak is dramatically improving execution consistency.",

      icon: "🔥",
    },
  ];

  if (loading) {

    return (

      <div className="flex items-center justify-center min-h-[60vh]">

        <div className="text-slate-400 text-2xl">

          Loading analytics...

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
        className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-purple-500/10 to-pink-500/5 backdrop-blur-xl p-8 md:p-12 shadow-2xl"
      >

        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/20 blur-[120px]" />

        <div className="relative z-10">

          <p className="text-purple-400 uppercase tracking-[6px] text-sm font-semibold">

            Productivity Intelligence

          </p>

          <h1 className="text-5xl md:text-7xl font-black mt-6 leading-tight">

            Performance
            {" "}

            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">

              Analytics

            </span>

          </h1>

          <p className="text-slate-400 text-lg md:text-xl mt-6 max-w-3xl leading-relaxed">

            AI-powered productivity insights and behavioral performance tracking.

          </p>

        </div>

      </motion.div>

      {/* SCORE */}

      <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl p-10 shadow-2xl">

        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-[120px]" />

        <div className="relative z-10 text-center">

          <p className="text-cyan-400 uppercase tracking-[6px] text-sm font-semibold">

            Productivity Score

          </p>

          <h1 className="text-[120px] md:text-[180px] font-black leading-none mt-5 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

            {data.score}

          </h1>

          <p className="text-2xl text-slate-400 mt-4">

            Elite Productivity Level

          </p>

          {/* PROGRESS */}

          <div className="max-w-3xl mx-auto mt-10">

            <div className="w-full h-6 rounded-full bg-white/5 overflow-hidden">

              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: `${data.score}%`,
                }}
                transition={{
                  duration: 1.5,
                }}
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
              />

            </div>

          </div>

        </div>

      </div>

      {/* METRICS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {[
          {
            title:
              "Total XP",

            value:
              data.xp,

            icon: "⚡",
          },

          {
            title:
              "Focus Sessions",

            value:
              data.sessions,

            icon: "🧠",
          },

          {
            title:
              "Current Streak",

            value:
              data.streak,

            icon: "🔥",
          },

          {
            title:
              "Goals Completed",

            value:
              data.goals,

            icon: "🎯",
          },
        ].map(
          (
            item,
            index
          ) => (

            <motion.div
              key={index}
              whileHover={{
                y: -6,
              }}
              className="relative overflow-hidden rounded-[32px] border border-white/10 hover:border-cyan-500/20 bg-white/5 backdrop-blur-xl p-7 shadow-2xl transition-all duration-300 hover:scale-[1.02]"
            >

              <div className="absolute top-0 right-0 w-52 h-52 bg-cyan-500/10 blur-[110px]" />

              <div className="relative z-10">

                <div className="text-5xl">

                  {item.icon}

                </div>

                <p className="text-slate-400 mt-7 text-lg">

                  {item.title}

                </p>

                <h2 className="text-5xl md:text-6xl font-black mt-4">

                  {item.value}

                </h2>

              </div>

            </motion.div>
          )
        )}

      </div>

      {/* AI INSIGHTS */}

      <div className="space-y-5">

        <h2 className="text-4xl font-black">

          🧠 AI Productivity Insights

        </h2>

        {insights.map(
          (
            insight,
            index
          ) => (

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
                delay:
                  index * 0.08,
              }}
              whileHover={{
                y: -5,
              }}
              className="relative overflow-hidden rounded-[32px] border border-white/10 hover:border-cyan-500/20 bg-white/5 backdrop-blur-xl p-8 shadow-2xl transition-all duration-300 hover:scale-[1.01]"
            >

              <div className="absolute top-0 right-0 w-52 h-52 bg-purple-500/10 blur-[120px]" />

              <div className="relative z-10 flex items-start gap-6">

                <div className="text-6xl">

                  {insight.icon}

                </div>

                <div>

                  <h3 className="text-3xl font-black">

                    {insight.title}

                  </h3>

                  <p className="text-slate-400 text-lg mt-4 leading-relaxed">

                    {insight.description}

                  </p>

                </div>

              </div>

            </motion.div>
          )
        )}

      </div>

    </div>
  );
}