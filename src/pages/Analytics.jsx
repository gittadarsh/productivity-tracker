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

  LineChart,
  Line,

  XAxis,
  YAxis,

  Tooltip,
  ResponsiveContainer,

  AreaChart,
  Area,

  CartesianGrid,

} from "recharts";

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

  /* MOCK VISUAL DATA */

  const xpData = [

    {
      day: "Mon",
      xp: 120,
    },

    {
      day: "Tue",
      xp: 220,
    },

    {
      day: "Wed",
      xp: 380,
    },

    {
      day: "Thu",
      xp: 520,
    },

    {
      day: "Fri",
      xp: 740,
    },

    {
      day: "Sat",
      xp: 900,
    },

    {
      day: "Sun",
      xp: data.xp,
    },
  ];

  const focusData = [

    {
      day: "Mon",
      sessions: 1,
    },

    {
      day: "Tue",
      sessions: 2,
    },

    {
      day: "Wed",
      sessions: 3,
    },

    {
      day: "Thu",
      sessions: 2,
    },

    {
      day: "Fri",
      sessions: 4,
    },

    {
      day: "Sat",
      sessions: 5,
    },

    {
      day: "Sun",
      sessions: data.sessions,
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

        </div>

      </motion.div>

      {/* SCORE */}

      <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl p-10 shadow-2xl">

        <div className="text-center">

          <p className="text-cyan-400 uppercase tracking-[6px] text-sm font-semibold">

            Productivity Score

          </p>

          <h1 className="text-[120px] md:text-[180px] font-black leading-none mt-5 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

            {data.score}

          </h1>

        </div>

      </div>

      {/* CHARTS */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* XP GRAPH */}

        <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

          <h2 className="text-3xl font-black mb-8">

            ⚡ XP Growth

          </h2>

          <div className="h-[320px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <AreaChart
                data={xpData}
              >

                <defs>

                  <linearGradient
                    id="xp"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="5%"
                      stopColor="#06b6d4"
                      stopOpacity={0.8}
                    />

                    <stop
                      offset="95%"
                      stopColor="#06b6d4"
                      stopOpacity={0}
                    />

                  </linearGradient>

                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
                />

                <XAxis
                  dataKey="day"
                  stroke="#94a3b8"
                />

                <YAxis
                  stroke="#94a3b8"
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="xp"
                  stroke="#06b6d4"
                  fillOpacity={1}
                  fill="url(#xp)"
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* FOCUS GRAPH */}

        <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

          <h2 className="text-3xl font-black mb-8">

            🧠 Focus Sessions

          </h2>

          <div className="h-[320px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart
                data={focusData}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
                />

                <XAxis
                  dataKey="day"
                  stroke="#94a3b8"
                />

                <YAxis
                  stroke="#94a3b8"
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="sessions"
                  stroke="#a855f7"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* INSIGHTS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {[
          {
            title:
              "Peak Momentum",

            desc:
              "Your consistency is accelerating rapidly.",

            icon: "🚀",
          },

          {
            title:
              "Deep Focus",

            desc:
              "Focus sessions increased strongly this week.",

            icon: "🧠",
          },

          {
            title:
              "Execution Quality",

            desc:
              "Your productivity score is outperforming average users.",

            icon: "⚡",
          },
        ].map(
          (
            item,
            index
          ) => (

            <motion.div
              key={index}
              whileHover={{
                y: -5,
              }}
              className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl"
            >

              <div className="text-6xl">

                {item.icon}

              </div>

              <h3 className="text-3xl font-black mt-6">

                {item.title}

              </h3>

              <p className="text-slate-400 text-lg mt-4 leading-relaxed">

                {item.desc}

              </p>

            </motion.div>
          )
        )}

      </div>

    </div>
  );
}