export const generateMissions =
  ({
    sessions,
    streak,
    xp,
  }) => [

    {
      title:
        "Complete 2 Focus Sessions",

      progress:
        Math.min(
          100,
          (sessions / 2) * 100
        ),

      reward:
        "+100 XP",
    },

    {
      title:
        "Maintain Streak",

      progress:
        Math.min(
          100,
          (streak / 7) * 100
        ),

      reward:
        "+120 XP",
    },

    {
      title:
        "Reach 1000 XP",

      progress:
        Math.min(
          100,
          (xp / 1000) * 100
        ),

      reward:
        "+200 XP",
    },
  ];