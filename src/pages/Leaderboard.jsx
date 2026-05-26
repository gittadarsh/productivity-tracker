import {

  useEffect,
  useState,

} from "react";

import {

  collection,
  getDocs,

} from "firebase/firestore";

import {

  db,

} from "../firebase";

export default function Leaderboard() {

  const [
    students,
    setStudents
  ] = useState([]);

  const [
    topPerformer,
    setTopPerformer
  ] = useState(null);

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

          const questionsSnapshot =
            await getDocs(

              collection(
                db,
                "questions"
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

          /* QUESTION SCORE */

          let solvedQuestions =
            0;

          questionsSnapshot.forEach(
            (doc) => {

              if (
                doc.data()
                  .solved
              ) {

                solvedQuestions += 1;
              }
            }
          );

          const leaderboard =
            [];

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

                let productivityScore =
                  0;

                let streakScore =
                  0;

                let completedHabits =
                  0;

                if (
                  userHabits?.habits
                ) {

                  Object.values(
                    userHabits.habits
                  ).forEach(
                    (day) => {

                      Object.values(
                        day
                      ).forEach(
                        (
                          completed
                        ) => {

                          if (
                            completed
                          ) {

                            productivityScore +=
                              10;

                            completedHabits += 1;
                          }
                        }
                      );
                    }
                  );

                  streakScore =
                    Math.floor(
                      completedHabits
                      / 5
                    );
                }

                const totalScore =

                  productivityScore
                  +
                  streakScore
                  +
                  (
                    solvedQuestions
                    * 5
                  );

                leaderboard.push({

                  ...user,

                  productivityScore,

                  streakScore,

                  solvedQuestions,

                  totalScore,
                });
              }
            }
          );

          leaderboard.sort(
            (a, b) =>

              b.totalScore
              -
              a.totalScore
          );

          setStudents(
            leaderboard
          );

          if (
            leaderboard.length >
            0
          ) {

            setTopPerformer(
              leaderboard[0]
            );
          }

        } catch (error) {

          console.log(error);

          alert(
            "Failed to load leaderboard"
          );
        }
      };

    loadLeaderboard();

  }, []);

  return (

    <div>

      <h1 className="text-5xl font-bold mb-10">

        🏆 Advanced Leaderboard

      </h1>

      {/* TOP PERFORMER */}

      {
        topPerformer && (

          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-8 rounded-3xl shadow-2xl mb-10 text-black">

            <h2 className="text-4xl font-bold mb-4">

              👑 Top Performer

            </h2>

            <div className="flex items-center gap-6">

              <img
                src={
                  topPerformer.photo
                }

                alt="profile"

                className="w-24 h-24 rounded-full border-4 border-white"
              />

              <div>

                <h3 className="text-3xl font-bold">

                  {
                    topPerformer.name
                  }

                </h3>

                <p className="text-xl mt-2">

                  {
                    topPerformer.totalScore
                  }
                  {" "}
                  pts

                </p>

              </div>

            </div>

          </div>
        )
      }

      {/* LEADERBOARD */}

      <div className="space-y-6">

        {students.map(
          (
            student,
            index
          ) => (

            <div
              key={index}

              className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-6 rounded-3xl shadow-2xl flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
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

              {/* STATS */}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                <div className="bg-slate-900 p-4 rounded-2xl text-center">

                  <p className="text-sm text-slate-400">

                    Productivity

                  </p>

                  <p className="text-xl font-bold text-cyan-400">

                    {
                      student.productivityScore
                    }

                  </p>

                </div>

                <div className="bg-slate-900 p-4 rounded-2xl text-center">

                  <p className="text-sm text-slate-400">

                    Streak

                  </p>

                  <p className="text-xl font-bold text-orange-400">

                    {
                      student.streakScore
                    }

                  </p>

                </div>

                <div className="bg-slate-900 p-4 rounded-2xl text-center">

                  <p className="text-sm text-slate-400">

                    Questions

                  </p>

                  <p className="text-xl font-bold text-green-400">

                    {
                      student.solvedQuestions
                    }

                  </p>

                </div>

                <div className="bg-slate-900 p-4 rounded-2xl text-center">

                  <p className="text-sm text-slate-400">

                    Total Score

                  </p>

                  <p className="text-xl font-bold text-yellow-400">

                    {
                      student.totalScore
                    }

                  </p>

                </div>

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}