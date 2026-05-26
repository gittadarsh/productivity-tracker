import { signInWithPopup, signOut } from "firebase/auth";

import { auth, provider } from "./firebase";

import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import { db } from "./firebase";

import { useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Goals from "./pages/Goals";
import Analytics from "./pages/Analytics";
import Achievements from "./pages/Achievements";
import Heatmap from "./pages/Heatmap";
import Insights from "./pages/Insights";
import MentorDashboard from "./pages/MentorDashboard";
import StudentProgress from "./pages/StudentProgress";

export default function App() {

  const [darkMode, setDarkMode] =
    useState(true);

  const [user, setUser] =
    useState(null);

  const [role, setRole] =
    useState("student");

  const handleGoogleLogin =
    async () => {

      try {

        const result =
          await signInWithPopup(
            auth,
            provider
          );

        const loggedInUser =
          result.user;

        setUser(loggedInUser);

        const userRef =
          doc(
            db,
            "users",
            loggedInUser.uid
          );

        const userSnap =
          await getDoc(userRef);

        if (!userSnap.exists()) {

          await setDoc(userRef, {

            uid:
              loggedInUser.uid,

            name:
              loggedInUser.displayName,

            email:
              loggedInUser.email,

            role:
              role,

            mentorId:
              "",

            createdAt:
              new Date(),
          });
        }

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
        className={`min-h-screen px-6 py-8

        ${
          darkMode
            ? "bg-slate-950 text-white"
            : "bg-slate-100 text-black"
        }`}
      >

        <div className="max-w-7xl mx-auto">

          {/* TOP BAR */}

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

            <h1 className="text-5xl font-bold">

              🚀 Productivity Tracker

            </h1>

            <div className="flex flex-wrap items-center gap-4">

              {!user && (

                <div className="flex gap-3">

                  <button
                    onClick={() =>
                      setRole("student")
                    }

                    className={`px-5 py-3 rounded-xl font-bold

                    ${
                      role === "student"

                        ? "bg-cyan-500"

                        : "bg-slate-700"
                    }`}
                  >

                    👨‍🎓 Student

                  </button>

                  <button
                    onClick={() =>
                      setRole("mentor")
                    }

                    className={`px-5 py-3 rounded-xl font-bold

                    ${
                      role === "mentor"

                        ? "bg-yellow-500"

                        : "bg-slate-700"
                    }`}
                  >

                    👨‍🏫 Mentor

                  </button>

                </div>
              )}

              {user ? (

                <div className="flex items-center gap-4">

                  <img
                    src={user.photoURL}
                    alt="profile"

                    className="w-12 h-12 rounded-full"
                  />

                  <div>

                    <p className="font-bold">
                      {user.displayName}
                    </p>

                    <p className="text-sm text-slate-400">
                      {role}
                    </p>

                    <button
                      onClick={handleLogout}

                      className="bg-red-500 px-4 py-2 rounded-xl mt-2"
                    >

                      Logout

                    </button>

                  </div>

                </div>

              ) : (

                <button
                  onClick={
                    handleGoogleLogin
                  }

                  className="bg-blue-500 px-5 py-3 rounded-xl font-bold"
                >

                  Sign in with Google

                </button>

              )}

              <button
                onClick={() =>
                  setDarkMode(
                    !darkMode
                  )
                }

                className="bg-slate-700 px-5 py-3 rounded-xl"
              >

                {darkMode
                  ? "☀ Light"
                  : "🌙 Dark"}

              </button>

            </div>

          </div>

          {/* NAVIGATION */}

          <div className="flex flex-wrap gap-8 mb-10 text-2xl font-semibold">

            <Link to="/">
              Dashboard
            </Link>

            <Link to="/goals">
              Goals
            </Link>

            <Link to="/analytics">
              Analytics
            </Link>

            <Link to="/achievements">
              Achievements
            </Link>

            <Link to="/heatmap">
              Heatmap
            </Link>

            <Link to="/insights">
              AI Insights
            </Link>

            <Link to="/mentor">
              Mentor Dashboard
            </Link>

          </div>

          {/* ROUTES */}

          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/goals"
              element={<Goals />}
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
              path="/heatmap"
              element={<Heatmap />}
            />

            <Route
              path="/insights"
              element={<Insights />}
            />

            <Route
              path="/mentor"
              element={
                <MentorDashboard />
              }
            />

            <Route
              path="/student/:uid"
              element={
                <StudentProgress />
              }
            />

          </Routes>

        </div>

      </div>

    </BrowserRouter>
  );
}