export default function NotificationBox({

  habits,
  habitsList,

}) {

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const notifications = [];

  /* COMPLETED TODAY */

  const completedToday =
    habitsList.filter(
      (habit) =>
        habits[today]?.[habit]
    ).length;

  /* MISSED HABITS */

  habitsList.forEach((habit) => {

    if (
      !habits[today]?.[habit]
    ) {

      notifications.push({

        type: "warning",

        text:
          `⚠ You have not completed ${habit} today`,
      });
    }
  });

  /* STREAK ALERTS */

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

      notifications.push({

        type: "success",

        text:
          `🔥 ${habit} streak is active (${streak} days)`,
      });
    }

    if (streak === 0) {

      notifications.push({

        type: "danger",

        text:
          `🚨 Your ${habit} streak is at risk`,
      });
    }
  });

  /* LOW PRODUCTIVITY */

  if (
    completedToday <
    habitsList.length / 2
  ) {

    notifications.push({

      type: "danger",

      text:
        "📉 Your productivity is lower today",
    });
  }

  /* PERFECT DAY */

  if (
    completedToday ===
    habitsList.length
    &&
    habitsList.length > 0
  ) {

    notifications.push({

      type: "success",

      text:
        "🏆 Perfect productivity today",
    });
  }

  /* AI PRODUCTIVITY */

  if (
    completedToday >=
    habitsList.length * 0.8
  ) {

    notifications.push({

      type: "ai",

      text:
        "🤖 AI Insight: Excellent consistency detected",
    });
  }

  /* MOTIVATION */

  if (
    completedToday > 0
  ) {

    notifications.push({

      type: "motivation",

      text:
        "💡 Small progress daily creates long-term success",
    });
  }

  /* COLOR SYSTEM */

  const getNotificationStyle =
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

          return "border-slate-700 bg-slate-900";
      }
    };

  return (

    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl mt-10">

      <div className="flex items-center justify-between mb-8">

        <h2 className="text-4xl font-bold">

          🔔 Smart Notifications

        </h2>

        <div className="bg-cyan-500 text-black px-4 py-2 rounded-xl font-bold">

          {notifications.length}
          {" "}
          Alerts

        </div>

      </div>

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

                className={`border p-5 rounded-2xl text-lg transition duration-300 hover:scale-[1.01]

                ${getNotificationStyle(
                  notification.type
                )}`}
              >

                {notification.text}

              </div>
            )
          )
        )}

      </div>

    </div>
  );
}