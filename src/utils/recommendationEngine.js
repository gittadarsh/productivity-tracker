export const generateRecommendations =
  ({
    score,
    streak,
    sessions,
  }) => {

    const recommendations =
      [];

    if (streak < 3) {

      recommendations.push(

        "Complete a focus session today to rebuild momentum."
      );
    }

    if (sessions < 10) {

      recommendations.push(

        "Increase deep work sessions for faster growth."
      );
    }

    if (score >= 80) {

      recommendations.push(

        "You are in elite momentum mode. Protect consistency."
      );
    }

    if (
      !recommendations.length
    ) {

      recommendations.push(

        "Your productivity systems are stable and improving."
      );
    }

    return recommendations;
  };