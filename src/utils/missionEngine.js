export const generateMissions =
  ({
    sessions,
    streak,
    xp,
    score,
  }) => {

    const missions = [];

    /* FOCUS */

    if (sessions < 5) {

      missions.push({

        title:
          "Complete 3 Focus Sessions",

        progress:
          Math.min(
            100,
            (sessions / 3) * 100
          ),

        reward:
          "+120 XP",
      });
    }

    /* STREAK */

    if (streak < 7) {

      missions.push({

        title:
          "Protect Your Streak",

        progress:
          Math.min(
            100,
            (streak / 7) * 100
          ),

        reward:
          "+150 XP",
      });
    }

    /* XP */

    if (xp < 2000) {

      missions.push({

        title:
          "Reach 2000 XP",

        progress:
          Math.min(
            100,
            (xp / 2000) * 100
          ),

        reward:
          "+300 XP",
      });
    }

    /* ELITE */

    if (score >= 70) {

      missions.push({

        title:
          "Elite Productivity Push",

        progress:
          Math.min(
            100,
            score
          ),

        reward:
          "+500 XP",
      });
    }

    return missions;
  };