import {

  Link,

} from "react-router-dom";

export default function Sidebar({

  user,

  mobileMenu,

}) {

  return (

    <div
      className={`

      fixed md:static top-0 left-0 z-50

      h-screen

      w-[260px]

      bg-slate-900 border-r border-slate-800

      p-6

      transition-transform duration-300

      ${
        mobileMenu

          ? "translate-x-0"

          : "-translate-x-full md:translate-x-0"
      }
    `}
    >

      <div className="mb-10">

        <h1 className="text-3xl font-bold text-cyan-400">

          🚀 Tracker

        </h1>

        <p className="text-slate-400 mt-2">

          AI Productivity Platform

        </p>

      </div>

      <div className="flex flex-col gap-3 text-lg font-semibold">

        <Link
          to="/"

          className="hover:bg-slate-800 px-4 py-3 rounded-xl transition"
        >
          🏠 Dashboard
        </Link>

        <Link
          to="/goals"

          className="hover:bg-slate-800 px-4 py-3 rounded-xl transition"
        >
          🎯 Goals
        </Link>

        <Link
          to="/analytics"

          className="hover:bg-slate-800 px-4 py-3 rounded-xl transition"
        >
          📈 Analytics
        </Link>

        <Link
          to="/achievements"

          className="hover:bg-slate-800 px-4 py-3 rounded-xl transition"
        >
          🏆 Achievements
        </Link>

        <Link
          to="/heatmap"

          className="hover:bg-slate-800 px-4 py-3 rounded-xl transition"
        >
          🔥 Heatmap
        </Link>

        <Link
          to="/insights"

          className="hover:bg-slate-800 px-4 py-3 rounded-xl transition"
        >
          🤖 AI Insights
        </Link>

        <Link
          to="/leaderboard"

          className="hover:bg-slate-800 px-4 py-3 rounded-xl transition"
        >
          🥇 Leaderboard
        </Link>

        <Link
          to="/questions"

          className="hover:bg-slate-800 px-4 py-3 rounded-xl transition"
        >
          📚 Question Sheets
        </Link>

        <Link
          to="/planner"

          className="hover:bg-slate-800 px-4 py-3 rounded-xl transition"
        >
          🧠 AI Planner
        </Link>

        <Link
          to="/chat"

          className="hover:bg-slate-800 px-4 py-3 rounded-xl transition"
        >
          💬 Chat
        </Link>

        {
          user?.role ===
          "mentor" && (

            <>
              <Link
                to="/mentor"

                className="hover:bg-cyan-500/20 text-cyan-400 px-4 py-3 rounded-xl transition"
              >
                👨‍🏫 Mentor Dashboard
              </Link>

              <Link
                to="/create-sheet"

                className="hover:bg-cyan-500/20 text-cyan-400 px-4 py-3 rounded-xl transition"
              >
                📝 Create Sheet
              </Link>
            </>
          )
        }

      </div>

    </div>
  );
}