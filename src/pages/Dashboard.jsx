import { useState, useEffect } from "react";

import AIInsights from "../components/AIInsights";
import Badges from "../components/Badges";
import Heatmap from "../components/Heatmap";

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { db, auth } from "../firebase";

export default function Dashboard() {

  const [habitsList, setHabitsList] =
    useState([]);

  const [newHabit, setNewHabit] =
    useState("");

  const [
    mentorIdInput,
    setMentorIdInput
  ] = useState("");

  const [habits, setHabits] =
    useState({});

  const today =
    new Date().toISOString().split("T")[0];

  useEffect(() => {

    const loadHabits = async () => {

      try {

        if (!auth.currentUser) {
          return;
        }

        const docRef =
          doc(
            db,
            "habits",
            auth.currentUser.uid
          );

        const docSnap =
          await getDoc(docRef);

        if (docSnap.exists()) {

          const data =
            docSnap.data();

          setHabits(
            data.habits || {}
          );

          setHabitsList(
            data.habitsList || []
          );

        } else {

          const defaultHabits = [
            "DSA",
            "Development",
            "Fitness",
            "Debating",
            "Reading",
          ];

          setHabitsList(
            defaultHabits
          );

          await setDoc(
            doc(
              db,
              "habits",
              auth.currentUser.uid
            ),
            {
              habits: {},
              habitsList:
                defaultHabits,
            }
          );
        }

      } catch (error) {

        console.log(error);

      }
    };

    loadHabits();

  }, []);

  const saveHabitsToFirebase =
    async (
      updatedHabits,
      updatedHabitsList
    ) => {

      try {

        if (!auth.currentUser) {
          return;
        }

        await setDoc(
          doc(
            db,
            "habits",
            auth.currentUser.uid
          ),
          {
            habits:
              updatedHabits,

            habitsList:
              updatedHabitsList,
          }
        );

      } catch (error) {

        console.log(error);

      }
    };

  const connectToMentor =
    async () => {

      try {

        await updateDoc(

          doc(
            db,
            "users",
            auth.currentUser.uid
          ),

          {
            mentorId:
              mentorIdInput,
          }
        );

        alert(
          "Connected to mentor successfully!"
        );

        setMentorIdInput("");

      } catch (error) {

        console.log(error);

      }
    };

  const addHabit = () => {

    if (
      newHabit.trim() === "" ||
      habitsList.includes(newHabit)
    ) {
      return;
    }

    const updatedHabitsList = [
      ...habitsList,
      newHabit,
    ];

    setHabitsList(
      updatedHabitsList
    );

    saveHabitsToFirebase(
      habits,
      updatedHabitsList
    );

    setNewHabit("");
  };

  const deleteHabit = async (
    habitToDelete
  ) => {

    const updatedHabitsList =
      habitsList.filter(
        (habit) =>
          habit !==
          habitToDelete
      );

    setHabitsList(
      updatedHabitsList
    );

    await saveHabitsToFirebase(
      habits,
      updatedHabitsList
    );
  };

  const editHabit = async (
    oldHabit
  ) => {

    const newHabitName =
      prompt(
        "Enter new habit name:",
        oldHabit
      );

    if (
      !newHabitName ||
      habitsList.includes(
        newHabitName
      )
    ) {
      return;
    }

    const updatedHabitsList =
      habitsList.map((habit) =>

        habit === oldHabit
          ? newHabitName
          : habit
      );

    const updatedHabits = {
      ...habits,
    };

    Object.keys(updatedHabits)
      .forEach((date) => {

        if (
          updatedHabits[date][
            oldHabit
          ] !== undefined
        ) {

          updatedHabits[date][
            newHabitName
          ] =
            updatedHabits[date][
              oldHabit
            ];

          delete updatedHabits[
            date
          ][oldHabit];
        }
      });

    setHabitsList(
      updatedHabitsList
    );

    setHabits(updatedHabits);

    await saveHabitsToFirebase(
      updatedHabits,
      updatedHabitsList
    );
  };

  const toggleHabit = async (
    habit
  ) => {

    const updatedHabits = {

      ...habits,

      [today]: {

        ...habits[today],

        [habit]:
          !habits[today]?.[habit],
      },
    };

    setHabits(updatedHabits);

    await saveHabitsToFirebase(
      updatedHabits,
      habitsList
    );
  };

  const completedToday =
    habitsList.filter(
      (habit) =>
        habits[today]?.[habit]
    ).length;

  const calculateStreak = (
    habit
  ) => {

    let streak = 0;

    for (let i = 0; i < 30; i++) {

      const date = new Date();

      date.setDate(
        date.getDate() - i
      );

      const formatted =
        date
          .toISOString()
          .split("T")[0];

      if (
        habits[formatted]?.[habit]
      ) {

        streak++;

      } else {

        break;
      }
    }

    return streak;
  };

  return (

    <div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl">

          <h2 className="text-2xl mb-3 font-semibold">
            Completed Today
          </h2>

          <p className="text-5xl font-bold text-cyan-400">
            {completedToday}/{habitsList.length}
          </p>

        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl">

          <h2 className="text-2xl mb-3 font-semibold">
            Current Date
          </h2>

          <p className="text-4xl font-bold text-blue-400">
            {today}
          </p>

        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl">

          <h2 className="text-2xl mb-3 font-semibold">
            Total Habits
          </h2>

          <p className="text-5xl font-bold text-green-400">
            {habitsList.length}
          </p>

        </div>

      </div>

      <div className="bg-slate-900 border border-slate-700 p-5 rounded-3xl mb-8 shadow-2xl">

        <h2 className="text-2xl font-bold mb-4">
          👨‍🏫 Connect Mentor
        </h2>

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Enter mentor UID"

            value={mentorIdInput}

            onChange={(e) =>
              setMentorIdInput(
                e.target.value
              )
            }

            className="bg-slate-800 p-4 rounded-xl w-full outline-none"
          />

          <button
            onClick={connectToMentor}

            className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 rounded-xl font-bold"
          >
            Connect
          </button>

        </div>

      </div>

      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

        Today's Habits

      </h1>

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-5 rounded-3xl flex gap-4 mb-10 shadow-2xl">

        <input
          type="text"
          placeholder="Add new habit..."

          value={newHabit}

          onChange={(e) =>
            setNewHabit(
              e.target.value
            )
          }

          className="bg-slate-900 border border-slate-700 p-4 rounded-2xl w-full outline-none text-white"
        />

        <button
          onClick={addHabit}

          className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 rounded-2xl font-bold"
        >
          Add
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {habitsList.map((habit) => {

          const completed =
            habits[today]?.[habit];

          return (

            <div
              key={habit}

              onClick={() =>
                toggleHabit(habit)
              }

              className={`p-8 rounded-3xl cursor-pointer transition duration-300 hover:scale-105 shadow-2xl border

              ${
                completed
                  ? "bg-gradient-to-br from-green-500 to-emerald-700 border-green-400"
                  : "bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700"
              }`}
            >

              <div className="flex items-center justify-between gap-2">

                <h2 className="text-2xl font-bold">

                  {completed
                    ? "✅"
                    : "⬜"}{" "}

                  {habit}

                </h2>

                <div className="flex">

                  <button
                    onClick={(e) => {

                      e.stopPropagation();

                      editHabit(habit);
                    }}

                    className="bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1 rounded-lg text-sm mr-2"
                  >
                    ✏️
                  </button>

                  <button
                    onClick={(e) => {

                      e.stopPropagation();

                      deleteHabit(habit);
                    }}

                    className="bg-gradient-to-r from-red-500 to-pink-500 px-3 py-1 rounded-lg text-sm"
                  >
                    ❌
                  </button>

                </div>

              </div>

              <p className="mt-5 text-lg text-slate-200">

                {completed
                  ? "Completed Today 🎉"
                  : "Click to mark completed"}

              </p>

              <p className="mt-5 text-slate-300 text-lg">

                🔥 Streak:
                {" "}
                {calculateStreak(habit)}
                {" "}
                days

              </p>

            </div>
          );
        })}

      </div>

      <AIInsights
        completed={completedToday}
        total={habitsList.length}
      />

      <Badges
        completed={completedToday}
      />

      <Heatmap habits={habits} />

    </div>
  );
}