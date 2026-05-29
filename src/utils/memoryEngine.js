export const generateMemoryInsights =
  (history = []) => {

    if (!history.length) {

      return {

        strongestDay:
          "N/A",

        weakestDay:
          "N/A",

        averageScore: 0,
      };
    }

    let strongest =
      history[0];

    let weakest =
      history[0];

    let total = 0;

    history.forEach(
      item => {

        total +=
          item.productivityScore || 0;

        if (

          (
            item.productivityScore ||
            0
          ) >

          (
            strongest.productivityScore ||
            0
          )
        ) {

          strongest =
            item;
        }

        if (

          (
            item.productivityScore ||
            0
          ) <

          (
            weakest.productivityScore ||
            0
          )
        ) {

          weakest =
            item;
        }
      }
    );

    return {

      strongestDay:
        strongest.date,

      weakestDay:
        weakest.date,

      averageScore:
        Math.floor(
          total /
          history.length
        ),
    };
  };