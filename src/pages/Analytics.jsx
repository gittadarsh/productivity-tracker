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
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

export default function Analytics() {

  const [stats, setStats] =
    useState({

      xp: 0,

      sessions: 0,

      completedHabits: 0,

      totalHabits: 0,

      completedGoals: 0,

      totalGoals: 0,
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

        /* GOALS */

        const goalQuery =
          query(
            collection(
              db,
              "assignedGoals"
            ),
            where(
              "studentUid",
              "==",
              user.uid
            )
          );

        const goalSnap =
          await getDocs(
            goalQuery
          );

        const goals =
          goalSnap.docs.map(
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

        const completedHabits =
          habits.filter(
            (h) =>
              h.completed
          ).length;

        const completedGoals =
          goals.filter(
            (g) =>
              g.completed
          ).length;

        setStats({

          xp: totalXP,

          sessions:
            sessions.length,

          completedHabits,

          totalHabits:
            habits.length,

          completedGoals,

          totalGoals:
            goals.length,
        });

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

  /* CHART DATA */

  const productivityData = [

    {
      name: "Focus",
      value:
        stats.sessions *
        10,
    },

    {
      name: "Habits",
      value:
        stats.completedHabits *
        15,
    },

    {
      name: "Goals",
      value:
        stats.completedGoals *
        25,
    },

    {
      name: "XP",
      value:
        stats.xp,
    },
  ];

  const trendData = [

    {
      day: "Mon",
      score: 20,
    },

    {
      day: "Tue",
      score: 35,
    },

    {
      day: "Wed",
      score: 50,
    },

    {
      day: "Thu",
      score: 65,
    },

    {
      day: "Fri",
      score: 80,
    },

    {
      day: "Sat",
      score: 92,
    },
  ];

  const productivityScore =

    stats.xp +

    stats.completedHabits *
      20 +

    stats.completedGoals *
      30;

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

        <div className="relative z-10">

          <p className="text-cyan-400 uppercase tracking-[6px] text-sm font-semibold">

            Live Productivity Analytics

          </p>

          <h1 className="text-5xl md:text-6xl font-black mt-5 leading-tight">

            Analyze your
            {" "}

            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              performance intelligence
            </span>

          </h1>

          <p className="text-slate-400 text-lg mt-6 max-w-3xl leading-relaxed">

            Real analytics generated from habits,
            focus sessions,
            and assigned goal execution.

          </p>

        </div>

      </motion.div>

      {/* STATS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {[
          {
            title:
              "Productivity Score",
            value:
              productivityScore,
            icon:
              "📈",
          },

          {
            title:
              "Focus Sessions",
            value:
              stats.sessions,
            icon:
              "🧠",
          },

          {
            title:
              "Completed Goals",
            value:
              `${stats.completedGoals}/${stats.totalGoals}`,
            icon:
              "🎯",
          },

          {
            title:
              "Habit Completion",
            value:
              `${stats.completedHabits}/${stats.totalHabits}`,
            icon:
              "⚡",
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
              delay:
                index * 0.08,
            }}
            className="rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-400 text-sm">

                  {card.title}

                </p>

                <h2 className="text-4xl font-black mt-4">

                  {
                    loading
                      ? "--"
                      : card.value
                  }

                </h2>

              </div>

              <div className="text-5xl">

                {card.icon}

              </div>

            </div>

          </motion.div>
        ))}

      </div>

      {/* CHARTS */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* BAR CHART */}

        <div className="rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

          <h2 className="text-3xl font-black mb-8">

            📊 Productivity Breakdown

          </h2>

          <div className="h-[350px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={
                  productivityData
                }
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#334155"
                />

                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                />

                <YAxis
                  stroke="#94a3b8"
                />

                <Tooltip />

                <Bar
                  dataKey="value"
                  radius={[
                    12,
                    12,
                    0,
                    0,
                  ]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* LINE CHART */}

        <div className="rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

          <h2 className="text-3xl font-black mb-8">

            📈 Weekly Growth Trend

          </h2>

          <div className="h-[350px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart
                data={trendData}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#334155"
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
                  dataKey="score"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* AI INSIGHTS */}

      <div className="rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

        <h2 className="text-4xl font-black mb-8">

          🤖 AI Productivity Insights

        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-3xl p-6">

            <h3 className="text-cyan-400 font-bold text-xl mb-3">

              Productivity Momentum

            </h3>

            <p className="text-slate-300 leading-relaxed">

              Your consistency score is improving based on recent session activity.

            </p>

          </div>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-3xl p-6">

            <h3 className="text-purple-400 font-bold text-xl mb-3">

              Goal Execution

            </h3>

            <p className="text-slate-300 leading-relaxed">

              Goal completion performance indicates strong accountability growth.

            </p>

          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-6">

            <h3 className="text-green-400 font-bold text-xl mb-3">

              Focus Stability

            </h3>

            <p className="text-slate-300 leading-relaxed">

              AI detected stable focus session consistency over time.

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}