import toast from "react-hot-toast";

export const notifySuccess =
  message => {

    toast.success(message);
  };

export const notifyError =
  message => {

    toast.error(message);
  };

export const notifyAchievement =
  title => {

    toast.success(
      `🏆 ${title} unlocked`
    );
  };

export const notifyAI =
  message => {

    toast(message, {

      icon: "🤖",
    });
  };

/* OLD EXPORT FIX */

export const generateNotifications =
  productivity => {

    const notifications =
      [];

    if (
      productivity?.streak < 3
    ) {

      notifications.push({

        title:
          "Streak Warning",

        description:
          "Complete a focus session today.",
      });
    }

    if (
      productivity?.score >= 80
    ) {

      notifications.push({

        title:
          "Elite Momentum",

        description:
          "Your productivity momentum is strong.",
      });
    }

    if (
      !notifications.length
    ) {

      notifications.push({

        title:
          "All Systems Stable",

        description:
          "Your productivity systems are healthy.",
      });
    }

    return notifications;
  };