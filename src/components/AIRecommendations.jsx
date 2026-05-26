export default function AIRecommendations({

  habits,
  habitsList,

}) {

  const recommendations = [];

  /* TOTAL COMPLETIONS */

  const habitStats = {};

  habitsList.forEach((habit) => {

    habitStats[habit] = 0;
  });

  Object.values(habits).forEach(
    (day) => {

      habitsList.forEach(
        (habit) => {

          if (day[habit]) {

            habitStats[habit]++;
          }
        }
      );
    }
  );

  /* WEAKEST HABIT */

  let weakestHabit = "";
  let weakestCount =
    Infinity;

  Object.entries(habitStats)
    .forEach(
      ([habit, count]) => {

        if (
          count <
          weakestCount
        ) {

          weakestCount =
            count;

          weakestHabit =
            habit;
        }
      }
    );

  /* STRONGEST HABIT */

  let strongestHabit = "";
  let strongestCount = 0;

  Object.entries(habitStats)
    .forEach(
      ([habit, count]) => {

        if (
          count >
          strongestCount
        ) {

          strongestCount =
            count;

          strongestHabit =
            habit;
        }
      }
    );

  /* AI RECOMMENDATIONS */

  if (strongestHabit) {

    recommendations.push(

      `🔥 Excellent consistency in ${strongestHabit}`

    );
  }

  if (weakestHabit) {

    recommendations.push(

      `⚠ Focus more on ${weakestHabit} this week`

    );
  }

  /* PRODUCTIVITY CHECK */

  const totalDays =
    Object.keys(habits)
      .length;

  if (totalDays >= 20) {

    recommendations.push(

      "🏆 Your productivity consistency is impressive"

    );

  } else if (
    totalDays >= 10
  ) {

    recommendations.push(

      "📈 Productivity improving steadily"

    );

  } else {

    recommendations.push(

      "🚨 Try maintaining a more consistent schedule"

    );
  }

  /* BURNOUT DETECTION */

  const totalCompleted =
    Object.values(
      habitStats
    ).reduce(
      (a, b) => a + b,
      0
    );

  if (
    totalCompleted >
    habitsList.length * 25
  ) {

    recommendations.push(

      "😴 Consider taking short breaks to avoid burnout"

    );
  }

  /* MOTIVATION */

  recommendations.push(

    "💡 Small daily consistency beats occasional motivation"

  );

  return (

    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl mt-10">

      <h2 className="text-4xl font-bold mb-8">

        🧠 AI Recommendations

      </h2>

      <div className="space-y-4">

        {recommendations.map(
          (
            recommendation,
            index
          ) => (

            <div
              key={index}

              className="bg-slate-900 border border-slate-700 p-5 rounded-2xl text-lg"
            >

              {recommendation}

            </div>
          )
        )}

      </div>

    </div>
  );
}