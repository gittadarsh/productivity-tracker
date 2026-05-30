export const generateFocusHeat =
  sessions => {

    if (sessions >= 30) {

      return {

        peak:
          "Morning",

        strength:
          "Elite",
      };
    }

    if (sessions >= 15) {

      return {

        peak:
          "Afternoon",

        strength:
          "Strong",
      };
    }

    return {

      peak:
        "Developing",

      strength:
        "Moderate",
    };
  };