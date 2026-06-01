import {
  useEffect,
  useState,
} from "react";

import { motion } from "framer-motion";

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

        const mentorQuery =
          query(
            collection(db, "users"),
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

        const studentQuery =
          query(
            collection(db, "users"),
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
          studentSnap.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
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

        <div className="relative z-10">

          <p className="text-purple-400 uppercase tracking-[6px] text-sm font-semibold">

            Mentorship System

          </p>

          <h1 className="text-5xl md:text-6xl font-black mt-5 leading-tight">

            Guide students
            {" "}

            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">

              with accountability

            </span>

          </h1>

          <p className="text-slate-400 text-lg mt-6 max-w-3xl leading-relaxed">

            Monitor consistency, review goals, and help students stay disciplined.

          </p>

        </div>

      </motion.div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-7">

          <p className="text-slate-400">

            Connected Students

          </p>

          <h2 className="text-5xl font-black mt-4">

            {students.length}

          </h2>

        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-7">

          <p className="text-slate-400">

            Mentor ID

          </p>

          <h2 className="text-3xl font-black mt-4 text-cyan-400">

            {mentorId}

          </h2>

        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-7">

          <p className="text-slate-400">

            Active This Week

          </p>

          <h2 className="text-5xl font-black mt-4 text-green-400">

            {
              students.filter(
                (student) =>
                  student.streak > 0
              ).length
            }

          </h2>

        </div>

      </div>

      {/* STUDENTS */}

      <div className="rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

        <div className="mb-10">

          <h2 className="text-4xl font-black">

            🎯 Student Accountability

          </h2>

          <p className="text-slate-400 mt-2">

            Review streaks, consistency, and progress.

          </p>

        </div>

        {
          loading ? (

            <div className="text-center py-20">

              <h2 className="text-4xl font-black">

                Loading Students...

              </h2>

            </div>

          ) : students.length === 0 ? (

            <div className="text-center py-20">

              <h2 className="text-4xl font-black">

                No Students Connected

              </h2>

              <p className="text-slate-400 mt-4">

                Share your mentor ID with students.

              </p>

            </div>

          ) : (

            <div className="space-y-5">

              {students.map(
                (
                  student,
                  index
                ) => (

                  <motion.div
                    key={student.id}
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
                    className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-7"
                  >

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                      <div>

                        <h2 className="text-3xl font-black">

                          {student.name}

                        </h2>

                        <p className="text-slate-400 mt-2">

                          {student.email}

                        </p>

                      </div>

                      <div className="flex gap-4">

                        <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl px-6 py-4">

                          <p className="text-orange-300 text-sm">

                            Streak

                          </p>

                          <h3 className="text-3xl font-black text-orange-400">

                            🔥 {
                              student.streak || 0
                            }

                          </h3>

                        </div>

                        <button className="bg-cyan-500 hover:bg-cyan-600 transition px-6 py-4 rounded-2xl font-semibold">

                          View Goals

                        </button>

                      </div>

                    </div>

                  </motion.div>
                )
              )}

            </div>

          )
        }

      </div>

    </div>
  );
}