import {

  Link,

} from "react-router-dom";

export default function Sidebar({

  user,

  mobileMenu,

  setMobileMenu,

}) {

  return (

    <div
      className={`

      fixed md:static top-0 left-0 z-50

      h-screen md:h-auto

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

      {/* LOGO */}

      <div className="mb-10">

        <h1 className="text-3xl font-bold text-cyan-400">

          🚀 Tracker

        </h1>

        <p className="text-slate-400 mt-2">

          AI Productivity Platform

        </p>

      </div>

      {/* NAVIGATION */}

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

      {/* USER */}

      {
        user && (

          <div className="absolute bottom-8 left-6 right-6">

            <div className="bg-slate-800 p-4 rounded-2xl">

              <div className="flex items-center gap-3">

                <img
                  src={
                    user?.photo ||

                    `https://ui-avatars.com/api/?name=${user?.name}&background=06b6d4&color=fff`
                  }

                  alt="profile"

                  className="w-12 h-12 rounded-full border-2 border-cyan-400"
                />

                <div>

                  <p className="font-bold">

                    {user.name}

                  </p>

                  <p className="text-sm text-slate-400 capitalize">

                    {user.role}

                  </p>

                </div>

              </div>

            </div>

          </div>
        )
      }

    </div>
  );
}