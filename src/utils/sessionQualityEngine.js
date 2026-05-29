export const calculateSessionQuality =
  ({
    completed,
    interruptions,
  }) => {

    if (!completed) {

      return 20;
    }

    let quality = 100;

    quality -=
      interruptions * 15;

    return Math.max(
      10,
      quality
    );
  };