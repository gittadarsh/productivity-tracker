export const calculateLevel =
  xp => {

    return Math.max(

      1,

      Math.floor(

        0.1 *

        Math.sqrt(xp)
      )
    );
  };

export const getNextLevelXP =
  level => {

    return Math.pow(
      (level + 1) / 0.1,
      2
    );
  };

/* OLD EXPORT FIX */

export const getLevelData =
  xp => {

    const level =
      calculateLevel(xp);

    const nextLevelXP =
      getNextLevelXP(level);

    return {

      level,

      nextLevelXP,
    };
  };