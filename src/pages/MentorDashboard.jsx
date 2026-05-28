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
          studentSnap.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

        studentData.sort(
          (a, b) =>

            (
              b.xp || 0
            ) -

            (
              a.xp || 0
            )
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

  const topPerformer =
    students[0];

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

              student productivity

            </span>

          </h1>

          <p className="text-slate-400 text-lg mt-6 max-w-3xl leading-relaxed">

            Track performance, productivity, consistency, and accountability intelligence.

          </p>

        </div>

      </motion.div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <motion.div
          whileHover={{
            y: -5,
          }}
          className="rounded-[32px] border border-white/10 hover:border-cyan-500/20 bg-white/5 backdrop-blur-xl p-7 shadow-2xl transition-all duration-300 hover:scale-[1.015]"
        >

          <p className="text-slate-400">

            Total Students

          </p>

          <h2 className="text-5xl font-black mt-4">

            {students.length}

          </h2>

        </motion.div>

        <motion.div
          whileHover={{
            y: -5,
          }}
          className="rounded-[32px] border border-white/10 hover:border-cyan-500/20 bg-white/5 backdrop-blur-xl p-7 shadow-2xl transition-all duration-300 hover:scale-[1.015]"
        >

          <p className="text-slate-400">

            Mentor ID

          </p>

          <h2 className="text-3xl font-black mt-4 text-cyan-400">

            {mentorId}

          </h2>

        </motion.div>

        <motion.div
          whileHover={{
            y: -5,
          }}
          className="rounded-[32px] border border-white/10 hover:border-cyan-500/20 bg-white/5 backdrop-blur-xl p-7 shadow-2xl transition-all duration-300 hover:scale-[1.015]"
        >

          <p className="text-slate-400">

            Top Performer

          </p>

          <h2 className="text-3xl font-black mt-4">

            {
              topPerformer?.name ||
              "--"
            }

          </h2>

        </motion.div>

      </div>

      {/* STUDENTS */}

      <div className="rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

        <div className="flex items-center justify-between mb-10">

          <div>

            <h2 className="text-4xl font-black">

              🏆 Student Rankings

            </h2>

            <p className="text-slate-400 mt-2">

              Ranked by XP and productivity

            </p>

          </div>

        </div>

        {
          loading ? (

            <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-xl p-20 text-center shadow-2xl">

              <div className="absolute top-0 right-0 w-60 h-60 bg-cyan-500/10 blur-[100px]" />

              <div className="relative z-10">

                <div className="text-8xl mb-6">

                  📊

                </div>

                <h2 className="text-4xl font-black">

                  Loading Students...

                </h2>

                <p className="text-slate-400 text-lg mt-4">

                  Fetching productivity intelligence.

                </p>

              </div>

            </div>

          ) : students.length === 0 ? (

            <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-xl p-20 text-center shadow-2xl">

              <div className="absolute top-0 right-0 w-60 h-60 bg-cyan-500/10 blur-[100px]" />

              <div className="relative z-10">

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

            </div>

          ) : (

            <div className="space-y-5">

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
                        y: -5,
                      }}
                      className="relative overflow-hidden rounded-[32px] border border-white/10 hover:border-cyan-500/20 bg-white/5 backdrop-blur-xl p-7 shadow-2xl cursor-pointer transition-all duration-300 hover:scale-[1.015]"
                    >

                      <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 blur-3xl" />

                      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

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

                        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 rounded-2xl px-8 py-5">

                          <p className="text-cyan-300 text-sm">

                            Total XP

                          </p>

                          <h3 className="text-5xl font-black text-cyan-400 mt-2">

                            {
                              student.xp ||
                              0
                            }

                          </h3>

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