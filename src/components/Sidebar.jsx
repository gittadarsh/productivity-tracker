import { NavLink } from "react-router-dom";

import { motion } from "framer-motion";

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
  } = useUIStore();

  return (
    <>
      {/* MOBILE OVERLAY */}

      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}

      <motion.aside
        initial={{
          x: -100,
          opacity: 0,
        }}

        animate={{
          x: sidebarOpen ? 0 : -420,
          opacity: 1,
        }}

        transition={{
          duration: 0.3,
        }}

        className="fixed top-0 left-0 z-50 h-screen w-[360px] bg-[#050816]/95 border-r border-white/10 backdrop-blur-2xl flex flex-col"
      >

        {/* HEADER */}

        <div className="p-8 border-b border-white/10">

          <div className="flex items-start justify-between gap-4">

            <div>

              <h1 className="text-3xl xl:text-4xl font-black leading-tight">

                <span className="text-cyan-400">
                  Productivity
                </span>

                <span className="text-blue-500">
                  OS
                </span>

              </h1>

              <p className="text-slate-400 text-base mt-2">

                Productivity Intelligence Platform

              </p>

            </div>

            <button
              onClick={toggleSidebar}
              className="w-12 h-12 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all"
            >

              <X size={22} />

            </button>

          </div>

        </div>

        {/* PROFILE */}

        <div className="p-7 border-b border-white/10">

          <div className="flex items-center gap-5">

            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-4xl font-black">

              AK

            </div>

            <div>

              <h2 className="text-3xl font-black">

                Adarsh Kumar

              </h2>

              <p className="text-slate-400 text-lg mt-1">

                Student

              </p>

            </div>

          </div>

          {/* STATS */}

          <div className="grid grid-cols-2 gap-4 mt-8">

            <div className="rounded-3xl bg-cyan-500/10 border border-cyan-500/20 p-5">

              <p className="text-sm uppercase tracking-wide text-slate-400">

                Level

              </p>

              <h2 className="text-3xl font-black text-cyan-400 mt-3">

                1

              </h2>

            </div>

            <div className="rounded-3xl bg-purple-500/10 border border-purple-500/20 p-5">

              <p className="text-sm uppercase tracking-wide text-slate-400">

                XP

              </p>

              <h2 className="text-3xl font-black text-purple-400 mt-3">

                0

              </h2>

            </div>

          </div>

        </div>

        {/* NAVIGATION */}

        <div className="flex-1 overflow-y-auto p-6 space-y-4">

          {navItems.map((item) => {

            const Icon = item.icon;

            return (

              <NavLink
                key={item.path}
                to={item.path}
              >

                {({ isActive }) => (

                  <motion.div
                    whileHover={{
                      scale: 1.02,
                    }}

                    whileTap={{
                      scale: 0.98,
                    }}

                    className={`
                      flex items-center gap-5 rounded-3xl px-6 py-5 transition-all duration-300
                      ${
                        isActive
                          ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/20"
                          : "bg-white/[0.03] border border-white/5 hover:bg-white/[0.06]"
                      }
                    `}
                  >

                    <Icon
                      size={28}
                      className={
                        isActive
                          ? "text-cyan-400"
                          : "text-slate-400"
                      }
                    />

                    <span
                      className={`
                        text-xl font-semibold
                        ${
                          isActive
                            ? "text-cyan-300"
                            : "text-white"
                        }
                      `}
                    >

                      {item.name}

                    </span>

                  </motion.div>

                )}

              </NavLink>
            );
          })}

        </div>

        {/* FOOTER */}

        <div className="p-6 border-t border-white/10">

          <button className="w-full rounded-3xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-all px-6 py-5 flex items-center justify-center gap-4">

            <LogOut
              size={24}
              className="text-red-400"
            />

            <span className="text-xl font-semibold text-red-400">

              Logout

            </span>

          </button>

        </div>

      </motion.aside>

    </>
  );
}