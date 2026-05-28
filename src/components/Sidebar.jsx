import {
  NavLink,
} from "react-router-dom";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

export default function Sidebar({

  user,
  mobileMenu,
  setMobileMenu,
  handleLogout,

}) {

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

  return (

    <AnimatePresence>

      {mobileMenu && (

        <>

          {/* OVERLAY */}

          <motion.div

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            exit={{
              opacity: 0,
            }}

            onClick={() =>
              setMobileMenu(false)
            }

            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* SIDEBAR */}

          <motion.div

            initial={{
              x: -320,
            }}

            animate={{
              x: 0,
            }}

            exit={{
              x: -320,
            }}

            transition={{
              type: "spring",
              stiffness: 260,
              damping: 26,
            }}

            className="fixed top-0 left-0 z-50 h-screen w-[300px] bg-[#020617]/95 backdrop-blur-2xl border-r border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.7)]"
          >

            <div className="flex flex-col h-full">

              {/* TOP */}

              <div className="p-7 border-b border-white/10">

                <div className="flex items-center justify-between">

                  <div>

                    <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                      ProductivityOS

                    </h1>

                    <p className="text-slate-400 text-sm mt-2">

                      Elite Productivity Platform

                    </p>

                  </div>

                  <button
                    onClick={() =>
                      setMobileMenu(false)
                    }
                    className="w-11 h-11 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 flex items-center justify-center text-xl"
                  >

                    ✕

                  </button>

                </div>

              </div>

              {/* USER */}

              <div className="p-6 border-b border-white/10">

                <div className="flex items-center gap-4">

                  <img
                    src={
                      user?.photo ||

                      `https://ui-avatars.com/api/?name=${user?.name}`
                    }
                    alt="profile"
                    className="w-16 h-16 rounded-2xl object-cover border border-white/10"
                  />

                  <div>

                    <h2 className="font-black text-xl">

                      {user?.name}

                    </h2>

                    <p className="text-slate-400 capitalize mt-1">

                      {user?.role}

                    </p>

                  </div>

                </div>

              </div>

              {/* LINKS */}

              <div className="flex-1 overflow-y-auto p-5 space-y-3">

                {links.map((link) => (

                  <NavLink
                    key={link.path}
                    to={link.path}

                    onClick={() => {

                      setMobileMenu(false);

                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });

                    }}

                    className={({ isActive }) =>

                      `

                      flex items-center gap-4

                      px-5 py-4

                      rounded-2xl

                      transition-all duration-300

                      border

                      ${
                        isActive

                          ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-300"

                          : "bg-white/5 border-white/5 hover:bg-white/10 text-slate-300"
                      }`
                    }
                  >

                    <span className="text-2xl">

                      {link.icon}

                    </span>

                    <span className="font-semibold">

                      {link.name}

                    </span>

                  </NavLink>

                ))}

              </div>

              {/* LOGOUT */}

              <div className="p-5 border-t border-white/10">

                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 py-4 rounded-2xl font-bold transition-all duration-300"
                >

                  Logout

                </button>

              </div>

            </div>

          </motion.div>

        </>

      )}

    </AnimatePresence>
  );
}