export default function AIAnalysis({

  habits,
  habitsList,

}) {

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const insights = [];

  /* TOTAL COMPLETED */

  let totalCompleted = 0;

  Object.values(habits).forEach(
    (day) => {

      Object.values(day).forEach(
        (completed) => {

          if (completed) {

            totalCompleted++;
          }
        }
      );
    }
  );

  /* CONSISTENCY */

  const activeDays =
    Object.keys(habits).length;

  if (activeDays >= 20) {

    insights.push(
      "🔥 Excellent consistency this month"
    );

  } else if (activeDays >= 10) {

    insights.push(
      "📈 Good consistency improving steadily"
    );

  } else {

    insights.push(
      "⚠ Low consistency detected"
    );
  }

  /* BURNOUT DETECTION */

  if (
    totalCompleted >
    habitsList.length * 20
  ) {

    insights.push(
      "🚨 Possible burnout risk detected"
    );
  }

  /* TODAY PERFORMANCE */

  const completedToday =
    habitsList.filter(
      (habit) =>
        habits[today]?.[habit]
    ).length;

  if (
    completedToday ===
    habitsList.length
  ) {

    insights.push(
      "🏆 Perfect productivity today"
    );

  } else if (
    completedToday <
    habitsList.length / 2
  ) {

    insights.push(
      "📉 Productivity dropped today"
    );
  }

  /* STRONGEST HABIT */

  let strongestHabit = "";
  let strongestCount = 0;

  habitsList.forEach((habit) => {

    let count = 0;

    Object.values(habits)
      .forEach((day) => {

        if (day[habit]) {

          count++;
        }
      });

    if (
      count >
      strongestCount
    ) {

      strongestCount =
        count;

      strongestHabit =
        habit;
    }
  });

  if (strongestHabit) {

    insights.push(

      `💪 Strongest habit: ${strongestHabit}`

    );
  }

  return (

    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl mt-10">

      <h2 className="text-4xl font-bold mb-8">

        🤖 AI Performance Analysis

      </h2>

      <div className="space-y-5">

        {insights.map(
          (insight, index) => (

            <div
              key={index}

              className="bg-slate-900 border border-slate-700 p-5 rounded-2xl text-lg"
            >

              {insight}

            </div>
          )
        )}

      </div>

    </div>
  );
}