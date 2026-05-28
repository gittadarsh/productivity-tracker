import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";

import { auth, db } from "../firebase";

import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export default function MentorDashboard() {

  const [students, setStudents] = useState([]);

  const [mentorId, setMentorId] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {

    try {

      const mentor = auth.currentUser;

      if (!mentor) return;

      /* GET MENTOR */

      const mentorQuery = query(
        collection(db, "users"),
        where("uid", "==", mentor.uid)
      );

      const mentorSnap = await getDocs(mentorQuery);

      const mentorData =
        mentorSnap.docs[0]?.data();

      if (!mentorData) return;

      setMentorId(mentorData.mentorId);

      /* GET STUDENTS */

      const studentQuery = query(
        collection(db, "users"),
        where(
          "mentorId",
          "==",
          mentorData.mentorId
        )
      );

      const studentSnap =
        await getDocs(studentQuery);

      const studentData =
        studentSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      setStudents(studentData);

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

        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/20 blur-[120px]" />

        <div className="relative z-10">

          <p className="text-purple-400 uppercase tracking-[6px] text-sm font-semibold">

            Mentor Control Center

          </p>

          <h1 className="text-5xl md:text-6xl font-black mt-5 leading-tight">

            Monitor
            {" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">

              student productivity

            </span>

          </h1>

          <p className="text-slate-400 text-lg mt-6 max-w-3xl leading-relaxed">

            Live analytics,
            habits,
            focus sessions,
            streaks,
            and productivity monitoring.

          </p>

        </div>

      </motion.div>

      {/* MENTOR ID */}

      <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div>

            <p className="text-slate-400 uppercase tracking-widest mb-3">

              Your Mentor ID

            </p>

            <h2 className="text-5xl font-black text-cyan-400">

              {mentorId}

            </h2>

          </div>

          <button
            onClick={() => {

              navigator.clipboard.writeText(
                mentorId
              );

            }}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-[1.03] transition-all duration-300 px-8 py-5 rounded-2xl font-bold shadow-2xl"
          >

            📋 Copy ID

          </button>

        </div>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

        <div className="rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl p-6">

          <p className="text-slate-400">

            Total Students

          </p>

          <h2 className="text-5xl font-black mt-4">

            {
              loading
                ? "--"
                : students.length
            }

          </h2>

        </div>

        <div className="rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl p-6">

          <p className="text-slate-400">

            Tracking Status

          </p>

          <h2 className="text-5xl font-black mt-4">

            Live

          </h2>

        </div>

        <div className="rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl p-6">

          <p className="text-slate-400">

            Workspace

          </p>

          <h2 className="text-5xl font-black mt-4">

            Elite

          </h2>

        </div>

      </div>

      {/* STUDENTS */}

      <div className="rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

        <div className="flex items-center justify-between mb-10">

          <div>

            <h2 className="text-4xl font-black">

              🎓 Assigned Students

            </h2>

            <p className="text-slate-400 mt-2">

              Click a student to open full analytics

            </p>

          </div>

        </div>

        {
          students.length === 0 ? (

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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {students.map((student, index) => (

                <Link
                  key={student.id}
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
                      delay: index * 0.08,
                    }}
                    whileHover={{
                      y: -6,
                    }}
                    className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-7 shadow-2xl cursor-pointer"
                  >

                    <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 blur-3xl" />

                    <div className="relative z-10">

                      <div className="flex items-start justify-between gap-5">

                        <div className="flex items-center gap-5">

                          <img
                            src={
                              student.photo ||

                              `https://ui-avatars.com/api/?name=${student.name}`
                            }
                            alt="student"
                            className="w-16 h-16 rounded-2xl object-cover border border-white/10"
                          />

                          <div>

                            <h2 className="text-2xl font-black">

                              {student.name}

                            </h2>

                            <p className="text-slate-400 mt-1">

                              {student.email}

                            </p>

                          </div>

                        </div>

                        <div className="text-4xl">

                          🚀

                        </div>

                      </div>

                      {/* METRICS */}

                      <div className="grid grid-cols-2 gap-4 mt-8">

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">

                          <p className="text-slate-400 text-sm">

                            XP

                          </p>

                          <h3 className="text-3xl font-black mt-2">

                            {student.xp || 0}

                          </h3>

                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">

                          <p className="text-slate-400 text-sm">

                            Sessions

                          </p>

                          <h3 className="text-3xl font-black mt-2">

                            {student.totalSessions || 0}

                          </h3>

                        </div>

                      </div>

                    </div>

                  </motion.div>

                </Link>

              ))}

            </div>

          )
        }

      </div>

    </div>
  );
}