export function calculateConsistency(completedGoals, totalGoals) {
  if (totalGoals === 0) return 0;

  return Math.round((completedGoals / totalGoals) * 100);
}

export function updateStreak(completedGoals, totalGoals, currentStreak) {
  const consistency = calculateConsistency(completedGoals, totalGoals);

  if (consistency >= 80) {
    return currentStreak + 1;
  }

  return 0;
}

export function getStreakStatus(streak) {
  if (streak >= 100) return "Legendary";
  if (streak >= 50) return "Elite";
  if (streak >= 20) return "Consistent";
  if (streak >= 7) return "Building";
  return "Starting";
}