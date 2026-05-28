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

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

export default function StudentProgress() {

  const { uid } =
    useParams();

  const [student, setStudent] =
    useState(null);

  const [habits, setHabits] =
    useState([]);

  const [sessions, setSessions] =
    useState([]);

  const [goals, setGoals] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

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
              id: doc.id,
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
              id: doc.id,
              ...doc.data(),
            })
          );

        setSessions(
          sessionData
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
              uid
            )
          );

        const goalSnap =
          await getDocs(
            goalQuery
          );

        const goalData =
          goalSnap.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

        setGoals(goalData);

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

  const completedGoals =
    goals.filter(
      (g) =>
        g.completed
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

    (
      student?.xp || 0
    ) +

    sessions.length * 10 +

    completedHabits * 20 +

    completedGoals * 30;

  /* CHART DATA */

  const barData = [

    {
      name: "XP",
      value:
        student?.xp || 0,
    },

    {
      name: "Sessions",
      value:
        sessions.length,
    },

    {
      name: "Habits",
      value:
        completedHabits,
    },

    {
      name: "Goals",
      value:
        completedGoals,
    },
  ];

  const pieData = [

    {
      name: "Completed",
      value:
        completedGoals,
    },

    {
      name: "Pending",
      value:
        goals.length -
        completedGoals,
    },
  ];

  const trendData = [

    {
      day: "Mon",
      score: 25,
    },

    {
      day: "Tue",
      score: 40,
    },

    {
      day: "Wed",
      score: 55,
    },

    {
      day: "Thu",
      score: 60,
    },

    {
      day: "Fri",
      score: 80,
    },

    {
      day: "Sat",
      score: 95,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#ef4444",
  ];

  if (loading) {

    return (

      <div className="text-center text-slate-400 py-20">

        Loading analytics...

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

                Student Intelligence

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

                Live Monitoring

              </span>

            </div>

          </div>

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
              sessions.length,
            icon:
              "🧠",
          },

          {
            title:
              "Highest Streak",
            value:
              highestStreak,
            icon:
              "🔥",
          },

          {
            title:
              "Goal Completion",
            value:
              `${completedGoals}/${goals.length}`,
            icon:
              "🎯",
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

                  {card.value}

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

        {/* BAR */}

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
                data={barData}
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

        {/* PIE */}

        <div className="rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

          <h2 className="text-3xl font-black mb-8">

            🎯 Goal Completion

          </h2>

          <div className="h-[350px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  dataKey="value"
                  label
                >

                  {pieData.map(
                    (
                      entry,
                      index
                    ) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index
                          ]
                        }
                      />
                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* TREND */}

      <div className="rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

        <h2 className="text-4xl font-black mb-8">

          📈 Weekly Productivity Trend

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
  );
}