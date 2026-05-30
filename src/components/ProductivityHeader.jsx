import { Menu, Search, Sun } from "lucide-react";

import { useUIStore } from "../store/uiStore";

export default function ProductivityHeader() {

  const { toggleSidebar } = useUIStore();

  const currentHour = new Date().getHours();

  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (

    <div className="w-full rounded-[36px] border border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-500/5 backdrop-blur-2xl px-8 py-7 flex items-center justify-between">

      {/* LEFT */}

      <div className="flex items-center gap-6">

        {/* MENU */}

        <button
          onClick={toggleSidebar}
          className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center"
        >

          <Menu size={30} />

        </button>

        {/* PROFILE */}

        <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-3xl font-black">

          AK

        </div>

        {/* TEXT */}

        <div>

          <h1 className="text-5xl font-black leading-tight">

            {greeting},{" "}

            <span className="text-cyan-400">

              Adarsh

            </span>

          </h1>

          <p className="text-slate-400 text-2xl mt-1">

            Student Productivity Dashboard

          </p>

        </div>

      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-5">

        {/* TIME */}

        <div className="rounded-3xl bg-white/5 border border-white/10 px-8 py-5">

          <h2 className="text-3xl font-bold">

            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}

          </h2>

        </div>

        {/* SEARCH */}

        <button className="rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all px-8 py-5 flex items-center gap-4">

          <Search size={24} />

          <span className="text-2xl font-semibold">

            Search

          </span>

        </button>

        {/* THEME */}

        <button className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center">

          <Sun size={26} />

        </button>

      </div>

    </div>
  );
}