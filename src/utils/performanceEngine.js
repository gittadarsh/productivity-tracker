export const getPerformanceStatus =
  ({
    score,
    streak,
  }) => {

    if (
      score >= 85 &&
      streak >= 10
    ) {

      return {

        label:
          "Peak Performance",

        color:
          "text-green-400",
      };
    }

    if (
      score >= 60
    ) {

      return {

        label:
          "Strong Momentum",

        color:
          "text-cyan-400",
      };
    }

    if (
      score >= 40
    ) {

      return {

        label:
          "Balanced",

        color:
          "text-yellow-400",
      };
    }

    return {

      label:
        "Declining",

      color:
        "text-red-400",
    };
  };