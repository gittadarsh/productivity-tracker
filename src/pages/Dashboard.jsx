import { useState, useEffect } from "react";

import AIInsights from "../components/AIInsights";
import Badges from "../components/Badges";
import Heatmap from "../components/Heatmap";

import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import { db } from "../firebase";

export default function Dashboard() {

  const habitsList = [
    "DSA",
    "Development",
    "Fitness",
    "Debating",
    "Reading",
  ];

  const [habits, setHabits] = useState({});

  const today =
    new Date().toISOString().split("T")[0];

  /* LOAD FROM FIREBASE */

  useEffect(() => {

    const loadHabits = async () => {

      try {

        const docRef =
          doc(db, "habits", "userData");

        const docSnap =
          await getDoc(docRef);

        if (docSnap.exists()) {

          setHabits(docSnap.data());

        }

      } catch (error) {

        console.log(error);

      }
    };

    loadHabits();

  }, []);

  /* SAVE TO FIREBASE */

  const saveHabitsToFirebase =
    async (updatedHabits) => {

      try {

        await setDoc(
          doc(db, "habits", "userData"),
          updatedHabits
        );

      } catch (error) {

        console.log(error);

      }
    };

  /* TOGGLE HABIT */

  const toggleHabit = async (habit) => {

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
      updatedHabits
    );
  };

  /* COMPLETED TODAY */

  const completedToday = habitsList.filter(
    (habit) => habits[today]?.[habit]
  ).length;

  /* STREAK CALCULATOR */

  const calculateStreak = (habit) => {

    let streak = 0;

    for (let i = 0; i < 30; i++) {

      const date = new Date();

      date.setDate(date.getDate() - i);

      const formatted =
        date.toISOString().split("T")[0];

      if (habits[formatted]?.[habit]) {

        streak++;

      } else {

        break;
      }
    }

    return streak;
  };

  return (

    <div>

      {/* TOP DASHBOARD CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-slate-800 p-8 rounded-3xl shadow-lg hover:scale-105 transition duration-300">

          <h2 className="text-2xl mb-3 font-semibold">
            Completed Today
          </h2>

          <p className="text-5xl font-bold">
            {completedToday}/{habitsList.length}
          </p>

        </div>

        <div className="bg-slate-800 p-8 rounded-3xl shadow-lg hover:scale-105 transition duration-300">

          <h2 className="text-2xl mb-3 font-semibold">
            Current Date
          </h2>

          <p className="text-4xl font-bold">
            {today}
          </p>

        </div>

        <div className="bg-slate-800 p-8 rounded-3xl shadow-lg hover:scale-105 transition duration-300">

          <h2 className="text-2xl mb-3 font-semibold">
            Total Habits
          </h2>

          <p className="text-5xl font-bold">
            {habitsList.length}
          </p>

        </div>

      </div>

      {/* HABITS TITLE */}

      <h1 className="text-3xl font-bold mb-6">
        Today's Habits
      </h1>

      {/* HABITS GRID */}

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

              className={`p-8 rounded-3xl cursor-pointer transition duration-300 hover:scale-105 shadow-xl

              ${
                completed
                  ? "bg-green-500"
                  : "bg-slate-800 hover:bg-slate-700"
              }`}
            >

              <h2 className="text-3xl font-bold">

                {completed
                  ? "✅"
                  : "⬜"}{" "}

                {habit}

              </h2>

              <p className="mt-5 text-lg">

                {completed
                  ? "Completed Today"
                  : "Click to mark completed"}

              </p>

              <p className="mt-5 text-slate-200 text-lg">

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

      {/* AI INSIGHTS */}

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