import {

  useEffect,
  useState,

} from "react";

import {

  collection,
  onSnapshot,
  query,
  where,
  doc,

} from "firebase/firestore";

import {

  db,
  auth,

} from "../firebase";

import {

  Link,

} from "react-router-dom";

import toast from "react-hot-toast";

export default function MentorDashboard() {

  const [
    students,
    setStudents
  ] = useState([]);

  const [
    loading,
    setLoading
  ] = useState(true);

  /* OPTIMIZED REALTIME SYSTEM */

  useEffect(() => {

    if (!auth.currentUser) {

      return;
    }

    const mentorUID =
      auth.currentUser.uid;

    const q = query(

      collection(
        db,
        "users"
      ),

      where(
        "mentorId",
        "==",
        mentorUID
      )
    );

    const unsubscribe =
      onSnapshot(

        q,

        async (
          querySnapshot
        ) => {

          try {

            const studentsData =
              await Promise.all(

                querySnapshot.docs.map(
                  async (
                    userDoc
                  ) => {

                    const data =
                      userDoc.data();

                    if (
                      data.role !==
                      "student"
                    ) {

                      return null;
                    }

                    /* FETCH HABITS */

                    const habitsRef =
                      doc(
                        db,
                        "habits",
                        data.uid
                      );

                    return new Promise(
                      (
                        resolve
                      ) => {

                        const unsub =
                          onSnapshot(

                            habitsRef,

                            (
                              habitsSnap
                            ) => {

                              const habitsData =
                                habitsSnap.exists()

                                  ? habitsSnap.data()

                                  : {};

                              const habits =
                                habitsData.habits || {};

                              const today =
                                new Date()
                                  .toISOString()
                                  .split("T")[0];

                              let completedToday = 0;

                              if (
                                habits[
                                  today
                                ]
                              ) {

                                completedToday =
                                  Object.values(
                                    habits[
                                      today
                                    ]
                                  ).filter(Boolean)
                                    .length;
                              }

                              resolve({

                                ...data,

                                completedToday,

                                totalHabits:
                                  habitsData
                                    .habitsList
                                    ?.length || 0,
                              });

                              unsub();
                            }
                          );
                      }
                    );
                  }
                )
              );

            const filteredStudents =
              studentsData.filter(
                Boolean
              );

            filteredStudents.sort(
              (a, b) =>

                b.completedToday -
                a.completedToday
            );

            setStudents(
              filteredStudents
            );

            setLoading(false);

          } catch (error) {

            console.log(error);

            toast.error(
              "Realtime sync failed"
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

        <div className="bg-slate-800 rounded-3xl p-8 h-[200px]"></div>

        <div className="bg-slate-800 rounded-3xl p-8 h-[200px]"></div>

      </div>
    );
  }

  return (

    <div>

      {/* HEADER */}

      <div className="flex items-center justify-between mb-10 flex-wrap gap-4">

        <div>

          <h1 className="text-5xl font-bold">

            👨‍🏫 Mentor Dashboard

          </h1>

          <p className="text-slate-400 mt-3 text-lg">

            Live student productivity tracking

          </p>

        </div>

        <div className="bg-cyan-500 text-black px-6 py-3 rounded-2xl font-bold text-xl shadow-lg">

          {students.length}
          {" "}
          Students

        </div>

      </div>

      {/* EMPTY STATE */}

      {
        students.length === 0 ? (

          <div className="bg-slate-800 p-10 rounded-3xl border border-slate-700 shadow-2xl">

            <h2 className="text-3xl font-bold mb-4">

              No Students Assigned

            </h2>

            <p className="text-slate-400 text-lg">

              Students connected to you will appear here in real-time.

            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {
              students.map(
                (
                  student,
                  index
                ) => (

                  <div
                    key={index}

                    className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-7 rounded-3xl shadow-2xl hover:scale-[1.02] transition duration-300"
                  >

                    {/* PROFILE */}

                    <div className="flex items-center gap-5 mb-6">

                      <img
                        src={
                          student.photo ||

                          `https://ui-avatars.com/api/?name=${student.name}&background=06b6d4&color=fff`
                        }

                        alt="profile"

                        className="w-20 h-20 rounded-full border-2 border-cyan-400 object-cover"
                      />

                      <div>

                        <h2 className="text-2xl font-bold">

                          {student.name}

                        </h2>

                        <p className="text-slate-400">

                          {student.email}

                        </p>

                      </div>

                    </div>

                    {/* PRODUCTIVITY */}

                    <div className="space-y-4 mb-6">

                      <div className="bg-slate-900 p-4 rounded-2xl">

                        <p className="text-slate-400 mb-2">

                          Today's Progress

                        </p>

                        <h3 className="text-3xl font-bold text-green-400">

                          {
                            student.completedToday
                          }

                          /

                          {
                            student.totalHabits
                          }

                        </h3>

                      </div>

                      <div className="bg-slate-900 p-4 rounded-2xl">

                        <p className="text-slate-400 mb-2">

                          Activity Status

                        </p>

                        <h3 className={`text-xl font-bold

                        ${
                          student.completedToday > 0

                            ? "text-cyan-400"

                            : "text-red-400"
                        }`}
                        >

                          {
                            student.completedToday > 0

                              ? "🟢 Active"

                              : "🔴 Inactive"
                          }

                        </h3>

                      </div>

                    </div>

                    {/* BUTTON */}

                    <Link
                      to={`/student/${student.uid}`}

                      className="block text-center bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-4 rounded-2xl font-bold hover:scale-105 transition duration-300"
                    >

                      View Full Progress

                    </Link>

                  </div>
                )
              )
            }

          </div>
        )
      }

    </div>
  );
}