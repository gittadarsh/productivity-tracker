export const generateMemoryInsights =
  ({
    score,
    streak,
    sessions,
  }) => {

    if (
      score >= 85
    ) {

      return {

        type: "elite",

        message:
          "You perform strongly under structured focus systems.",
      };
    }

    if (
      streak < 3
    ) {

      return {

        type: "warning",

        message:
          "Your consistency is unstable. Focus on rebuilding momentum.",
      };
    }

    if (
      sessions >= 15
    ) {

      return {

        type: "growth",

        message:
          "Your deep work behavior is improving steadily.",
      };
    }

    return {

      type: "neutral",

      message:
        "Your productivity identity is still evolving.",
    };
  };