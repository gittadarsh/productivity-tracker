export const getAchievements =
  ({
    xp,
    sessions,
    streak,
    score,
  }) => [

    {
      title:
        "XP Hunter",

      unlocked:
        xp >= 1000,
    },

    {
      title:
        "Focus Master",

      unlocked:
        sessions >= 25,
    },

    {
      title:
        "Consistency Beast",

      unlocked:
        streak >= 7,
    },

    {
      title:
        "Elite Performer",

      unlocked:
        score >= 90,
    },
  ];