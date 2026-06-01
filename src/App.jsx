import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./layouts/Layout";

import Dashboard from "./pages/Dashboard";
import Goals from "./pages/Goals";
import Notifications from "./pages/Notifications";
import MentorDashboard from "./pages/MentorDashboard";

export default function App() {

  return (

    <Routes>

      <Route element={<Layout />}>

        <Route
          path="/"
          element={
            <Navigate to="/dashboard" />
          }
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/goals"
          element={<Goals />}
        />

        <Route
          path="/notifications"
          element={<Notifications />}
        />

        <Route
          path="/mentor"
          element={<MentorDashboard />}
        />

      </Route>

    </Routes>
  );
}