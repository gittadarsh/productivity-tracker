export function generateDailyMissions(
  habits
) {

  const completed =
    habits.filter(
      (habit) =>
        habit.completed
    ).length;

  return [

    {
      id: 1,

      title:
        "Complete 3 habits",

      completed:
        completed >= 3,

      xp: 50,
    },

    {
      id: 2,

      title:
        "Reach 5 day streak",

      completed:
        habits.some(
          (habit) =>
            habit.streak >= 5
        ),

      xp: 100,
    },

    {
      id: 3,

      title:
        "Complete all habits",

      completed:
        habits.length > 0 &&
        completed ===
          habits.length,

      xp: 150,
    },
  ];
}