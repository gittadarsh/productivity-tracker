import {

  useState,

} from "react";

import {

  motion,

} from "framer-motion";

import {

  auth,
  db,

} from "../firebase";

import {

  doc,
  setDoc,

} from "firebase/firestore";

import {

  useNavigate,

} from "react-router-dom";

import toast from "react-hot-toast";

export default function Onboarding() {

  const [
    role,
    setRole
  ] = useState("");

  const [
    mentorId,
    setMentorId
  ] = useState("");

  const [
    loading,
    setLoading
  ] = useState(false);

  const navigate =
    useNavigate();

  /* SAVE */

  const handleContinue =
    async () => {

      if (!role)
        return toast.error(
          "Select a role"
        );

      try {

        setLoading(true);

        const user =
          auth.currentUser;

        if (!user)
          return;

        const generatedMentorId =
          role ===
          "mentor"

            ? Math.random()
                .toString(36)
                .substring(
                  2,
                  8
                )
                .toUpperCase()

            : null;

        await setDoc(

          doc(
            db,
            "users",
            user.uid
          ),

          {
            uid:
              user.uid,

            name:
              user.displayName,

            email:
              user.email,

            photo:
              user.photoURL,

            role,

            mentorId:
              role ===
              "student"

                ? mentorId ||
                  null

                : generatedMentorId,

            xp: 0,

            totalSessions: 0,

            createdAt:
              new Date(),
          }
        );

        toast.success(
          "Profile setup complete"
        );

        navigate(

          role ===
          "mentor"

            ? "/mentor"

            : "/dashboard"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to save profile"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="min-h-screen flex items-center justify-center px-4">

      <motion.div

        initial={{
          opacity: 0,
          y: 30,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        className="w-full max-w-3xl rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl p-10 shadow-[0_20px_120px_rgba(0,0,0,0.55)] relative overflow-hidden"
      >

        {/* GLOW */}

        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/20 blur-[120px]" />

        <div className="relative z-10">

          <p className="text-cyan-400 uppercase tracking-[6px] text-sm font-semibold">

            Productivity Platform Setup

          </p>

          <h1 className="text-5xl md:text-6xl font-black mt-5 leading-tight">

            Choose your
            {" "}

            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              workspace role
            </span>

          </h1>

          <p className="text-slate-400 text-lg mt-6 leading-relaxed">

            Join as a student to track productivity,
            or as a mentor to monitor and guide students.

          </p>

          {/* ROLE CARDS */}

          <div className="grid md:grid-cols-2 gap-6 mt-10">

            {/* STUDENT */}

            <motion.button

              whileHover={{
                y: -6,
              }}

              onClick={() =>
                setRole(
                  "student"
                )
              }

              className={`

              rounded-[32px]

              border

              p-8

              text-left

              transition-all duration-300

              ${
                role ===
                "student"

                  ? "border-cyan-400 bg-cyan-500/10"

                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}
            >

              <div className="text-6xl">

                🎓

              </div>

              <h2 className="text-3xl font-black mt-6">

                Student

              </h2>

              <p className="text-slate-400 mt-4 leading-relaxed">

                Track habits, focus sessions,
                goals, streaks, and productivity analytics.

              </p>

            </motion.button>

            {/* MENTOR */}

            <motion.button

              whileHover={{
                y: -6,
              }}

              onClick={() =>
                setRole(
                  "mentor"
                )
              }

              className={`

              rounded-[32px]

              border

              p-8

              text-left

              transition-all duration-300

              ${
                role ===
                "mentor"

                  ? "border-purple-400 bg-purple-500/10"

                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}
            >

              <div className="text-6xl">

                🧠

              </div>

              <h2 className="text-3xl font-black mt-6">

                Mentor

              </h2>

              <p className="text-slate-400 mt-4 leading-relaxed">

                Monitor student performance,
                analytics, focus consistency,
                and productivity growth.

              </p>

            </motion.button>

          </div>

          {/* STUDENT MENTOR ID */}

          {
            role ===
            "student" && (

              <div className="mt-10">

                <label className="block text-slate-300 mb-4 font-semibold">

                  Mentor ID (Optional)

                </label>

                <input
                  type="text"

                  value={mentorId}

                  onChange={(e) =>
                    setMentorId(
                      e.target.value.toUpperCase()
                    )
                  }

                  placeholder="Enter mentor ID"

                  className="w-full bg-white/5 border border-white/10 focus:border-cyan-400 transition-all duration-300 outline-none px-6 py-5 rounded-2xl text-lg placeholder:text-slate-500"
                />

              </div>
            )
          }

          {/* CONTINUE */}

          <button
            onClick={
              handleContinue
            }

            disabled={
              loading
            }

            className="w-full mt-12 bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-[1.01] transition-all duration-300 py-5 rounded-2xl font-bold text-lg shadow-2xl"
          >

            {
              loading

                ? "Setting up..."

                : "Continue"
            }

          </button>

        </div>

      </motion.div>

    </div>
  );
}