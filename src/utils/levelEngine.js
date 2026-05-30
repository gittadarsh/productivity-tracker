export function generateInsights(
  analytics
) {

  const insights = [];

  if (
    analytics.completionRate >=
    80
  ) {

    insights.push(
      "Elite consistency detected."
    );
  }

  if (
    analytics.averageStreak >=
    5
  ) {

    insights.push(
      "Your streak momentum is becoming stable."
    );
  }

  if (
    analytics.completionRate <
    40
  ) {

    insights.push(
      "Your consistency system needs optimization."
    );
  }

  if (
    analytics.completedHabits ===
    analytics.totalHabits
  ) {

    insights.push(
      "Perfect daily execution achieved."
    );
  }

  return insights;
}