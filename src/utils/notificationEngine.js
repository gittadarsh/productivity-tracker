export const generateNotifications =
  ({
    score,
    streak,
    xp,
    sessions,
  }) => {

    const notifications = [];

    if (streak < 3) {

      notifications.push({

        type: "warning",

        title:
          "Streak At Risk",

        description:
          "Complete a focus session today to maintain consistency.",
      });
    }

    if (score < 40) {

      notifications.push({

        type: "danger",

        title:
          "Productivity Declining",

        description:
          "Your productivity score is dropping significantly.",
      });
    }

    if (
      xp % 250 > 180
    ) {

      notifications.push({

        type: "success",

        title:
          "Level Almost Unlocked",

        description:
          "You are very close to the next productivity level.",
      });
    }

    if (sessions < 5) {

      notifications.push({

        type: "info",

        title:
          "Low Focus Activity",

        description:
          "Increase deep work sessions to improve momentum.",
      });
    }

    return notifications;
  };