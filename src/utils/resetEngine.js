export function resetDailyHabits(
  habits
) {

  const today =
    new Date().toDateString();

  const lastReset =
    localStorage.getItem(
      "lastReset"
    );

  if (lastReset === today) {

    return habits;
  }

  const resetHabits =
    habits.map((habit) => ({

      ...habit,

      completed: false,
    }));

  localStorage.setItem(
    "lastReset",
    today
  );

  localStorage.setItem(
    "habits",
    JSON.stringify(resetHabits)
  );

  return resetHabits;
}