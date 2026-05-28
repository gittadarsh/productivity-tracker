import {

  Link,
  useLocation,

} from "react-router-dom";

import {

  motion,

} from "framer-motion";

export default function Sidebar({

  user,

  mobileMenu,

  setMobileMenu,

  handleLogout,

}) {

  const location =
    useLocation();

  const links = [

    {
      name:
        "Dashboard",

      path:
        "/dashboard",

      icon:
        "🏠",
    },

    {
      name:
        "Goals",

      path:
        "/goals",

      icon:
        "🎯",
    },

    {
      name:
        "Analytics",

      path:
        "/analytics",

      icon:
        "📊",
    },

    {
      name:
        "Achievements",

      path:
        "/achievements",

      icon:
        "🏆",
    },

    {
      name:
        "Heatmap",

      path:
        "/heatmap",

      icon:
        "🔥",
    },

    {
      name:
        "AI Insights",

      path:
        "/insights",

      icon:
        "🤖",
    },

    {
      name:
        "Leaderboard",

      path:
        "/leaderboard",

      icon:
        "🥇",
    },

    {
      name:
        "Question Sheets",

      path:
        "/questions",

      icon:
        "📚",
    },

    {
      name:
        "AI Planner",

      path:
        "/planner",

      icon:
        "🧠",
    },

    {
      name:
        "Chat",

      path:
        "/chat",

      icon:
        "💬",
    },
  ];

  return (

    <motion.div

      initial={{

        x: -100,

        opacity: 0,
      }}

      animate={{

        x: 0,

        opacity: 1,
      }}

      transition={{

        duration: 0.35,
      }}

      className={`

      fixed top-0 left-0 z-50

      h-screen w-[250px]

      backdrop-blur-2xl

      bg-slate-900/85

      border-r border-white/10

      shadow-2xl

      transition-transform duration-300

      flex flex-col

      ${
        mobileMenu

          ? "translate-x-0"

          : "-translate-x-full md:translate-x-0"
      }
    `}
    >

      {/* TOP */}

      <div className="p-5 border-b border-white/5">

        {/* LOGO */}

        <div className="mb-8">

          <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

            🚀 Tracker

          </h1>

          <p className="text-slate-400 mt-2 text-sm">

            AI Productivity SaaS

          </p>

        </div>

        {/* USER */}

        <div className="bg-white/5 border border-white/10 rounded-3xl p-4">

          <div className="flex items-center gap-3">

            <img
              src={
                user?.photo ||

                `https://ui-avatars.com/api/?name=${user?.name}&background=06b6d4&color=fff`
              }

              alt="profile"

              className="w-14 h-14 rounded-2xl border-2 border-cyan-400 object-cover"
            />

            <div className="min-w-0">

              <h2 className="font-bold text-lg truncate">

                {user?.name}

              </h2>

              <p className="text-slate-400 capitalize text-sm">

                {user?.role}

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* NAVIGATION */}

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">

        <div className="space-y-2">

          {links.map((link) => {

            const active =
              location.pathname ===
              link.path;

            return (

              <Link
                key={link.path}

                to={link.path}

                onClick={() =>
                  setMobileMenu(
                    false
                  )
                }
              >

                <motion.div

                  whileHover={{

                    scale: 1.015,
                  }}

                  whileTap={{

                    scale: 0.98,
                  }}

                  className={`

                  flex items-center gap-4

                  px-4 py-3

                  rounded-2xl

                  transition-all duration-300

                  ${
                    active

                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-black shadow-lg"

                      : "hover:bg-white/5 text-white"
                  }`}
                >

                  <span className="text-xl">

                    {link.icon}

                  </span>

                  <span className="font-semibold text-[15px]">

                    {link.name}

                  </span>

                </motion.div>

              </Link>
            );
          })}

        </div>

        {/* MENTOR */}

        {
          user?.role ===
          "mentor" && (

            <div className="mt-8">

              <h3 className="text-slate-500 uppercase text-xs tracking-[3px] mb-4">

                Mentor Tools

              </h3>

              <div className="space-y-2">

                <Link
                  to="/mentor"
                >

                  <div className="px-4 py-3 rounded-2xl hover:bg-cyan-500/10 transition flex items-center gap-4">

                    <span className="text-xl">

                      👨‍🏫

                    </span>

                    <span className="font-semibold text-[15px]">

                      Mentor Dashboard

                    </span>

                  </div>

                </Link>

                <Link
                  to="/create-sheet"
                >

                  <div className="px-4 py-3 rounded-2xl hover:bg-cyan-500/10 transition flex items-center gap-4">

                    <span className="text-xl">

                      📝

                    </span>

                    <span className="font-semibold text-[15px]">

                      Create Sheet

                    </span>

                  </div>

                </Link>

              </div>

            </div>
          )
        }

      </div>

      {/* LOGOUT */}

      <div className="p-4 border-t border-white/5 bg-slate-900/90">

        <button
          onClick={
            handleLogout
          }

          className="w-full bg-red-500 hover:bg-red-600 transition py-3 rounded-2xl font-bold shadow-xl"
        >

          Logout

        </button>

      </div>

    </motion.div>
  );
}