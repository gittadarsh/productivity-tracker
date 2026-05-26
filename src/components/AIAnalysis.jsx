export default function AIAnalysis({

  habits,
  habitsList,

}) {

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  /* TODAY COMPLETION */

  const completedToday =
    habitsList.filter(
      (habit) =>
        habits[today]?.[habit]
    ).length;

  const completionRate =

    habitsList.length > 0

      ? Math.round(

          (
            completedToday /
            habitsList.length
          ) * 100
        )

      : 0;

  /* AI PREDICTIONS */

  const predictions = [];

  /* HIGH PERFORMANCE */

  if (
    completionRate >= 80
  ) {

    predictions.push({

      type: "success",

      title:
        "🔥 High Consistency Detected",

      description:
        "AI predicts strong long-term productivity growth.",
    });
  }

  /* BURNOUT RISK */

  if (
    completionRate <= 30
  ) {

    predictions.push({

      type: "danger",

      title:
        "⚠ Burnout Risk Detected",

      description:
        "Your recent consistency is low. Consider taking strategic breaks.",
    });
  }

  /* STREAK POSSIBILITY */

  if (
    completionRate >= 60
  ) {

    predictions.push({

      type: "ai",

      title:
        "🎯 Streak Success Prediction",

      description:
        "AI predicts a high probability of maintaining your streak this week.",
    });
  }

  /* PRODUCTIVITY DROP */

  if (
    completionRate < 50
  ) {

    predictions.push({

      type: "warning",

      title:
        "📉 Productivity Drop Warning",

      description:
        "Your productivity trend is decreasing compared to previous activity.",
    });
  }

  /* EXCELLENT MOMENTUM */

  if (
    completionRate === 100
  ) {

    predictions.push({

      type: "success",

      title:
        "🏆 Peak Productivity Achieved",

      description:
        "Outstanding performance detected across all tracked habits.",
    });
  }

  /* AI MOTIVATION */

  predictions.push({

    type: "motivation",

    title:
      "🤖 AI Recommendation",

    description:
      "Focus on consistency instead of perfection for long-term growth.",
  });

  /* COLORS */

  const getStyle =
    (type) => {

      switch (type) {

        case "success":

          return "border-green-500 bg-green-500/10";

        case "danger":

          return "border-red-500 bg-red-500/10";

        case "warning":

          return "border-yellow-500 bg-yellow-500/10";

        case "ai":

          return "border-cyan-500 bg-cyan-500/10";

        default:

          return "border-purple-500 bg-purple-500/10";
      }
    };

  return (

    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl mt-10">

      <div className="flex items-center justify-between mb-8">

        <h2 className="text-4xl font-bold">

          🤖 AI Productivity Prediction

        </h2>

        <div className="bg-cyan-500 text-black px-4 py-2 rounded-xl font-bold">

          AI ACTIVE

        </div>

      </div>

      {/* COMPLETION RATE */}

      <div className="mb-8">

        <div className="flex justify-between mb-3">

          <p className="text-xl font-semibold">

            Productivity Score

          </p>

          <p className="text-xl font-bold text-cyan-400">

            {completionRate}%

          </p>

        </div>

        <div className="w-full bg-slate-700 rounded-full h-5">

          <div

            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-5 rounded-full transition-all duration-500"

            style={{
              width:
                `${completionRate}%`,
            }}
          >

          </div>

        </div>

      </div>

      {/* AI PREDICTIONS */}

      <div className="space-y-5">

        {predictions.map(
          (
            prediction,
            index
          ) => (

            <div
              key={index}

              className={`border p-6 rounded-2xl transition duration-300 hover:scale-[1.01]

              ${getStyle(
                prediction.type
              )}`}
            >

              <h3 className="text-2xl font-bold mb-3">

                {prediction.title}

              </h3>

              <p className="text-lg text-slate-200">

                {
                  prediction.description
                }

              </p>

            </div>
          )
        )}

      </div>

    </div>
  );
}