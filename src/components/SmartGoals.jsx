export default function SmartGoals({

  habits,
  habitsList,

}) {

  const goals = [];

  /* HABIT STATS */

  const stats = {};

  habitsList.forEach((habit) => {

    stats[habit] = 0;
  });

  Object.values(habits).forEach(
    (day) => {

      habitsList.forEach(
        (habit) => {

          if (day[habit]) {

            stats[habit]++;
          }
        }
      );
    }
  );

  /* GENERATE SMART GOALS */

  Object.entries(stats).forEach(
    ([habit, count]) => {

      if (count < 5) {

        goals.push(

          `🎯 Focus on improving ${habit} consistency this week`

        );

      } else if (
        count < 15
      ) {

        goals.push(

          `📈 Try completing ${habit} at least 4 more times this week`

        );

      } else {

        goals.push(

          `🔥 Maintain your strong ${habit} performance`

        );
      }
    }
  );

  /* CONSISTENCY GOAL */

  const activeDays =
    Object.keys(habits)
      .length;

  if (activeDays < 10) {

    goals.push(

      "🚨 Target at least 5 productive days this week"

    );

  } else if (
    activeDays < 20
  ) {

    goals.push(

      "📊 Push for higher weekly consistency"

    );

  } else {

    goals.push(

      "🏆 Outstanding consistency — maintain momentum"

    );
  }

  /* BALANCE GOAL */

  goals.push(

    "⚖ Maintain balance between productivity and rest"

  );

  return (

    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl mt-10">

      <h2 className="text-4xl font-bold mb-8">

        🎯 Smart Goal Recommendations

      </h2>

      <div className="space-y-4">

        {goals.map(
          (
            goal,
            index
          ) => (

            <div
              key={index}

              className="bg-slate-900 border border-slate-700 p-5 rounded-2xl text-lg"
            >

              {goal}

            </div>
          )
        )}

      </div>

    </div>
  );
}