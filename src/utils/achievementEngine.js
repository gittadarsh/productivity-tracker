export const checkAchievements =
  ({
    xp,
    streak,
    sessions,
  }) => {

    const unlocked = [];

    /* XP */

    if (xp >= 500) {

      unlocked.push({

        title:
          "XP Starter",

        icon: "⚡",
      });
    }

    if (xp >= 2000) {

      unlocked.push({

        title:
          "Momentum Master",

        icon: "🚀",
      });
    }

    /* STREAK */

    if (streak >= 7) {

      unlocked.push({

        title:
          "Consistency Warrior",

        icon: "🔥",
      });
    }

    /* FOCUS */

    if (sessions >= 25) {

      unlocked.push({

        title:
          "Deep Work Elite",

        icon: "🧠",
      });
    }

    return unlocked;
  };

/* OLD EXPORT FIX */

export const getAchievements =
  productivity => {

    return checkAchievements({

      xp:
        productivity?.xp || 0,

      streak:
        productivity?.streak || 0,

      sessions:
        productivity?.sessions || 0,
    });
  };