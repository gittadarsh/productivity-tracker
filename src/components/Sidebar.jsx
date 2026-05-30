import { NavLink } from "react-router-dom";

import {
  Home,
  Target,
  BarChart3,
  Trophy,
  Brain,
  User,
  LogOut,
  X,
} from "lucide-react";

import { useUIStore } from "../store/uiStore";

const navItems = [

  {
    name: "Dashboard",
    icon: Home,
    path: "/dashboard",
  },

  {
    name: "Habits",
    icon: Target,
    path: "/habits",
  },

  {
    name: "Analytics",
    icon: BarChart3,
    path: "/analytics",
  },

  {
    name: "Achievements",
    icon: Trophy,
    path: "/achievements",
  },

  {
    name: "Focus",
    icon: Brain,
    path: "/focus",
  },

  {
    name: "Profile",
    icon: User,
    path: "/profile",
  },
];

export default function Sidebar() {

  const {
    sidebarOpen,
    toggleSidebar,
    closeSidebar,
  } = useUIStore();

  return (
    <>
      {/* OVERLAY */}

      {sidebarOpen && (

        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`

        fixed top-0 left-0 z-50 h-screen w-[320px]

        bg-[#050816]

        border-r border-white/10

        transition-all duration-300

        flex flex-col

        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >

        {/* HEADER */}

        <div className="flex items-center justify-between p-6 border-b border-white/10">

          <div>

            <h1 className="text-4xl font-black">

              <span className="text-cyan-400">

                Productivity

              </span>

              <span className="text-blue-500">

                OS

              </span>

            </h1>

            <p className="text-slate-400 text-sm mt-2">

              Intelligence Platform

            </p>

          </div>

          <button
            onClick={toggleSidebar}
            className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center"
          >

            <X size={20} />

          </button>

        </div>

        {/* PROFILE */}

        <div className="p-6 border-b border-white/10">

          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-3xl font-black">

              AK

            </div>

            <div>

              <h2 className="text-2xl font-bold">

                Adarsh

              </h2>

              <p className="text-slate-400">

                Student

              </p>

            </div>

          </div>

          {/* STATS */}

          <div className="grid grid-cols-2 gap-3 mt-6">

            <div className="rounded-2xl bg-cyan-500/10 border border-cyan-500/20 p-4">

              <p className="text-xs uppercase tracking-wider text-slate-400">

                Level

              </p>

              <h2 className="text-2xl font-black text-cyan-400 mt-2">

                1

              </h2>

            </div>

            <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-4">

              <p className="text-xs uppercase tracking-wider text-slate-400">

                XP

              </p>

              <h2 className="text-2xl font-black text-purple-400 mt-2">

                0

              </h2>

            </div>

          </div>

        </div>

        {/* NAVIGATION */}

        <div className="flex-1 overflow-y-auto p-5 space-y-3">

          {navItems.map((item) => {

            const Icon = item.icon;

            return (

              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
              >

                {({ isActive }) => (

                  <div
                    className={`

                    flex items-center gap-4

                    rounded-2xl

                    px-5 py-4

                    transition-all duration-200

                    ${
                      isActive
                        ? "bg-cyan-500/15 border border-cyan-500/20"
                        : "hover:bg-white/5 border border-transparent"
                    }
                    `}
                  >

                    <Icon
                      size={22}
                      className={
                        isActive
                          ? "text-cyan-400"
                          : "text-slate-400"
                      }
                    />

                    <span
                      className={`

                      text-lg font-semibold

                      ${
                        isActive
                          ? "text-cyan-300"
                          : "text-white"
                      }
                      `}
                    >

                      {item.name}

                    </span>

                  </div>

                )}

              </NavLink>
            );
          })}

        </div>

        {/* FOOTER */}

        <div className="p-5 border-t border-white/10">

          <button className="w-full rounded-2xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all py-4 flex items-center justify-center gap-3">

            <LogOut
              size={20}
              className="text-red-400"
            />

            <span className="text-red-400 font-semibold">

              Logout

            </span>

          </button>

        </div>

      </aside>
    </>
  );
}