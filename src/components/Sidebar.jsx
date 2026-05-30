import { NavLink } from "react-router-dom";

import {
  Home,
  Target,
  BarChart3,
  Trophy,
  Brain,
  User,
  Users,
  LogOut,
  X,
} from "lucide-react";

import {
  useUIStore,
} from "../store/uiStore";

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
    name: "Students",
    icon: Users,
    path: "/students",
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

        fixed top-0 left-0 z-50 h-screen w-[280px]

        bg-[#050816]

        border-r border-white/10

        overflow-hidden

        transition-all duration-300

        flex flex-col

        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }
        `}
      >

        {/* HEADER */}

        <div className="flex items-center justify-between p-6 border-b border-white/10">

          <div>

            <h1 className="text-3xl font-black leading-tight">

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
            onClick={closeSidebar}
            className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
          >

            <X size={18} />

          </button>

        </div>

        {/* PROFILE */}

        <div className="p-5 border-b border-white/10">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-2xl font-black">

              AK

            </div>

            <div>

              <h2 className="text-xl font-bold">

                Adarsh Kumar

              </h2>

              <p className="text-slate-400 text-sm mt-1">

                Productivity Student

              </p>

            </div>

          </div>

        </div>

        {/* NAVIGATION */}

        <div className="flex-1 overflow-y-auto p-4 space-y-3">

          {navItems.map((item) => {

            const Icon =
              item.icon;

            return (

              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
              >

                {({
                  isActive,
                }) => (

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

        <div className="p-4 border-t border-white/10">

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