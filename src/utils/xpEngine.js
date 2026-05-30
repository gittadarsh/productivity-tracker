export function calculateXP(
  habits
) {

  let xp = 0;

  habits.forEach((habit) => {

    if (habit.completed) {

      xp += 25;
    }

    xp += habit.streak * 5;
  });

  return xp;
}