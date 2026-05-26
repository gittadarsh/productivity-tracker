import { signInWithPopup, signOut } from "firebase/auth";

import {
  auth,
  provider,
  db,
} from "./firebase";

import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import { useState, useEffect } from "react";

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
    useState("");

  const [selectedMentor, setSelectedMentor] =
    useState("");

  const mentors = [
    {
      id: "mentor1",
      name: "Prof. Sharma",
    },
    {
      id: "mentor2",
      name: "Prof. Singh",
    },
  ];

  /* AUTO LOGIN */

  useEffect(() => {

    const savedUser =
      localStorage.getItem("user");

    if (savedUser) {

      setUser(JSON.parse(savedUser));
    }

  }, []);

  /* GOOGLE LOGIN */

  const handleGoogleLogin = async () => {

    try {

      if (!role) {

        alert(
          "Please select Student or Mentor first"
        );

        return;
      }

      if (
        role === "student" &&
        !selectedMentor
      ) {

        alert(
          "Please select a mentor"
        );

        return;
      }

      const result =
        await signInWithPopup(
          auth,
          provider
        );

      const loggedInUser =
        result.user;

      const userRef = doc(
        db,
        "users",
        loggedInUser.uid
      );

      const userSnap =
        await getDoc(userRef);

      if (!userSnap.exists()) {

        await setDoc(userRef, {

          uid: loggedInUser.uid,

          name:
            loggedInUser.displayName,

          email:
            loggedInUser.email,

          photo:
            loggedInUser.photoURL,

          role: role,

          mentorId:
            role === "student"
              ? selectedMentor
              : null,
        });
      }

      const userData = {
        uid: loggedInUser.uid,

        name:
          loggedInUser.displayName,

        email:
          loggedInUser.email,

        photo:
          loggedInUser.photoURL,

        role: role,

        mentorId:
          role === "student"
            ? selectedMentor
            : null,
      };

      setUser(userData);

      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );

    } catch (error) {

      console.log(error);
    }
  };

  /* LOGOUT */

  const handleLogout = async () => {

    await signOut(auth);

    localStorage.removeItem("user");

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

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

            <h1 className="text-5xl font-bold">

              🚀 Productivity Tracker

            </h1>

            <div className="flex items-center gap-4 flex-wrap">

              {/* ROLE BUTTONS */}

              {!user && (

                <div className="flex gap-3">

                  <button
                    onClick={() =>
                      setRole("student")
                    }
                    className={`px-5 py-3 rounded-xl font-semibold transition

                    ${
                      role === "student"
                        ? "bg-cyan-500"
                        : "bg-slate-700"
                    }`}
                  >
                    🎓 Student
                  </button>

                  <button
                    onClick={() =>
                      setRole("mentor")
                    }
                    className={`px-5 py-3 rounded-xl font-semibold transition

                    ${
                      role === "mentor"
                        ? "bg-green-500"
                        : "bg-slate-700"
                    }`}
                  >
                    👨‍🏫 Mentor
                  </button>

                </div>
              )}

              {/* MENTOR SELECT */}

              {
                role === "student" &&
                !user && (

                  <select
                    className="bg-slate-800 px-4 py-3 rounded-xl"
                    onChange={(e) =>
                      setSelectedMentor(
                        e.target.value
                      )
                    }
                  >

                    <option value="">
                      Select Mentor
                    </option>

                    {mentors.map((mentor) => (

                      <option
                        key={mentor.id}
                        value={mentor.id}
                      >
                        {mentor.name}
                      </option>

                    ))}

                  </select>
                )
              }

              {/* LOGIN */}

              {user ? (

                <div className="flex items-center gap-4">

                  <img
                    src={user.photo}
                    alt="profile"
                    className="w-12 h-12 rounded-full"
                  />

                  <div>

                    <p className="font-semibold">

                      {user.name}

                    </p>

                    <p className="text-sm text-slate-300">

                      {user.role}

                    </p>

                  </div>

                  <button
                    onClick={handleLogout}
                    className="bg-red-500 px-4 py-2 rounded-xl"
                  >
                    Logout
                  </button>

                </div>

              ) : (

                <button
                  onClick={
                    handleGoogleLogin
                  }
                  className="bg-blue-500 px-5 py-3 rounded-xl font-semibold hover:bg-blue-600 transition"
                >
                  Sign in with Google
                </button>

              )}

              {/* DARK MODE */}

              <button
                onClick={() =>
                  setDarkMode(!darkMode)
                }
                className="bg-slate-700 px-5 py-3 rounded-xl hover:bg-slate-600 transition"
              >
                {darkMode
                  ? "☀ Light"
                  : "🌙 Dark"}
              </button>

            </div>

          </div>

          {/* NAVBAR */}

          <div className="flex flex-wrap gap-8 mb-10 text-2xl font-semibold">

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

            {
              user?.role === "mentor" && (

                <Link
                  to="/mentor"
                  className="hover:text-green-400 transition"
                >
                  Mentor Dashboard
                </Link>
              )
            }

          </div>

          {/* ROUTES */}

          <Routes>

            <Route
              path="/"
              element={
                <Dashboard
                  user={user}
                />
              }
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
              element={
                <Achievements />
              }
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