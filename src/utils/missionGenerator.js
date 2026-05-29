export const generateMission =
  ({
    streak,
    score,
    sessions,
  }) => {

    if (streak < 3) {

      return {

        title:
          "Rebuild Momentum",

        reward: 50,
      };
    }

    if (sessions < 10) {

      return {

        title:
          "Complete 3 Focus Sessions",

        reward: 80,
      };
    }

    if (score >= 80) {

      return {

        title:
          "Maintain Elite Focus",

        reward: 120,
      };
    }

    return {

      title:
        "Deep Work Sprint",

      reward: 60,
    };
  };