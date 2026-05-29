export const getProductivityPersona =
  ({
    xp,
    sessions,
    streak,
    score,
  }) => {

    if (
      score >= 85 &&
      streak >= 10
    ) {

      return {

        title:
          "Deep Worker",

        description:
          "Elite focus consistency and deep work discipline.",
      };
    }

    if (
      streak >= 7
    ) {

      return {

        title:
          "Consistency Builder",

        description:
          "Strong routine and momentum development.",
      };
    }

    if (
      xp >= 1500
    ) {

      return {

        title:
          "Momentum Performer",

        description:
          "Rapid productivity growth and strong execution.",
      };
    }

    return {

      title:
        "Rising Achiever",

      description:
        "Building productivity systems and focus habits.",
    };
  };