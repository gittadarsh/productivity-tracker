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

        duration: 0.4,
      }}

      className={`

      fixed top-0 left-0 z-50

      h-screen w-[290px]

      backdrop-blur-2xl

      bg-slate-900/80

      border-r border-white/10

      shadow-2xl

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

        <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

          🚀 Tracker

        </h1>

        <p className="text-slate-400 mt-3 text-lg">

          AI Productivity SaaS

        </p>

      </div>

      {/* USER */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-5 mb-8">

        <div className="flex items-center gap-4">

          <img
            src={
              user?.photo ||

              `https://ui-avatars.com/api/?name=${user?.name}&background=06b6d4&color=fff`
            }

            alt="profile"

            className="w-16 h-16 rounded-2xl border-2 border-cyan-400 object-cover"
          />

          <div>

            <h2 className="font-bold text-xl">

              {user?.name}

            </h2>

            <p className="text-slate-400 capitalize">

              {user?.role}

            </p>

          </div>

        </div>

      </div>

      {/* NAVIGATION */}

      <div className="space-y-3">

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

                  scale: 1.02,
                }}

                whileTap={{

                  scale: 0.98,
                }}

                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300

                ${
                  active

                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-black shadow-xl"

                    : "hover:bg-white/5 text-white"
                }`}
              >

                <span className="text-2xl">

                  {link.icon}

                </span>

                <span className="font-semibold text-lg">

                  {link.name}

                </span>

              </motion.div>

            </Link>
          );
        })}

      </div>

      {/* MENTOR LINKS */}

      {
        user?.role ===
        "mentor" && (

          <div className="mt-10">

            <h3 className="text-slate-400 uppercase text-sm tracking-widest mb-4">

              Mentor Tools

            </h3>

            <div className="space-y-3">

              <Link
                to="/mentor"
              >

                <div className="px-5 py-4 rounded-2xl hover:bg-cyan-500/10 transition flex items-center gap-4">

                  <span className="text-2xl">

                    👨‍🏫

                  </span>

                  <span className="font-semibold text-lg">

                    Mentor Dashboard

                  </span>

                </div>

              </Link>

              <Link
                to="/create-sheet"
              >

                <div className="px-5 py-4 rounded-2xl hover:bg-cyan-500/10 transition flex items-center gap-4">

                  <span className="text-2xl">

                    📝

                  </span>

                  <span className="font-semibold text-lg">

                    Create Sheet

                  </span>

                </div>

              </Link>

            </div>

          </div>
        )
      }

      {/* LOGOUT */}

      <div className="absolute bottom-6 left-6 right-6">

        <button
          onClick={
            handleLogout
          }

          className="w-full bg-red-500/90 hover:bg-red-500 transition py-4 rounded-2xl font-bold text-lg shadow-xl"
        >

          Logout

        </button>

      </div>

    </motion.div>
  );
}