export const generateRecommendations =
  ({
    xp,
    sessions,
    streak,
    score,
  }) => {

    const recommendations = [];

    /* FOCUS */

    if (sessions < 3) {

      recommendations.push(

        "Complete more focus sessions daily to improve deep work capacity."
      );
    }

    /* STREAK */

    if (streak < 5) {

      recommendations.push(

        "Your streak is still weak. Consistency will massively improve productivity."
      );
    }

    /* SCORE */

    if (score >= 80) {

      recommendations.push(

        "You are performing at high productivity levels. Maintain current momentum."
      );
    }

    /* XP */

    if (xp < 1000) {

      recommendations.push(

        "Reach 1000 XP to unlock stronger progression momentum."
      );
    }

    return recommendations;
  };