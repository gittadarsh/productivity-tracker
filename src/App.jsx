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

import {
  useState,
  useEffect,
} from "react";

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
import Leaderboard from "./pages/Leaderboard";
import QuestionSheets from "./pages/QuestionSheets";
import CreateSheet from "./pages/CreateSheet";
import StudyPlanner from "./pages/StudyPlanner";

export default function App() {

  const [darkMode, setDarkMode] =
    useState(true);

  const [user, setUser] =
    useState(null);

  const [role, setRole] =
    useState("");

  const [
    selectedMentor,
    setSelectedMentor
  ] = useState("");

  const [
    mobileMenu,
    setMobileMenu
  ] = useState(false);

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

      setUser(
        JSON.parse(savedUser)
      );
    }

  }, []);

  /* GOOGLE LOGIN */

  const handleGoogleLogin =
    async () => {

      try {

        if (!role) {

          alert(
            "Please select Student or Mentor first"
          );

          return;
        }

        if (
          role === "student"
          &&
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

            photo:
              loggedInUser.photoURL,

            role:
              role,

            mentorId:
              role === "student"
                ? selectedMentor
                : null,
          });
        }

        const userData = {

          uid:
            loggedInUser.uid,

          name:
            loggedInUser.displayName,

          email:
            loggedInUser.email,

          photo:
            loggedInUser.photoURL,

          role:
            role,

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

  const handleLogout =
    async () => {

      await signOut(auth);

      localStorage.removeItem(
        "user"
      );

      setUser(null);
    };

  return (

    <BrowserRouter>

      <div
        className={`min-h-screen transition duration-300

        ${
          darkMode
            ? "bg-slate-950 text-white"
            : "bg-slate-100 text-black"
        }`}
      >

        <div className="max-w-7xl mx-auto px-4 py-6">

          {/* HEADER */}

          <div className="flex items-center justify-between mb-8">

            <h1 className="text-3xl md:text-5xl font-bold">

              🚀 Productivity Tracker

            </h1>

            {/* MOBILE MENU */}

            <button
              onClick={() =>
                setMobileMenu(
                  !mobileMenu
                )
              }

              className="md:hidden bg-slate-800 px-4 py-2 rounded-xl text-2xl"
            >

              ☰

            </button>

          </div>

          {/* CONTROLS */}

          <div className="flex flex-wrap gap-4 items-center mb-8">

            {!user && (

              <div className="flex gap-3 flex-wrap">

                <button
                  onClick={() =>
                    setRole(
                      "student"
                    )
                  }

                  className={`px-5 py-3 rounded-xl font-semibold

                  ${
                    role ===
                    "student"

                      ? "bg-cyan-500"

                      : "bg-slate-700"
                  }`}
                >

                  🎓 Student

                </button>

                <button
                  onClick={() =>
                    setRole(
                      "mentor"
                    )
                  }

                  className={`px-5 py-3 rounded-xl font-semibold

                  ${
                    role ===
                    "mentor"

                      ? "bg-green-500"

                      : "bg-slate-700"
                  }`}
                >

                  👨‍🏫 Mentor

                </button>

              </div>
            )}

            {
              role === "student"
              &&
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

                  {mentors.map(
                    (mentor) => (

                      <option
                        key={mentor.id}

                        value={
                          mentor.id
                        }
                      >

                        {mentor.name}

                      </option>
                    )
                  )}

                </select>
              )
            }

            {user ? (

              <div className="flex items-center gap-4 flex-wrap">

                <img
                  src={user.photo}
                  alt="profile"

                  className="w-12 h-12 rounded-full"
                />

                <div>

                  <p className="font-semibold">

                    {user.name}

                  </p>

                  <p className="text-sm text-slate-400">

                    {user.role}

                  </p>

                </div>

                <button
                  onClick={
                    handleLogout
                  }

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

                className="bg-blue-500 px-5 py-3 rounded-xl font-semibold"
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

          {/* NAVBAR */}

          <div className={`

            ${
              mobileMenu
                ? "flex"
                : "hidden"
            }

            md:flex flex-col md:flex-row gap-5 mb-10 text-lg md:text-2xl font-semibold
          `}>

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

            <Link to="/leaderboard">
              Leaderboard
            </Link>

            <Link to="/questions">
              Question Sheets
            </Link>

            <Link to="/create-sheet">
              Create Sheet
            </Link>

            <Link to="/planner">
              AI Planner
            </Link>

            {
              user?.role ===
              "mentor" && (

                <Link to="/mentor">

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

            <Route
              path="/leaderboard"
              element={
                <Leaderboard />
              }
            />

            <Route
              path="/questions"
              element={
                <QuestionSheets />
              }
            />

            <Route
              path="/create-sheet"
              element={
                <CreateSheet />
              }
            />

            <Route
              path="/planner"
              element={
                <StudyPlanner />
              }
            />

          </Routes>

        </div>

      </div>

    </BrowserRouter>
  );
}