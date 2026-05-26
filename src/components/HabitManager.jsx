import { useState } from "react";

export default function HabitManager({

  habitsList,
  setHabitsList,

}) {

  const [newHabit, setNewHabit] =
    useState("");

  /* ADD HABIT */

  const addHabit = () => {

    if (
      newHabit.trim() === ""
    ) {

      return;
    }

    if (
      habitsList.includes(
        newHabit
      )
    ) {

      return;
    }

    setHabitsList([

      ...habitsList,

      newHabit,
    ]);

    setNewHabit("");
  };

  /* DELETE HABIT */

  const deleteHabit = (
    habitToDelete
  ) => {

    const updatedHabits =
      habitsList.filter(
        (habit) =>
          habit !==
          habitToDelete
      );

    setHabitsList(
      updatedHabits
    );
  };

  return (

    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl mb-10">

      <h2 className="text-4xl font-bold mb-8">

        📌 Habit Manager

      </h2>

      {/* ADD HABIT */}

      <div className="flex gap-4 mb-8">

        <input

          type="text"

          value={newHabit}

          onChange={(e) =>
            setNewHabit(
              e.target.value
            )
          }

          placeholder="Add new habit..."

          className="flex-1 bg-slate-900 border border-slate-700 px-5 py-4 rounded-2xl outline-none"
        />

        <button

          onClick={addHabit}

          className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-4 rounded-2xl font-bold hover:scale-105 transition duration-300"
        >

          Add Habit

        </button>

      </div>

      {/* HABIT LIST */}

      <div className="space-y-4">

        {habitsList.map(
          (
            habit,
            index
          ) => (

            <div
              key={index}

              className="bg-slate-900 border border-slate-700 p-5 rounded-2xl flex items-center justify-between"
            >

              <p className="text-xl font-semibold">

                {habit}

              </p>

              <button

                onClick={() =>
                  deleteHabit(
                    habit
                  )
                }

                className="bg-red-500 px-4 py-2 rounded-xl hover:bg-red-600 transition"
              >

                Delete

              </button>

            </div>
          )
        )}

      </div>

    </div>
  );
}