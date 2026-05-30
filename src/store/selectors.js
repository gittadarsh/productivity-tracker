export const selectCoreStats =
  state => ({

    xp: state.xp,

    sessions:
      state.sessions,

    streak:
      state.streak,

    score:
      state.score,

    level:
      state.level,
  });