import {

  useEffect,
  useState,

} from "react";

import {

  doc,
  onSnapshot,

} from "firebase/firestore";

import {

  auth,
  db,

} from "../firebase";

import toast from "react-hot-toast";

import {

  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,

} from "recharts";

export default function Analytics() {

  const [
    weeklyData,
    setWeeklyData
  ] = useState([]);

  const [
    habitData,
    setHabitData
  ] = useState([]);

  const [
    loading,
    setLoading
  ] = useState(true);

  /* REALTIME ANALYTICS */

  useEffect(() => {

    if (!auth.currentUser) {
      return;
    }

    const docRef =
      doc(
        db,
        "habits",
        auth.currentUser.uid
      );

    const unsubscribe =
      onSnapshot(

        docRef,

        (docSnap) => {

          try {

            if (
              docSnap.exists()
            ) {

              const data =
                docSnap.data();

              const habits =
                data.habits || {};

              const habitsList =
                data.habitsList || [];

              /* WEEKLY PRODUCTIVITY */

              const weekly =
                [];

              for (
                let i = 6;
                i >= 0;
                i--
              ) {

                const date =
                  new Date();

                date.setDate(
                  date.getDate() - i
                );

                const formatted =
                  date
                    .toISOString()
                    .split("T")[0];

                const completed =
                  Object.values(
                    habits[
                      formatted
                    ] || {}
                  ).filter(Boolean)
                    .length;

                weekly.push({

                  day:
                    date.toLocaleDateString(
                      "en-US",
                      {
                        weekday:
                          "short",
                      }
                    ),

                  productivity:
                    completed,
                });
              }

              setWeeklyData(
                weekly
              );

              /* HABIT PERFORMANCE */

              const performance =
                habitsList.map(
                  (habit) => {

                    let total = 0;

                    Object.values(
                      habits
                    ).forEach(
                      (day) => {

                        if (
                          day[
                            habit
                          ]
                        ) {

                          total++;
                        }
                      }
                    );

                    return {

                      habit,

                      completed:
                        total,
                    };
                  }
                );

              setHabitData(
                performance
              );
            }

            setLoading(false);

          } catch (error) {

            console.log(error);

            toast.error(
              "Analytics sync failed"
            );
          }
        }
      );

    return () =>
      unsubscribe();

  }, []);

  /* LOADING */

  if (loading) {

    return (

      <div className="space-y-6 animate-pulse">

        <div className="bg-slate-800 rounded-3xl p-8 h-[300px]"></div>

        <div className="bg-slate-800 rounded-3xl p-8 h-[300px]"></div>

      </div>
    );
  }

  return (

    <div>

      <h1 className="text-5xl font-bold mb-10">

        📈 Real-Time Analytics

      </h1>

      {/* WEEKLY PRODUCTIVITY */}

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl mb-10">

        <h2 className="text-3xl font-bold mb-8">

          📊 Weekly Productivity Trend

        </h2>

        <div className="w-full h-[400px]">

          <ResponsiveContainer>

            <LineChart
              data={weeklyData}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="day" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="productivity"
                stroke="#06b6d4"
                strokeWidth={4}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* HABIT PERFORMANCE */}

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl">

        <h2 className="text-3xl font-bold mb-8">

          🏆 Habit Performance

        </h2>

        <div className="w-full h-[400px]">

          <ResponsiveContainer>

            <BarChart
              data={habitData}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="habit" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="completed"
                fill="#22c55e"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}