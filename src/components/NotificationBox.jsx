export default function NotificationBox({

  habits,
  habitsList,

}) {

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const notifications = [];

  /* MISSED HABITS */

  habitsList.forEach((habit) => {

    if (
      !habits[today]?.[habit]
    ) {

      notifications.push(

        `⚠ You have not completed ${habit} today`

      );
    }
  });

  /* STREAK RISK */

  habitsList.forEach((habit) => {

    let streak = 0;

    for (
      let i = 0;
      i < 7;
      i++
    ) {

      const date =
        new Date();

      date.setDate(
        date.getDate() - i
      );

      const formatted =
        date
          .toISOString()
          .split("T")[0];

      if (
        habits[
          formatted
        ]?.[habit]
      ) {

        streak++;

      } else {

        break;
      }
    }

    if (streak >= 5) {

      notifications.push(

        `🔥 ${habit} streak is active (${streak} days)`

      );
    }
  });

  /* LOW PRODUCTIVITY */

  const completedToday =
    habitsList.filter(
      (habit) =>
        habits[today]?.[habit]
    ).length;

  if (
    completedToday <
    habitsList.length / 2
  ) {

    notifications.push(

      "📉 Your productivity is lower today"

    );
  }

  /* PERFECT DAY */

  if (
    completedToday ===
    habitsList.length
  ) {

    notifications.push(

      "🏆 Perfect productivity today"

    );
  }

  return (

    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl mt-10">

      <h2 className="text-4xl font-bold mb-8">

        🔔 Smart Notifications

      </h2>

      <div className="space-y-4">

        {notifications.length === 0 ? (

          <div className="bg-slate-900 border border-slate-700 p-5 rounded-2xl">

            No notifications today

          </div>

        ) : (

          notifications.map(
            (
              notification,
              index
            ) => (

              <div
                key={index}

                className="bg-slate-900 border border-slate-700 p-5 rounded-2xl text-lg"
              >

                {notification}

              </div>
            )
          )
        )}

      </div>

    </div>
  );
}