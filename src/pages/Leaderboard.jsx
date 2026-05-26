import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase";

export default function Leaderboard() {

  const [students,
    setStudents] =
    useState([]);

  useEffect(() => {

    const loadLeaderboard =
      async () => {

        try {

          const usersSnapshot =
            await getDocs(
              collection(
                db,
                "users"
              )
            );

          const habitsSnapshot =
            await getDocs(
              collection(
                db,
                "habits"
              )
            );

          const habitsMap = {};

          habitsSnapshot.forEach(
            (doc) => {

              habitsMap[
                doc.id
              ] = doc.data();
            }
          );

          const leaderboard = [];

          usersSnapshot.forEach(
            (doc) => {

              const user =
                doc.data();

              if (
                user.role ===
                "student"
              ) {

                const userHabits =
                  habitsMap[
                    user.uid
                  ];

                let score = 0;

                if (
                  userHabits?.habits
                ) {

                  Object.values(
                    userHabits.habits
                  ).forEach(
                    (day) => {

                      Object.values(day)
                        .forEach(
                          (completed) => {

                            if (
                              completed
                            ) {

                              score += 10;
                            }
                          }
                        );
                    }
                  );
                }

                leaderboard.push({

                  ...user,

                  score,
                });
              }
            }
          );

          leaderboard.sort(
            (a, b) =>
              b.score -
              a.score
          );

          setStudents(
            leaderboard
          );

        } catch (error) {

          console.log(error);
        }
      };

    loadLeaderboard();

  }, []);

  return (

    <div>

      <h1 className="text-5xl font-bold mb-10">

        🏆 Leaderboard

      </h1>

      <div className="space-y-6">

        {students.map(
          (student, index) => (

            <div
              key={index}

              className="bg-slate-800 p-6 rounded-3xl shadow-lg flex items-center justify-between"
            >

              <div className="flex items-center gap-5">

                <div className="text-4xl font-bold text-cyan-400">

                  #{index + 1}

                </div>

                <img
                  src={student.photo}
                  alt="profile"

                  className="w-16 h-16 rounded-full"
                />

                <div>

                  <h2 className="text-2xl font-bold">

                    {student.name}

                  </h2>

                  <p className="text-slate-300">

                    {student.email}

                  </p>

                </div>

              </div>

              <div className="text-3xl font-bold text-green-400">

                {student.score}
                {" "}
                pts

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}