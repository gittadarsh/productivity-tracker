export const calculateStreak =
  (
    lastActiveDate,
    currentStreak
  ) => {

    const today =
      new Date();

    const lastDate =
      new Date(
        lastActiveDate
      );

    const diff =
      Math.floor(

        (
          today -
          lastDate
        ) /

        (
          1000 * 60 * 60 * 24
        )
      );

    /* SAME DAY */

    if (diff === 0) {

      return currentStreak;
    }

    /* NEXT DAY */

    if (diff === 1) {

      return currentStreak + 1;
    }

    /* BROKEN */

    return 1;
  };