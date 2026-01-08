import React from "react";
import Navigation from "../components/navigation";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      <div className="flex-1 overflow-y-auto lg:ml-0">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
