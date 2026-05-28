import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { auth, db } from "../firebase";

import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

import toast from "react-hot-toast";

export default function AssignGoals() {

  const [students, setStudents] = useState([]);

  const [selectedStudent, setSelectedStudent] = useState("");

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  /* LOAD STUDENTS */

  useEffect(() => {

    loadStudents();

  }, []);

  const loadStudents = async () => {

    try {

      const mentor = auth.currentUser;

      if (!mentor) return;

      const mentorQuery = query(
        collection(db, "users"),
        where("uid", "==", mentor.uid)
      );

      const mentorSnap = await getDocs(mentorQuery);

      const mentorData =
        mentorSnap.docs[0]?.data();

      if (!mentorData) return;

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

    }
  };

  /* ASSIGN */

  const assignGoal = async () => {

    if (
      !selectedStudent ||
      !title
    ) {

      return toast.error(
        "Fill all required fields"
      );
    }

    try {

      setLoading(true);

      await addDoc(
        collection(db, "assignedGoals"),
        {
          studentUid:
            selectedStudent,

          mentorUid:
            auth.currentUser.uid,

          title,

          description,

          completed: false,

          createdAt:
            serverTimestamp(),
        }
      );

      toast.success(
        "Goal assigned successfully"
      );

      setTitle("");

      setDescription("");

      setSelectedStudent("");

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to assign goal"
      );

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
        className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 backdrop-blur-xl p-8 md:p-10 shadow-2xl"
      >

        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/20 blur-[120px]" />

        <div className="relative z-10">

          <p className="text-cyan-400 uppercase tracking-[6px] text-sm font-semibold">

            Goal Assignment System

          </p>

          <h1 className="text-5xl md:text-6xl font-black mt-5 leading-tight">

            Assign
            {" "}

            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              productivity goals

            </span>

          </h1>

          <p className="text-slate-400 text-lg mt-6 max-w-3xl leading-relaxed">

            Create structured accountability
            and monitor student execution in real time.

          </p>

        </div>

      </motion.div>

      {/* FORM */}

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
          delay: 0.1,
        }}
        className="rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl"
      >

        <div className="space-y-6">

          {/* STUDENT */}

          <div>

            <label className="block text-slate-300 mb-3 font-semibold">

              Select Student

            </label>

            <select
              value={selectedStudent}
              onChange={(e) =>
                setSelectedStudent(
                  e.target.value
                )
              }
              className="w-full bg-white/5 border border-white/10 focus:border-cyan-400 transition-all duration-300 outline-none px-6 py-5 rounded-2xl"
            >

              <option value="">

                Choose student

              </option>

              {students.map((student) => (

                <option
                  key={student.uid}
                  value={student.uid}
                >

                  {student.name}

                </option>

              ))}

            </select>

          </div>

          {/* TITLE */}

          <div>

            <label className="block text-slate-300 mb-3 font-semibold">

              Goal Title

            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              placeholder="Complete DSA Revision"
              className="w-full bg-white/5 border border-white/10 focus:border-cyan-400 transition-all duration-300 outline-none px-6 py-5 rounded-2xl placeholder:text-slate-500"
            />

          </div>

          {/* DESCRIPTION */}

          <div>

            <label className="block text-slate-300 mb-3 font-semibold">

              Goal Description

            </label>

            <textarea
              rows="5"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              placeholder="Add goal details..."
              className="w-full bg-white/5 border border-white/10 focus:border-cyan-400 transition-all duration-300 outline-none px-6 py-5 rounded-2xl placeholder:text-slate-500 resize-none"
            />

          </div>

          {/* BUTTON */}

          <button
            onClick={assignGoal}
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-[1.01] transition-all duration-300 py-5 rounded-2xl font-bold text-lg shadow-2xl"
          >

            {
              loading
                ? "Assigning..."
                : "🚀 Assign Goal"
            }

          </button>

        </div>

      </motion.div>

    </div>
  );
}