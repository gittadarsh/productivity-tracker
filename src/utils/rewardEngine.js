export const getRewardData =
  (xp) => {

    if (xp >= 5000) {

      return {

        title:
          "Elite Performer",

        reward:
          "Elite Rank Unlocked",
      };
    }

    if (xp >= 2500) {

      return {

        title:
          "Deep Worker",

        reward:
          "Advanced Productivity Rank",
      };
    }

    if (xp >= 1000) {

      return {

        title:
          "Consistency Builder",

        reward:
          "Momentum Badge",
      };
    }

    return {

      title:
        "Beginner",

      reward:
        "Keep progressing",
    };
  };