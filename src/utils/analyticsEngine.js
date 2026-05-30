export function generateAnalytics(
  habits
) {

  const totalHabits =
    habits.length;

  const completedHabits =
    habits.filter(
      (habit) =>
        habit.completed
    ).length;

  const completionRate =
    totalHabits === 0
      ? 0
      : Math.round(
          (
            completedHabits /
            totalHabits
          ) * 100
        );

  const totalStreak =
    habits.reduce(
      (acc, habit) =>
        acc + habit.streak,
      0
    );

  const averageStreak =
    totalHabits === 0
      ? 0
      : Math.round(
          totalStreak /
            totalHabits
        );

  let productivityLabel =
    "Needs Improvement";

  if (completionRate >= 80) {

    productivityLabel =
      "Elite";
  }

  else if (
    completionRate >= 60
  ) {

    productivityLabel =
      "Strong";
  }

  else if (
    completionRate >= 40
  ) {

    productivityLabel =
      "Average";
  }

  return {

    totalHabits,

    completedHabits,

    completionRate,

    averageStreak,

    productivityLabel,
  };
}