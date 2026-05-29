export const getLevelData =
  (xp) => {

    const level =
      Math.max(
        1,
        Math.floor(
          xp / 250
        )
      );

    const nextLevelXP =
      (level + 1) * 250;

    const currentLevelXP =
      level * 250;

    const progress =
      (
        (
          xp -
          currentLevelXP
        ) /

        (
          nextLevelXP -
          currentLevelXP
        )
      ) * 100;

    return {

      level,

      nextLevelXP,

      progress:
        Math.min(
          100,
          Math.max(
            0,
            progress
          )
        ),
    };
  };