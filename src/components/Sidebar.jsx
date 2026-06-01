import {
  NavLink,
} from "react-router-dom";

import {
  Home,
  Target,
  Bell,
  Brain,
  Users,
  BookOpen,
  LogOut,
} from "lucide-react";

const navItems = [
  {
    name: "Dashboard",
    icon: Home,
    path: "/dashboard",
  },

  {
    name: "Goals",
    icon: Target,
    path: "/goals",
  },

  {
    name: "Reminders",
    icon: Bell,
    path: "/notifications",
  },

  {
    name: "Mentor",
    icon: Brain,
    path: "/mentor",
  },

  {
    name: "Groups",
    icon: Users,
    path: "/groups",
  },

  {
    name: "Reflection",
    icon: BookOpen,
    path: "/reflection",
  },
];

export default function Sidebar() {

  return (

    <aside className="w-[280px] h-screen sticky top-0 border-r border-white/10 bg-[#0B1120] flex flex-col">

      {/* LOGO */}

      <div className="px-8 py-8 border-b border-white/10">

        <h1 className="text-4xl font-black">

          <span className="text-cyan-400">
            Growth
          </span>

          <span className="text-blue-500">
            OS
          </span>

        </h1>

        <p className="text-slate-400 mt-2 text-sm">

          Accountability System

        </p>

      </div>

      {/* PROFILE */}

      <div className="px-6 py-6 border-b border-white/10">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center font-black text-xl">

            AK

          </div>

          <div>

            <h2 className="font-bold text-lg">
              Adarsh Kumar
            </h2>

            <p className="text-slate-400 text-sm">

              Building Consistency

            </p>

          </div>

        </div>

      </div>

      {/* NAVIGATION */}

      <div className="flex-1 p-4 space-y-2 overflow-y-auto">

        {navItems.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.path}
              to={item.path}
            >

              {({ isActive }) => (

                <div
                  className={`
                    flex items-center gap-4
                    px-5 py-4
                    rounded-2xl
                    transition-all duration-200

                    ${
                      isActive
                        ? "bg-cyan-500/15 border border-cyan-500/20"
                        : "hover:bg-white/5"
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
                      font-semibold text-lg

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
  );
}