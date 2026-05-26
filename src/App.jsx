import { useEffect, useState } from "react";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import {
  useParams,
} from "react-router-dom";

import { db } from "../firebase";

export default function StudentProgress() {

  const { uid } = useParams();

  const [studentData,
    setStudentData] =
    useState(null);

  useEffect(() => {

    const loadStudentData =
      async () => {

        try {

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
            habitsSnap.exists()
            &&
            userSnap.exists()
          ) {

            setStudentData({

              user:
                userSnap.data(),

              habits:
                habitsSnap.data(),
            });
          }

        } catch (error) {

          console.log(error);

        }
      };

    loadStudentData();

  }, [uid]);

  if (!studentData) {

    return (

      <div className="text-3xl font-bold">

        Loading...

      </div>
    );
  }

  const habits =
    studentData.habits.habits || {};

  const habitsList =
    studentData.habits.habitsList || [];

  const totalDays =
    Object.keys(habits).length;

  return (

    <div>

      <h1 className="text-5xl font-bold mb-10 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

        👨‍🎓 Student Progress

      </h1>

      {/* STUDENT INFO */}

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl mb-10">

        <h2 className="text-4xl font-bold mb-4">

          {studentData.user.name}

        </h2>

        <p className="text-xl text-slate-300">

          📧
          {" "}
          {studentData.user.email}

        </p>

        <p className="text-slate-400 mt-3 break-all">

          UID:
          {" "}
          {studentData.user.uid}

        </p>

      </div>

      {/* ANALYTICS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl">

          <h2 className="text-2xl mb-4">

            Total Habits

          </h2>

          <p className="text-5xl font-bold text-cyan-400">

            {habitsList.length}

          </p>

        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl">

          <h2 className="text-2xl mb-4">

            Active Days

          </h2>

          <p className="text-5xl font-bold text-green-400">

            {totalDays}

          </p>

        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl">

          <h2 className="text-2xl mb-4">

            Productivity Score

          </h2>

          <p className="text-5xl font-bold text-yellow-400">

            {totalDays * habitsList.length}

          </p>

        </div>

      </div>

      {/* HABIT DETAILS */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {habitsList.map((habit) => {

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
              habits[
                formatted
              ]?.[habit]
            ) {

              streak++;

            } else {

              break;
            }
          }

          return (

            <div
              key={habit}

              className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl"
            >

              <h2 className="text-3xl font-bold mb-4">

                {habit}

              </h2>

              <p className="text-xl text-green-400">

                🔥
                {" "}
                Streak:
                {" "}
                {streak}
                {" "}
                days

              </p>

            </div>
          );
        })}

      </div>

    </div>
  );
}