import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { auth, db } from "../firebase";

import {
  collection,
  query,
  updateDoc,
  doc,
  where,
  onSnapshot,
} from "firebase/firestore";

import toast from "react-hot-toast";

export default function AssignedGoals() {

  const [goals, setGoals] = useState([]);

  const [loading, setLoading] = useState(true);

  /* LOAD GOALS */

  useEffect(() => {

    loadGoals();

  }, []);

  const loadGoals = async () => {

    try {

      const user = auth.currentUser;

      if (!user) return;

      const q = query(
        collection(db, "assignedGoals"),
        where(
          "studentUid",
          "==",
          user.uid
        )
      );

      onSnapshot(q, (snapshot) => {

        const data =
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

        setGoals(data);

        setLoading(false);

      });

    } catch (error) {

      console.log(error);

      setLoading(false);

    }
  };

  /* COMPLETE */

  const completeGoal = async (goal) => {

    try {

      const ref = doc(
        db,
        "assignedGoals",
        goal.id
      );

      await updateDoc(ref, {
        completed: true,
      });

      toast.success(
        "Goal completed 🚀"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to update goal"
      );
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
        className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-green-500/10 to-emerald-500/5 backdrop-blur-xl p-8 md:p-10 shadow-2xl"
      >

        <div className="absolute top-0 right-0 w-72 h-72 bg-green-500/20 blur-[120px]" />

        <div className="relative z-10">

          <p className="text-green-400 uppercase tracking-[6px] text-sm font-semibold">

            Assigned Goals

          </p>

          <h1 className="text-5xl md:text-6xl font-black mt-5 leading-tight">

            Execute your
            {" "}

            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">

              assigned tasks

            </span>

          </h1>

          <p className="text-slate-400 text-lg mt-6 max-w-3xl leading-relaxed">

            Complete mentor-assigned productivity goals and track execution consistency.

          </p>

        </div>

      </motion.div>

      {/* GOALS */}

      {
        loading ? (

          <div className="text-center text-slate-400 py-20">

            Loading goals...

          </div>

        ) : goals.length === 0 ? (

          <div className="rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-xl p-20 text-center shadow-2xl">

            <div className="text-8xl mb-6">

              🎯

            </div>

            <h2 className="text-4xl font-black">

              No Goals Assigned

            </h2>

            <p className="text-slate-400 text-lg mt-4">

              Mentor-assigned goals will appear here.

            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {goals.map((goal, index) => (

              <motion.div
                key={goal.id}
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
                  y: -5,
                }}
                className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-7 shadow-2xl"
              >

                <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/10 blur-3xl" />

                <div className="relative z-10">

                  <div className="flex items-start justify-between gap-5">

                    <div>

                      <h2 className="text-3xl font-black">

                        {goal.title}

                      </h2>

                      <p className="text-slate-400 mt-4 leading-relaxed">

                        {goal.description || "No description"}

                      </p>

                    </div>

                    <div className="text-5xl">

                      {
                        goal.completed
                          ? "✅"
                          : "🎯"
                      }

                    </div>

                  </div>

                  <div className="mt-10">

                    <button
                      onClick={() =>
                        completeGoal(goal)
                      }
                      disabled={goal.completed}
                      className={`

                      w-full

                      py-5

                      rounded-2xl

                      font-bold

                      text-lg

                      transition-all duration-300

                      ${
                        goal.completed

                          ? "bg-green-500/20 text-green-400 border border-green-500/20"

                          : "bg-gradient-to-r from-green-500 to-emerald-500 hover:scale-[1.02] shadow-2xl"
                      }`}
                    >

                      {
                        goal.completed

                          ? "Completed"

                          : "🚀 Mark Complete"
                      }

                    </button>

                  </div>

                </div>

              </motion.div>

            ))}

          </div>

        )
      }

    </div>
  );
}