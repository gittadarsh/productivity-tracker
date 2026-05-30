import {
  Menu,
  Search,
  Sun,
} from "lucide-react";

import {
  useUIStore,
} from "../store/uiStore";

export default function ProductivityHeader() {

  const { toggleSidebar } =
    useUIStore();

  const currentHour =
    new Date().getHours();

  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (

    <div className="w-full rounded-[36px] border border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-500/5 backdrop-blur-2xl px-6 xl:px-8 py-6 flex items-center justify-between">

      {/* LEFT */}

      <div className="flex items-center gap-5">

        <button
          onClick={toggleSidebar}
          className="w-14 h-14 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center"
        >

          <Menu size={28} />

        </button>

        <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-2xl font-black">

          AK

        </div>

        <div>

          <h1 className="text-3xl xl:text-4xl font-black leading-tight">

            {greeting},{" "}

            <span className="text-cyan-400">

              Adarsh

            </span>

          </h1>

          <p className="text-slate-400 text-lg mt-1">

            Student Dashboard

          </p>

        </div>

      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-4">

        <div className="rounded-3xl bg-white/5 border border-white/10 px-6 py-4">

          <h2 className="text-2xl font-bold">

            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}

          </h2>

        </div>

        <button className="rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all px-6 py-4 flex items-center gap-3">

          <Search size={22} />

          <span className="text-xl font-semibold">

            Search

          </span>

        </button>

        <button className="w-14 h-14 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center">

          <Sun size={24} />

        </button>

      </div>

    </div>
  );
}