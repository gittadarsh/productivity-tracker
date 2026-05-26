import {

  useState,

} from "react";

export default function StudyPlanner() {

  const [hours, setHours] =
    useState("");

  const [goal, setGoal] =
    useState("");

  const [plan, setPlan] =
    useState([]);

  /* GENERATE AI PLAN */

  const generatePlan =
    () => {

      if (
        !hours ||
        !goal
      ) {

        alert(
          "Please fill all fields"
        );

        return;
      }

      const studyHours =
        Number(hours);

      const generatedPlan =
        [];

      /* DSA */

      generatedPlan.push({

        time:
          "7:00 AM - 8:00 AM",

        task:
          "📚 DSA Problem Solving",
      });

      /* DEVELOPMENT */

      if (
        studyHours >= 4
      ) {

        generatedPlan.push({

          time:
            "10:00 AM - 11:00 AM",

          task:
            "💻 Development Practice",
        });
      }

      /* REVISION */

      generatedPlan.push({

        time:
          "2:00 PM - 2:45 PM",

        task:
          "📝 Revision Session",
      });

      /* FITNESS */

      generatedPlan.push({

        time:
          "5:00 PM - 5:30 PM",

        task:
          "🏋 Fitness / Walk",
      });

      /* GOAL-SPECIFIC AI */

      if (
        goal === "Placement"
      ) {

        generatedPlan.push({

          time:
            "8:00 PM - 9:00 PM",

          task:
            "🎯 Placement Preparation + Aptitude",
        });
      }

      if (
        goal === "Competitive Programming"
      ) {

        generatedPlan.push({

          time:
            "8:00 PM - 9:30 PM",

          task:
            "⚡ Competitive Programming Contest Practice",
        });
      }

      if (
        goal === "Full Stack Development"
      ) {

        generatedPlan.push({

          time:
            "8:00 PM - 9:30 PM",

          task:
            "🚀 Build Full Stack Projects",
        });
      }

      /* AI OVERLOAD CHECK */

      if (
        studyHours >= 8
      ) {

        generatedPlan.push({

          time:
            "AI Alert",

          task:
            "⚠ AI detected possible burnout risk. Add breaks between sessions.",
        });
      }

      /* AI MOTIVATION */

      generatedPlan.push({

        time:
          "AI Recommendation",

        task:
          "🤖 Focus on consistency over intensity for long-term success.",
        });

      setPlan(
        generatedPlan
      );
    };

  return (

    <div>

      <h1 className="text-5xl font-bold mb-10">

        🤖 AI Study Planner

      </h1>

      {/* FORM */}

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl mb-10">

        <h2 className="text-3xl font-bold mb-6">

          🎯 Generate Smart Study Plan

        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="number"
            placeholder="Study Hours Per Day"

            value={hours}

            onChange={(e) =>
              setHours(
                e.target.value
              )
            }

            className="bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none"
          />

          <select

            value={goal}

            onChange={(e) =>
              setGoal(
                e.target.value
              )
            }

            className="bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none"
          >

            <option value="">
              Select Goal
            </option>

            <option value="Placement">
              Placement
            </option>

            <option value="Competitive Programming">
              Competitive Programming
            </option>

            <option value="Full Stack Development">
              Full Stack Development
            </option>

          </select>

        </div>

        <button
          onClick={
            generatePlan
          }

          className="bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-2xl font-bold mt-6 hover:scale-105 transition duration-300"
        >

          Generate AI Plan

        </button>

      </div>

      {/* PLAN */}

      {
        plan.length > 0 && (

          <div className="space-y-5">

            {plan.map(
              (
                item,
                index
              ) => (

                <div
                  key={index}

                  className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-6 rounded-3xl shadow-2xl"
                >

                  <h2 className="text-2xl font-bold text-cyan-400 mb-3">

                    {item.time}

                  </h2>

                  <p className="text-xl">

                    {item.task}

                  </p>

                </div>
              )
            )}

          </div>
        )
      }

    </div>
  );
}