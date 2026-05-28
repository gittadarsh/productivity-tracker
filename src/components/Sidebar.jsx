const studentLinks = [

  {
    name: "Dashboard",
    path: "/dashboard",
    icon: "🏠",
  },

  {
    name: "Habits",
    path: "/habits",
    icon: "⚡",
  },

  {
    name: "Assigned Goals",
    path: "/assigned-goals",
    icon: "🎯",
  },

  {
    name: "Analytics",
    path: "/analytics",
    icon: "📈",
  },

  {
    name: "Heatmap",
    path: "/heatmap",
    icon: "🔥",
  },

  {
    name: "Leaderboard",
    path: "/leaderboard",
    icon: "🏆",
  },

  {
    name: "Notifications",
    path: "/notifications",
    icon: "🔔",
  },
];

const mentorLinks = [

  {
    name: "Mentor Dashboard",
    path: "/mentor",
    icon: "🧠",
  },

  {
    name: "Assign Goals",
    path: "/assign-goals",
    icon: "🚀",
  },

  {
    name: "Leaderboard",
    path: "/leaderboard",
    icon: "🏆",
  },

  {
    name: "Notifications",
    path: "/notifications",
    icon: "🔔",
  },
];

const links =

  user?.role === "mentor"

    ? mentorLinks

    : studentLinks;