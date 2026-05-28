import {

  useEffect,
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

  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  where,
  updateDoc,

} from "firebase/firestore";

import toast from "react-hot-toast";

export default function Habits() {

  const [
    habits,
    setHabits
  ] = useState([]);

  const [
    loading,
    setLoading
  ] = useState(true);

  const [
    newHabit,
    setNewHabit
  ] = useState("");

  /* LOAD HABITS */

  useEffect(() => {

    loadHabits();

  }, []);

  const loadHabits =
    async () => {

      try {

        const user =
          auth.currentUser;

        if (!user)
          return;

        const q = query(

          collection(
            db,
            "habits"
          ),

          where(
            "uid",
            "==",
            user.uid
          )
        );

        const snapshot =
          await getDocs(q);

        const data =
          snapshot.docs.map(
            (doc) => ({

              id:
                doc.id,

              ...doc.data(),
            })
          );

        setHabits(data);

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to load habits"
        );

      } finally {

        setLoading(false);
      }
    };

  /* ADD HABIT */

  const addHabit =
    async () => {

      if (
        !newHabit.trim()
      )
        return;

      try {

        const user =
          auth.currentUser;

        const docRef =
          await addDoc(

            collection(
              db,
              "habits"
            ),

            {
              uid:
                user.uid,

              title:
                newHabit,

              completed:
                false,

              streak:
                0,

              createdAt:
                serverTimestamp(),
            }
          );

        setHabits([

          ...habits,

          {
            id:
              docRef.id,

            title:
              newHabit,

            completed:
              false,

            streak:
              0,
          },
        ]);

        setNewHabit("");

        toast.success(
          "Habit added"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to add habit"
        );
      }
    };

  /* TOGGLE */

  const toggleHabit =
    async (habit) => {

      try {

        const ref =
          doc(
            db,
            "habits",
            habit.id
          );

        await updateDoc(
          ref,

          {
            completed:
              !habit.completed,

            streak:
              !habit.completed

                ? habit.streak +
                  1

                : Math.max(
                    habit.streak -
                      1,
                    0
                  ),
          }
        );

        setHabits(

          habits.map(
            (h) =>

              h.id ===
              habit.id

                ? {

                    ...h,

                    completed:
                      !h.completed,

                    streak:
                      !h.completed

                        ? h.streak +
                          1

                        : Math.max(
                            h.streak -
                              1,
                            0
                          ),
                  }

                : h
          )
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to update habit"
        );
      }
    };

  /* DELETE */

  const deleteHabit =
    async (id) => {

      try {

        await deleteDoc(

          doc(
            db,
            "habits",
            id
          )
        );

        setHabits(

          habits.filter(
            (h) =>
              h.id !== id
          )
        );

        toast.success(
          "Habit deleted"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Delete failed"
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

        className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 backdrop-blur-xl p-8 md:p-10 shadow-2xl"
      >

        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/20 blur-[120px]" />

        <div className="relative z-10">

          <p className="text-cyan-400 font-semibold tracking-widest uppercase mb-3">

            Habit Tracking Engine

          </p>

          <h1 className="text-5xl md:text-6xl font-black leading-tight max-w-4xl">

            Build
            {" "}

            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              elite habits
            </span>

            {" "}
            daily.
          </h1>

        </div>

      </motion.div>

      {/* ADD */}

      <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl">

        <div className="flex flex-col md:flex-row gap-4">

          <input
            type="text"

            value={newHabit}

            onChange={(e) =>
              setNewHabit(
                e.target.value
              )
            }

            placeholder="Add a new habit..."

            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-cyan-400 transition"
          />

          <button
            onClick={addHabit}

            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-[1.03] transition-all duration-300 px-8 py-4 rounded-2xl font-bold shadow-2xl"
          >

            ➕ Add Habit

          </button>

        </div>

      </div>

      {/* HABITS */}

      {
        loading

          ? (

            <div className="text-center text-slate-400">

              Loading habits...

            </div>
          )

          : (

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {habits.map(
                (
                  habit,
                  index
                ) => (

                  <motion.div

                    key={
                      habit.id
                    }

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
                        index *
                        0.05,
                    }}

                    whileHover={{
                      y: -5,
                    }}

                    className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-7 shadow-2xl"
                  >

                    <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 blur-3xl" />

                    <div className="relative z-10">

                      <div className="flex items-start justify-between gap-5">

                        <div>

                          <h2 className="text-3xl font-black">

                            {
                              habit.title
                            }

                          </h2>

                          <p className="text-slate-400 mt-3">

                            Daily productivity habit

                          </p>

                        </div>

                        <div className="text-5xl">

                          {
                            habit.completed

                              ? "✅"

                              : "⚡"
                          }

                        </div>

                      </div>

                      {/* STREAK */}

                      <div className="mt-8">

                        <div className="flex items-center justify-between mb-3">

                          <span className="text-slate-400">

                            Streak

                          </span>

                          <span className="font-bold text-2xl">

                            🔥
                            {" "}
                            {
                              habit.streak
                            }

                          </span>

                        </div>

                        <div className="h-4 bg-white/5 rounded-full overflow-hidden">

                          <motion.div

                            initial={{
                              width: 0,
                            }}

                            animate={{
                              width:
                                `${
                                  Math.min(
                                    habit.streak *
                                      10,
                                    100
                                  )
                                }%`,
                            }}

                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                          />

                        </div>

                      </div>

                      {/* ACTIONS */}

                      <div className="flex gap-4 mt-8">

                        <button
                          onClick={() =>
                            toggleHabit(
                              habit
                            )
                          }

                          className={`flex-1 py-4 rounded-2xl font-bold transition-all duration-300

                          ${
                            habit.completed

                              ? "bg-green-500/20 text-green-400 border border-green-500/20"

                              : "bg-gradient-to-r from-cyan-500 to-blue-500"
                          }`}
                        >

                          {
                            habit.completed

                              ? "Completed"

                              : "Mark Complete"
                          }

                        </button>

                        <button
                          onClick={() =>
                            deleteHabit(
                              habit.id
                            )
                          }

                          className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition px-6 rounded-2xl text-red-400"
                        >

                          🗑
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
  );
}