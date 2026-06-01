import {
  Outlet,
} from "react-router-dom";

import Sidebar from "../components/Sidebar";

export default function Layout() {

  return (

    <div className="min-h-screen bg-[#050816] text-white flex">

      {/* SIDEBAR */}

      <div className="hidden lg:flex">

        <Sidebar />

      </div>

      {/* MOBILE SIDEBAR */}

      <div className="lg:hidden">

        <Sidebar />

      </div>

      {/* MAIN CONTENT */}

      <main className="flex-1 lg:ml-[280px] overflow-x-hidden">

        <div className="p-6 md:p-8 max-w-[1600px] mx-auto">

          <Outlet />

        </div>

      </main>

    </div>
  );
}