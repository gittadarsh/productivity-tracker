export function generateLeaderboard(
  users
) {

  return users

    .sort((a, b) => {

      return (
        (b.xp || 0) -
        (a.xp || 0)
      );
    })

    .map(
      (
        user,
        index
      ) => ({

        ...user,

        rank:
          index + 1,
      })
    );
}