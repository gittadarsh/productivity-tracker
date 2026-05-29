export const calculateProductivityScore =
  ({
    xp,
    sessions,
    streak,
    quality,
  }) => {

    return Math.min(

      100,

      Math.floor(

        xp * 0.015 +

        sessions * 1.5 +

        streak * 4 +

        quality * 0.25
      )
    );
  };