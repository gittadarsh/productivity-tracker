import { signInWithPopup, signOut } from "firebase/auth";

import { auth, provider } from "./firebase";

import { useState } from "react";
import Heatmap from "./pages/Heatmap";
import Achievements from "./pages/Achievements";
import Insights from "./pages/Insights";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Goals from "./pages/Goals";
import Analytics from "./pages/Analytics";

export default function App() {

  const [darkMode, setDarkMode] = useState(true);

  const [user, setUser] = useState(null);

  const handleGoogleLogin = async () => {

    try {

      const result =
        await signInWithPopup(auth, provider);

      setUser(result.user);

    } catch (error) {

      console.log(error);

    }
  };

  const handleLogout = async () => {

    await signOut(auth);

    setUser(null);

  };

  return (

    <BrowserRouter>

      <div
        className={`min-h-screen px-6 py-8 transition duration-300
        ${
          darkMode
            ? "bg-slate-950 text-white"
            : "bg-slate-100 text-black"
        }`}
      >

        {/* MAIN CONTAINER */}

        <div className="max-w-7xl mx-auto">

          {/* NAVBAR */}

          <div className="flex items-center justify-between mb-10">

            <h1 className="text-5xl font-bold">
              🚀 Productivity Tracker
            </h1>

            <div className="flex items-center gap-4">

              {user ? (

                <div className="flex items-center gap-3">

                  <img
                    src={user.photoURL}
                    alt="profile"
                    className="w-12 h-12 rounded-full"
                  />

                  <div>

                    <p className="font-semibold">
                      {user.displayName}
                    </p>

                    <button
                      onClick={handleLogout}
                      className="bg-red-500 px-4 py-2 rounded-xl"
                    >
                      Logout
                    </button>

                  </div>

                </div>

              ) : (

                <button
                  onClick={handleGoogleLogin}
                  className="bg-blue-500 px-5 py-3 rounded-xl font-semibold hover:bg-blue-600 transition"
                >
                  Sign in with Google
                </button>

              )}

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="bg-slate-700 px-5 py-3 rounded-xl hover:bg-slate-600 transition"
              >
                {darkMode ? "☀ Light" : "🌙 Dark"}
              </button>

            </div>

          </div>

          {/* NAVIGATION */}

          <div className="flex gap-8 mb-10 text-2xl font-semibold">

            <Link
              to="/"
              className="hover:text-cyan-400 transition"
            >
              Dashboard
            </Link>

            <Link
              to="/goals"
              className="hover:text-cyan-400 transition"
            >
              Goals
            </Link>

            <Link
              to="/analytics"
              className="hover:text-cyan-400 transition"
            >
              Analytics
            </Link>
            <Link
  to="/achievements"
  className="hover:text-cyan-400 transition"
>
  Achievements
</Link>
<Link
  to="/heatmap"
  className="hover:text-cyan-400 transition"
>
  Heatmap
</Link>
<Link
  to="/insights"
  className="hover:text-cyan-400 transition"
>
  AI Insights
</Link>

          </div>

          {/* ROUTES */}

          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />
             <Route
  path="/achievements"
  element={<Achievements />}
/>
<Route
  path="/heatmap"
  element={<Heatmap />}
/>
<Route
  path="/insights"
  element={<Insights />}
/>
            <Route
              path="/goals"
              element={<Goals />}
            />

            <Route
              path="/analytics"
              element={<Analytics />}
            />

          </Routes>

        </div>

      </div>

    </BrowserRouter>
  );
}