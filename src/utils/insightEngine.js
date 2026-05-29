export const generateInsights =
  ({
    xp,
    sessions,
    streak,
    score,
  }) => {

    const insights = [];

    /* PERFORMANCE */

    if (score >= 85) {

      insights.push({

        type: "success",

        title:
          "Peak Productivity",

        description:
          "You are operating at elite productivity levels.",
      });

    } else if (score >= 60) {

      insights.push({

        type: "good",

        title:
          "Strong Momentum",

        description:
          "Your productivity consistency is improving steadily.",
      });

    } else {

      insights.push({

        type: "warning",

        title:
          "Low Productivity",

        description:
          "Focus consistency needs improvement for stronger growth.",
      });
    }

    /* STREAK */

    if (streak >= 7) {

      insights.push({

        type: "success",

        title:
          "Consistency Beast",

        description:
          "Your streak discipline is becoming a major strength.",
      });

    } else {

      insights.push({

        type: "warning",

        title:
          "Streak Risk",

        description:
          "Complete more sessions daily to protect your streak.",
      });
    }

    /* XP */

    if (xp >= 1000) {

      insights.push({

        type: "success",

        title:
          "XP Growth",

        description:
          "Your productivity progression is accelerating rapidly.",
      });
    }

    /* FOCUS */

    if (sessions < 5) {

      insights.push({

        type: "warning",

        title:
          "Focus Frequency",

        description:
          "More deep work sessions will dramatically improve results.",
      });
    }

    return insights;
  };