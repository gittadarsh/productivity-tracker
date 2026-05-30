import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";

import Habits from "./pages/Habits";

import Analytics from "./pages/Analytics";

import Achievements from "./pages/Achievements";

import FocusMode from "./pages/FocusMode";

import Profile from "./pages/Profile";

import AppLayout from "./layouts/AppLayout";

export default function App() {

  return (

    <Routes>

      {/* DEFAULT ROUTE */}

      <Route
        path="/"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />

      {/* MAIN APP LAYOUT */}

      <Route element={<AppLayout />}>

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/habits"
          element={<Habits />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/achievements"
          element={<Achievements />}
        />

        <Route
          path="/focus"
          element={<FocusMode />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

      </Route>

      {/* FALLBACK */}

      <Route
        path="*"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />

    </Routes>
  );
}