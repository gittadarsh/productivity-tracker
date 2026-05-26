import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "../firebase";

import FeedbackBox from "../components/FeedbackBox";

export default function StudentProgress() {

  const { uid } = useParams();

  const [studentData,
    setStudentData] =
    useState(null);

  const [habitsData,
    setHabitsData] =
    useState({});

  const [habitsList,
    setHabitsList] =
    useState([]);

  useEffect(() => {

    const loadStudentData =
      async () => {

        try {

          /* LOAD USER INFO */

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

            setStudentData(
              userSnap.data()
            );
          }

          /* LOAD HABITS */

          const habitsRef =
            doc(
              db,
              "habits",
              uid
            );

          const habitsSnap =
            await getDoc(
              habitsRef
            );

          if (
            habitsSnap.exists()
          ) {

            const data =
              habitsSnap.data();

            setHabitsData(
              data.habits || {}
            );

            setHabitsList(
              data.habitsList || []
            );
          }

        } catch (error) {

          console.log(error);

        }
      };

    loadStudentData();

  }, [uid]);

  const calculateStreak =
    (habit) => {

      let streak = 0;

      for (
        let i = 0;
        i < 30;
        i++
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

        if (
          habitsData[
            formatted
          ]?.[habit]
        ) {

          streak++;

        } else {

          break;
        }
      }

      return streak;
    };

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const completedToday =
    habitsList.filter(
      (habit) =>
        habitsData[today]?.[
          habit
        ]
    ).length;

  return (

    <div className="max-w-7xl mx-auto">

      {/* HEADER */}

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl mb-10">

        <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">

          👨‍🎓 Student Progress

        </h1>

        {studentData ? (

          <div className="space-y-3 text-lg">

            <p>

              <span className="font-bold text-cyan-400">
                Name:
              </span>

              {" "}

              {studentData.name}

            </p>

            <p>

              <span className="font-bold text-cyan-400">
                Email:
              </span>

              {" "}

              {studentData.email}

            </p>

            <p>

              <span className="font-bold text-cyan-400">
                Role:
              </span>

              {" "}

              {studentData.role}

            </p>

            <p className="break-all">

              <span className="font-bold text-cyan-400">
                UID:
              </span>

              {" "}

              {uid}

            </p>

          </div>

        ) : (

          <p>
            Loading student...
          </p>

        )}

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-gradient-to-br from-green-500 to-emerald-700 p-8 rounded-3xl shadow-2xl">

          <h2 className="text-2xl font-bold mb-4">

            ✅ Completed Today

          </h2>

          <p className="text-5xl font-bold">

            {completedToday}/
            {habitsList.length}

          </p>

        </div>

        <div className="bg-gradient-to-br from-cyan-500 to-blue-700 p-8 rounded-3xl shadow-2xl">

          <h2 className="text-2xl font-bold mb-4">

            📅 Current Date

          </h2>

          <p className="text-4xl font-bold">

            {today}

          </p>

        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-700 p-8 rounded-3xl shadow-2xl">

          <h2 className="text-2xl font-bold mb-4">

            🎯 Total Habits

          </h2>

          <p className="text-5xl font-bold">

            {habitsList.length}

          </p>

        </div>

      </div>

      {/* HABITS */}

      <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

        📈 Habit Performance

      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {habitsList.map(
          (habit) => {

            const completed =
              habitsData[
                today
              ]?.[habit];

            return (

              <div
                key={habit}

                className={`p-8 rounded-3xl shadow-2xl border transition duration-300 hover:scale-105

                ${
                  completed

                    ? "bg-gradient-to-br from-green-500 to-emerald-700 border-green-400"

                    : "bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700"
                }`}
              >

                <h2 className="text-3xl font-bold mb-5">

                  {completed
                    ? "✅"
                    : "⬜"}

                  {" "}

                  {habit}

                </h2>

                <p className="text-lg text-slate-200 mb-4">

                  {completed

                    ? "Completed Today 🎉"

                    : "Not Completed Today"}

                </p>

                <p className="text-lg text-slate-300">

                  🔥 Streak:
                  {" "}

                  {calculateStreak(
                    habit
                  )}

                  {" "}

                  days

                </p>

              </div>
            );
          }
        )}

      </div>

      {/* FEEDBACK */}

      <FeedbackBox
        studentId={uid}
      />

    </div>
  );
}