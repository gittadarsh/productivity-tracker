import {
  Bell,
} from "lucide-react";

import {
  useProductivity,
} from "../context/ProductivityContext";

import {
  Link,
} from "react-router-dom";

export default function Topbar() {

  const productivity =
    useProductivity();

  return (

    <div className="sticky top-0 z-40 backdrop-blur-xl border-b border-white/10 bg-[#020617]/80">

      <div className="flex items-center justify-between px-4 md:px-8 py-4">

        {/* LEFT */}

        <div>

          <h1 className="text-2xl font-black">

            Productivity OS

          </h1>

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-3 md:gap-5">

          {/* XP */}

          <div className="hidden md:flex items-center gap-3 px-5 py-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">

            <span className="text-cyan-400">

              ⚡

            </span>

            <span className="font-bold">

              {productivity.xp} XP

            </span>

          </div>

          {/* STREAK */}

          <div className="hidden md:flex items-center gap-3 px-5 py-3 rounded-2xl bg-orange-500/10 border border-orange-500/20">

            <span>

              🔥

            </span>

            <span className="font-bold">

              {productivity.streak}

            </span>

          </div>

          {/* LEVEL */}

          <div className="px-5 py-3 rounded-2xl bg-purple-500/10 border border-purple-500/20">

            <span className="font-bold text-purple-400">

              LVL {productivity.level}

            </span>

          </div>

          {/* NOTIFICATIONS */}

          <Link
            to="/notifications"
            className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >

            <Bell size={20} />

          </Link>

          {/* PROFILE */}

          <Link
            to="/profile"
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center font-black text-lg"
          >

            P

          </Link>

        </div>

      </div>

    </div>
  );
}