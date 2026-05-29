export const generateAnalytics =
  ({
    xp,
    sessions,
    streak,
  }) => {

    return {

      weeklyGrowth:
        Math.floor(
          xp * 0.08
        ),

      consistency:
        Math.min(
          100,
          streak * 8
        ),

      focusStrength:
        Math.min(
          100,
          sessions * 3
        ),
    };
  };