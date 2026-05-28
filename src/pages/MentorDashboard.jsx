import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  Link,
} from "react-router-dom";

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

export default function MentorDashboard() {

  const [students, setStudents] =
    useState([]);

  const [mentorId, setMentorId] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadStudents();

  }, []);

  const loadStudents =
    async () => {

      try {

        const mentor =
          auth.currentUser;

        if (!mentor)
          return;

        /* GET MENTOR */

        const mentorQuery =
          query(
            collection(
              db,
              "users"
            ),
            where(
              "uid",
              "==",
              mentor.uid
            )
          );

        const mentorSnap =
          await getDocs(
            mentorQuery
          );

        const mentorData =
          mentorSnap.docs[0]?.data();

        if (!mentorData)
          return;

        setMentorId(
          mentorData.mentorId
        );

        /* GET STUDENTS */

        const studentQuery =
          query(
            collection(
              db,
              "users"
            ),
            where(
              "mentorId",
              "==",
              mentorData.mentorId
            )
          );

        const studentSnap =
          await getDocs(
            studentQuery
          );

        const studentData =
          await Promise.all(

            studentSnap.docs.map(
              async (docSnap) => {

                const student = {
                  id: docSnap.id,
                  ...docSnap.data(),
                };

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
                      student.uid
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

                const completedGoals =
                  goals.filter(
                    (g) =>
                      g.completed
                  ).length;

                const completionRate =

                  goals.length === 0

                    ? 0

                    : Math.round(
                        (
                          completedGoals /
                          goals.length
                        ) * 100
                      );

                /* PRODUCTIVITY SCORE */

                const productivityScore =

                  (
                    student.xp ||
                    0
                  ) +

                  (
                    student.totalSessions ||
                    0
                  ) *
                    10 +

                  completedGoals *
                    25;

                return {

                  ...student,

                  completedGoals,

                  totalGoals:
                    goals.length,

                  completionRate,

                  productivityScore,
                };
              }
            )
          );

        /* SORT */

        studentData.sort(
          (a, b) =>

            b.productivityScore -

            a.productivityScore
        );

        setStudents(
          studentData
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

  const totalStudents =
    students.length;

  const topPerformer =
    students[0];

  const weakestPerformer =
    students[
      students.length - 1
    ];

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
        className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-purple-500/10 to-pink-500/5 backdrop-blur-xl p-8 md:p-10 shadow-2xl"
      >

        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/20 blur-[120px]" />

        <div className="relative z-10">

          <p className="text-purple-400 uppercase tracking-[6px] text-sm font-semibold">

            Mentor Intelligence System

          </p>

          <h1 className="text-5xl md:text-6xl font-black mt-5 leading-tight">

            Monitor
            {" "}

            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">

              productivity performance

            </span>

          </h1>

          <p className="text-slate-400 text-lg mt-6 max-w-3xl leading-relaxed">

            Analyze student rankings,
            goal completion,
            focus consistency,
            and productivity intelligence.

          </p>

        </div>

      </motion.div>

      {/* TOP STATS */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl p-6">

          <p className="text-slate-400">

            Total Students

          </p>

          <h2 className="text-5xl font-black mt-4">

            {totalStudents}

          </h2>

        </div>

        <div className="rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl p-6">

          <p className="text-slate-400">

            Mentor ID

          </p>

          <h2 className="text-3xl font-black mt-4 text-cyan-400">

            {mentorId}

          </h2>

        </div>

        <div className="rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl p-6">

          <p className="text-slate-400">

            Top Performer

          </p>

          <h2 className="text-2xl font-black mt-4">

            {
              topPerformer?.name ||
              "--"
            }

          </h2>

        </div>

        <div className="rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl p-6">

          <p className="text-slate-400">

            Lowest Performer

          </p>

          <h2 className="text-2xl font-black mt-4">

            {
              weakestPerformer?.name ||
              "--"
            }

          </h2>

        </div>

      </div>

      {/* STUDENT RANKINGS */}

      <div className="rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

        <div className="flex items-center justify-between mb-10">

          <div>

            <h2 className="text-4xl font-black">

              🏆 Student Rankings

            </h2>

            <p className="text-slate-400 mt-2">

              Ranked by productivity intelligence score

            </p>

          </div>

        </div>

        {
          loading ? (

            <div className="text-center py-20 text-slate-400">

              Loading analytics...

            </div>

          ) : students.length === 0 ? (

            <div className="text-center py-20">

              <div className="text-8xl mb-6">

                🎓

              </div>

              <h3 className="text-4xl font-black mb-4">

                No Students Yet

              </h3>

              <p className="text-slate-400 text-lg">

                Share your mentor ID to connect students.

              </p>

            </div>

          ) : (

            <div className="space-y-6">

              {students.map(
                (
                  student,
                  index
                ) => (

                  <Link
                    key={
                      student.id
                    }
                    to={`/student/${student.uid}`}
                  >

                    <motion.div
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
                          index * 0.05,
                      }}
                      whileHover={{
                        y: -4,
                      }}
                      className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-7 shadow-2xl cursor-pointer"
                    >

                      <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 blur-3xl" />

                      <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

                        {/* LEFT */}

                        <div className="flex items-center gap-5">

                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-black shadow-2xl">

                            #
                            {index + 1}

                          </div>

                          <img
                            src={
                              student.photo ||

                              `https://ui-avatars.com/api/?name=${student.name}`
                            }
                            alt="student"
                            className="w-16 h-16 rounded-2xl object-cover border border-white/10"
                          />

                          <div>

                            <h2 className="text-3xl font-black">

                              {student.name}

                            </h2>

                            <p className="text-slate-400 mt-2">

                              {student.email}

                            </p>

                          </div>

                        </div>

                        {/* METRICS */}

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

                          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 min-w-[130px]">

                            <p className="text-slate-400 text-sm">

                              XP

                            </p>

                            <h3 className="text-3xl font-black mt-2">

                              {
                                student.xp ||
                                0
                              }

                            </h3>

                          </div>

                          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 min-w-[130px]">

                            <p className="text-slate-400 text-sm">

                              Sessions

                            </p>

                            <h3 className="text-3xl font-black mt-2">

                              {
                                student.totalSessions ||
                                0
                              }

                            </h3>

                          </div>

                          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 min-w-[130px]">

                            <p className="text-slate-400 text-sm">

                              Goals

                            </p>

                            <h3 className="text-3xl font-black mt-2">

                              {
                                student.completedGoals
                              }
                              /
                              {
                                student.totalGoals
                              }

                            </h3>

                          </div>

                          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 min-w-[140px]">

                            <p className="text-slate-400 text-sm">

                              Completion

                            </p>

                            <h3 className="text-3xl font-black mt-2">

                              {
                                student.completionRate
                              }%

                            </h3>

                          </div>

                          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 rounded-2xl p-4 min-w-[170px]">

                            <p className="text-cyan-300 text-sm">

                              Productivity

                            </p>

                            <h3 className="text-4xl font-black mt-2 text-cyan-400">

                              {
                                student.productivityScore
                              }

                            </h3>

                          </div>

                        </div>

                      </div>

                    </motion.div>

                  </Link>
                )
              )}

            </div>

          )
        }

      </div>

    </div>
  );
}