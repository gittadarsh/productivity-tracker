import { useState, useEffect } from "react";

export default function Goals() {

  const [goalInput, setGoalInput] =
    useState("");

  const [goals, setGoals] = useState(() => {

    const saved =
      localStorage.getItem("goals");

    return saved ? JSON.parse(saved) : [];

  });

  useEffect(() => {

    localStorage.setItem(
      "goals",
      JSON.stringify(goals)
    );

  }, [goals]);

  const addGoal = () => {

    if (!goalInput.trim()) return;

    const newGoal = {
      id: Date.now(),

      title: goalInput,

      progress: 0,
    };

    setGoals([...goals, newGoal]);

    setGoalInput("");
  };

  const increaseProgress = (id) => {

    setGoals(
      goals.map((goal) =>

        goal.id === id
          ? {
              ...goal,

              progress:
                goal.progress >= 100
                  ? 100
                  : goal.progress + 10,
            }
          : goal
      )
    );
  };

  return (

    <div>

      {/* TITLE */}

      <h1 className="text-5xl font-bold mb-10">
        🎯 Goals
      </h1>

      {/* ADD GOAL */}

      <div className="flex gap-4 mb-10">

        <input
          type="text"

          placeholder="Enter your goal..."

          value={goalInput}

          onChange={(e) =>
            setGoalInput(e.target.value)
          }

          className="flex-1 p-4 rounded-2xl bg-slate-800 text-white outline-none"
        />

        <button
          onClick={addGoal}

          className="bg-cyan-500 px-8 py-4 rounded-2xl font-bold hover:bg-cyan-400 transition"
        >
          Add Goal
        </button>

      </div>

      {/* GOALS LIST */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {goals.map((goal) => (

          <div
            key={goal.id}

            className="bg-slate-800 p-8 rounded-3xl shadow-xl"
          >

            <h2 className="text-3xl font-bold mb-6">
              {goal.title}
            </h2>

            {/* PROGRESS BAR */}

            <div className="w-full bg-slate-700 h-5 rounded-full mb-4">

              <div
                className="bg-green-500 h-5 rounded-full transition-all duration-300"

                style={{
                  width: `${goal.progress}%`,
                }}
              />

            </div>

            <p className="text-xl mb-6">
              {goal.progress}% Completed
            </p>

            <button
              onClick={() =>
                increaseProgress(goal.id)
              }

              className="bg-green-500 px-6 py-3 rounded-xl font-semibold hover:bg-green-400 transition"
            >
              Increase Progress
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}