import {

  useState,

} from "react";

import {

  doc,
  setDoc,

} from "firebase/firestore";

import {

  auth,
  db,

} from "../firebase";

import {

  useNavigate,

} from "react-router-dom";

import toast from "react-hot-toast";

import {

  motion,

} from "framer-motion";

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

  /* CONTINUE */

  const handleContinue =
    async () => {

      if (!role) {

        toast.error(
          "Please select a role"
        );

        return;
      }

      try {

        setLoading(true);

        const user =
          auth.currentUser;

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
              user.photoURL || "",

            role,

            mentorId:
              mentorId || null,

            createdAt:
              new Date(),
          },

          {
            merge: true,
          }
        );

        toast.success(
          "Profile setup complete 🚀"
        );

        /* REDIRECT */

        if (
          role === "mentor"
        ) {

          navigate(
            "/mentor"
          );

        } else {

          navigate(
            "/dashboard"
          );
        }

      } catch (error) {

        console.log(error);

        toast.error(
          "Onboarding failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 overflow-hidden">

      {/* BACKGROUND BLUR */}

      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full top-[-100px] left-[-100px]" />

      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      <motion.div

        initial={{

          opacity: 0,

          scale: 0.95,
        }}

        animate={{

          opacity: 1,

          scale: 1,
        }}

        transition={{

          duration: 0.5,
        }}

        className="relative z-10 w-full max-w-2xl"
      >

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-[40px] p-10 md:p-14">

          {/* HEADER */}

          <div className="text-center mb-12">

            <h1 className="text-5xl md:text-6xl font-black leading-tight">

              Welcome 🚀

            </h1>

            <p className="text-slate-400 text-xl mt-5 leading-relaxed">

              Let’s personalize your
              productivity experience.

            </p>

          </div>

          {/* ROLE */}

          <div className="mb-10">

            <h2 className="text-2xl font-bold mb-6">

              Select Your Role

            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <button
                onClick={() =>
                  setRole(
                    "student"
                  )
                }

                className={`p-8 rounded-3xl border transition-all duration-300 text-left

                ${
                  role ===
                  "student"

                    ? "border-cyan-400 bg-cyan-500/10 scale-[1.02]"

                    : "border-slate-700 hover:border-cyan-500"
                }`}
              >

                <h3 className="text-3xl font-bold mb-3">

                  🎓 Student

                </h3>

                <p className="text-slate-400 text-lg">

                  Track habits,
                  improve productivity,
                  and collaborate
                  with mentors.

                </p>

              </button>

              <button
                onClick={() =>
                  setRole(
                    "mentor"
                  )
                }

                className={`p-8 rounded-3xl border transition-all duration-300 text-left

                ${
                  role ===
                  "mentor"

                    ? "border-cyan-400 bg-cyan-500/10 scale-[1.02]"

                    : "border-slate-700 hover:border-cyan-500"
                }`}
              >

                <h3 className="text-3xl font-bold mb-3">

                  👨‍🏫 Mentor

                </h3>

                <p className="text-slate-400 text-lg">

                  Guide students,
                  monitor productivity,
                  and manage progress.

                </p>

              </button>

            </div>

          </div>

          {/* OPTIONAL MENTOR ID */}

          {
            role ===
            "student" && (

              <div className="mb-10">

                <label className="block text-2xl font-bold mb-4">

                  Mentor ID
                  {" "}
                  <span className="text-slate-400 text-lg">

                    (Optional)
                  </span>

                </label>

                <input
                  type="text"

                  value={mentorId}

                  onChange={(e) =>
                    setMentorId(
                      e.target.value
                    )
                  }

                  placeholder="Enter mentor ID"

                  className="w-full bg-slate-900/80 border border-slate-700 focus:border-cyan-400 outline-none transition p-5 rounded-2xl text-lg"
                />

                <p className="text-slate-500 mt-3">

                  You can also add or
                  change mentor later.

                </p>

              </div>
            )
          }

          {/* BUTTON */}

          <button
            onClick={
              handleContinue
            }

            disabled={loading}

            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-[1.01] transition-all duration-300 py-5 rounded-2xl text-black font-black text-xl shadow-2xl disabled:opacity-50"
          >

            {
              loading

                ? "Setting up..."

                : "Continue 🚀"
            }

          </button>

        </div>

      </motion.div>

    </div>
  );
}