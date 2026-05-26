import {

  signInWithPopup,
  signOut,
  onAuthStateChanged,

} from "firebase/auth";

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
} from "react-router-dom";

import toast from "react-hot-toast";

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

import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import LoadingSkeleton from "./components/LoadingSkeleton";

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

  const [
    loading,
    setLoading
  ] = useState(true);

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

  /* FIREBASE AUTH */

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(

        auth,

        async (
          currentUser
        ) => {

          if (
            currentUser
          ) {

            const userRef =
              doc(
                db,
                "users",
                currentUser.uid
              );

            const userSnap =
              await getDoc(
                userRef
              );

            if (
              userSnap.exists()
            ) {

              setUser(
                userSnap.data()
              );

            } else {

              setUser(null);
            }

          } else {

            setUser(null);
          }

          setLoading(false);
        }
      );

    return () =>
      unsubscribe();

  }, []);

  /* LOGIN */

  const handleGoogleLogin =
    async () => {

      try {

        if (!role) {

          toast.error(
            "Please select Student or Mentor first"
          );

          return;
        }

        if (
          role === "student"
          &&
          !selectedMentor
        ) {

          toast.error(
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
              loggedInUser.photoURL || "",

            role:
              role,

            mentorId:
              role === "student"
                ? selectedMentor
                : null,
          });
        }

        toast.success(
          "Login successful 🚀"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Login failed"
        );
      }
    };

  /* LOGOUT */

  const handleLogout =
    async () => {

      try {

        await signOut(auth);

        setUser(null);

        toast.success(
          "Logged out successfully"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Logout failed"
        );
      }
    };

  /* LOADING */

  if (loading) {

    return (

      <div className="min-h-screen bg-slate-950 text-white p-8">

        <LoadingSkeleton />

      </div>
    );
  }

  return (

    <BrowserRouter>

      <div
        className={`min-h-screen flex transition duration-300

        ${
          darkMode
            ? "bg-slate-950 text-white"
            : "bg-slate-100 text-black"
        }`}
      >

        {/* SIDEBAR */}

        <Sidebar
          user={user}

          mobileMenu={
            mobileMenu
          }

          setMobileMenu={
            setMobileMenu
          }
        />

        {/* MAIN CONTENT */}

        <div className="flex-1 md:ml-[260px] p-4 md:p-8">

          {/* HEADER */}

          <div className="flex items-center justify-between mb-8">

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

            <h1 className="text-2xl md:text-4xl font-bold">

              🚀 Productivity Tracker

            </h1>

            <button
              onClick={() =>
                setDarkMode(
                  !darkMode
                )
              }

              className="bg-slate-700 hover:bg-slate-600 transition px-4 py-2 rounded-xl"
            >

              {darkMode
                ? "☀"
                : "🌙"}

            </button>

          </div>

          {/* AUTH SECTION */}

          {!user && (

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl mb-10">

              <h2 className="text-3xl font-bold mb-6">

                Welcome 🚀

              </h2>

              <div className="flex flex-wrap gap-4 mb-6">

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

              {
                role ===
                  "student" && (

                  <select
                    className="bg-slate-800 px-4 py-3 rounded-xl mb-6 w-full md:w-[300px]"

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
                      (
                        mentor
                      ) => (

                        <option
                          key={
                            mentor.id
                          }

                          value={
                            mentor.id
                          }
                        >

                          {
                            mentor.name
                          }

                        </option>
                      )
                    )}

                  </select>
                )
              }

              <div>

                <button
                  onClick={
                    handleGoogleLogin
                  }

                  className="bg-blue-500 hover:bg-blue-600 transition px-6 py-3 rounded-xl font-semibold"
                >

                  Sign in with Google

                </button>

              </div>

            </div>
          )}

          {/* USER BAR */}

          {
            user && (

              <div className="flex items-center justify-between flex-wrap gap-4 bg-slate-900 border border-slate-800 p-5 rounded-3xl mb-10">

                <div className="flex items-center gap-4">

                  <img
                    src={
                      user?.photo ||

                      `https://ui-avatars.com/api/?name=${user?.name}&background=06b6d4&color=fff`
                    }

                    alt="profile"

                    className="w-14 h-14 rounded-full border-2 border-cyan-400"
                  />

                  <div>

                    <h2 className="text-2xl font-bold">

                      {user.name}

                    </h2>

                    <p className="text-slate-400 capitalize">

                      {user.role}

                    </p>

                  </div>

                </div>

                <button
                  onClick={
                    handleLogout
                  }

                  className="bg-red-500 hover:bg-red-600 transition px-5 py-3 rounded-xl font-semibold"
                >

                  Logout

                </button>

              </div>
            )
          }

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
              element={
                <ProtectedRoute
                  user={user}
                >

                  <Goals />

                </ProtectedRoute>
              }
            />

            <Route
              path="/analytics"
              element={
                <ProtectedRoute
                  user={user}
                >

                  <Analytics />

                </ProtectedRoute>
              }
            />

            <Route
              path="/achievements"
              element={
                <ProtectedRoute
                  user={user}
                >

                  <Achievements />

                </ProtectedRoute>
              }
            />

            <Route
              path="/heatmap"
              element={
                <ProtectedRoute
                  user={user}
                >

                  <Heatmap />

                </ProtectedRoute>
              }
            />

            <Route
              path="/insights"
              element={
                <ProtectedRoute
                  user={user}
                >

                  <Insights />

                </ProtectedRoute>
              }
            />

            <Route
              path="/leaderboard"
              element={
                <ProtectedRoute
                  user={user}
                >

                  <Leaderboard />

                </ProtectedRoute>
              }
            />

            <Route
              path="/questions"
              element={
                <ProtectedRoute
                  user={user}
                >

                  <QuestionSheets />

                </ProtectedRoute>
              }
            />

            <Route
              path="/planner"
              element={
                <ProtectedRoute
                  user={user}
                >

                  <StudyPlanner />

                </ProtectedRoute>
              }
            />

            <Route
              path="/mentor"
              element={
                <ProtectedRoute
                  user={user}
                  requiredRole="mentor"
                >

                  <MentorDashboard />

                </ProtectedRoute>
              }
            />

            <Route
              path="/create-sheet"
              element={
                <ProtectedRoute
                  user={user}
                  requiredRole="mentor"
                >

                  <CreateSheet />

                </ProtectedRoute>
              }
            />

            <Route
              path="/student/:uid"
              element={
                <ProtectedRoute
                  user={user}
                  requiredRole="mentor"
                >

                  <StudentProgress />

                </ProtectedRoute>
              }
            />

          </Routes>

        </div>

      </div>

    </BrowserRouter>
  );
}