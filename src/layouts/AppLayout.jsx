import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";

import ProductivityHeader from "../components/ProductivityHeader";

export default function AppLayout() {

  return (

    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">

      <Sidebar />

      <div className="min-h-screen">

        <div className="p-6 xl:p-8">

          <ProductivityHeader />

        </div>

        <Outlet />

      </div>

    </div>
  );
}