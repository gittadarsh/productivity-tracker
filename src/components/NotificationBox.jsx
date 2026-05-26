export default function NotificationBox({

  habits,
  habitsList,
  user,

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

        title:
          "Habit Pending",

        text:
          `⚠ You have not completed ${habit} today`,

        time:
          "Today",
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

        title:
          "Streak Active",

        text:
          `🔥 ${habit} streak is active (${streak} days)`,

        time:
          "AI Tracking",
      });
    }

    if (
      streak === 0
      &&
      habitsList.length > 0
    ) {

      notifications.push({

        type: "danger",

        title:
          "Streak Risk",

        text:
          `🚨 Your ${habit} streak is at risk`,

        time:
          "Urgent",
      });
    }
  });

  /* LOW PRODUCTIVITY */

  if (
    habitsList.length > 0
    &&
    completedToday <
      habitsList.length / 2
  ) {

    notifications.push({

      type: "danger",

      title:
        "Low Productivity",

      text:
        "📉 Your productivity is lower today",

      time:
        "AI Monitoring",
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

      title:
        "Perfect Day",

      text:
        "🏆 Perfect productivity today",

      time:
        "Achievement",
    });
  }

  /* AI PRODUCTIVITY */

  if (
    habitsList.length > 0
    &&
    completedToday >=
      habitsList.length * 0.8
  ) {

    notifications.push({

      type: "ai",

      title:
        "AI Insight",

      text:
        "🤖 Excellent consistency detected this week",

      time:
        "AI Analysis",
    });
  }

  /* MENTOR ALERT */

  if (
    completedToday === 0
    &&
    habitsList.length > 0
  ) {

    notifications.push({

      type: "mentor",

      title:
        "Mentor Attention",

      text:
        "📢 Mentor may review your recent inactivity",

      time:
        "Mentor System",
    });
  }

  /* MOTIVATION */

  if (
    completedToday > 0
  ) {

    notifications.push({

      type: "motivation",

      title:
        "Daily Motivation",

      text:
        "💡 Small daily progress creates massive long-term success",

      time:
        "Growth Mindset",
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

        case "mentor":

          return "border-purple-500 bg-purple-500/10";

        default:

          return "border-slate-700 bg-slate-900";
      }
    };

  return (

    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl mt-10">

      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">

        <h2 className="text-3xl md:text-4xl font-bold">

          🔔 Smart Notifications

        </h2>

        <div className="bg-cyan-500 text-black px-5 py-2 rounded-xl font-bold shadow-lg">

          {notifications.length}
          {" "}
          Alerts

        </div>

      </div>

      <div className="space-y-5">

        {notifications.length === 0 ? (

          <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl text-lg">

            No notifications today 🚀

          </div>

        ) : (

          notifications.map(
            (
              notification,
              index
            ) => (

              <div
                key={index}

                className={`border p-6 rounded-2xl transition duration-300 hover:scale-[1.01]

                ${getNotificationStyle(
                  notification.type
                )}`}
              >

                <div className="flex items-center justify-between mb-3 flex-wrap gap-3">

                  <h3 className="text-2xl font-bold">

                    {
                      notification.title
                    }

                  </h3>

                  <span className="text-sm bg-black/20 px-3 py-1 rounded-lg">

                    {
                      notification.time
                    }

                  </span>

                </div>

                <p className="text-lg text-slate-200">

                  {
                    notification.text
                  }

                </p>

              </div>
            )
          )
        )}

      </div>

    </div>
  );
}