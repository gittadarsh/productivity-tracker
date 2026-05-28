import {

  signOut,
  onAuthStateChanged,

} from "firebase/auth";

import {
  auth,
  db,
} from "./firebase";

import {
  doc,
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
  Navigate,
} from "react-router-dom";

import toast from "react-hot-toast";

/* PAGES */

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";

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
import Chat from "./pages/Chat";

/* COMPONENTS */

import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import LoadingSkeleton from "./components/LoadingSkeleton";
import PageWrapper from "./components/PageWrapper";

export default function App() {

  const [darkMode, setDarkMode] =
    useState(

      localStorage.getItem(
        "theme"
      ) === "light"

        ? false

        : true
    );

  const [user, setUser] =
    useState(null);

  const [
    mobileMenu,
    setMobileMenu
  ] = useState(false);

  const [
    loading,
    setLoading
  ] = useState(true);

  /* THEME PERSISTENCE */

  useEffect(() => {

    localStorage.setItem(

      "theme",

      darkMode
        ? "dark"
        : "light"
    );

  }, [darkMode]);

  /* AUTH */

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(

        auth,

        async (
          currentUser
        ) => {

          try {

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

                setUser({

                  uid:
                    currentUser.uid,

                  ...userSnap.data(),
                });

              } else {

                setUser({

                  uid:
                    currentUser.uid,

                  name:
                    currentUser.displayName,

                  email:
                    currentUser.email,

                  photo:
                    currentUser.photoURL,
                });
              }

            } else {

              setUser(null);
            }

          } catch (error) {

            console.log(error);

            toast.error(
              "Authentication failed"
            );

          } finally {

            setLoading(false);
          }
        }
      );

    return () =>
      unsubscribe();

  }, []);

  /* LOGOUT */

  const handleLogout =
    async () => {

      try {

        await signOut(auth);

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

        {
          user && (

            <Sidebar
              user={user}

              mobileMenu={
                mobileMenu
              }

              setMobileMenu={
                setMobileMenu
              }

              handleLogout={
                handleLogout
              }
            />
          )
        }

        {/* MAIN */}

        <div
          className={`flex-1

          ${
            user
              ? "md:ml-[260px]"
              : ""
          }

          p-4 md:p-8`}
        >

          {/* TOPBAR */}

          {
            user && (

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

                <div className="flex items-center gap-4">

                  <img
                    src={
                      user?.photo ||

                      `https://ui-avatars.com/api/?name=${user?.name}&background=06b6d4&color=fff`
                    }

                    alt="profile"

                    className="w-14 h-14 rounded-full border-2 border-cyan-400 object-cover"
                  />

                  <div>

                    <h2 className="text-2xl font-bold">

                      {user?.name}

                    </h2>

                    <p className="text-slate-400 capitalize">

                      {user?.role || "User"}

                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-4">

                  {/* THEME */}

                  <button
                    onClick={() =>
                      setDarkMode(
                        !darkMode
                      )
                    }

                    className="bg-slate-800 hover:bg-slate-700 transition px-4 py-3 rounded-xl text-xl"
                  >

                    {
                      darkMode

                        ? "☀"

                        : "🌙"
                    }

                  </button>

                  {/* LOGOUT */}

                  <button
                    onClick={
                      handleLogout
                    }

                    className="bg-red-500 hover:bg-red-600 transition px-5 py-3 rounded-xl font-semibold"
                  >

                    Logout

                  </button>

                </div>

              </div>
            )
          }

          {/* ROUTES */}

          <Routes>

            {/* LANDING */}

            <Route
              path="/"

              element={<Landing />}
            />

            {/* LOGIN */}

            <Route
              path="/login"

              element={

                user

                  ? <Navigate
                      to={

                        user.role ===
                        "mentor"

                          ? "/mentor"

                          : user.role ===
                            "student"

                            ? "/dashboard"

                            : "/onboarding"
                      }
                    />

                  : <Login />
              }
            />

            {/* ONBOARDING */}

            <Route
              path="/onboarding"

              element={

                user

                  ? user.role

                    ? <Navigate
                        to={

                          user.role ===
                          "mentor"

                            ? "/mentor"

                            : "/dashboard"
                        }
                      />

                    : <Onboarding />

                  : <Navigate
                      to="/login"
                    />
              }
            />

            {/* DASHBOARD */}

            <Route
              path="/dashboard"

              element={

                <ProtectedRoute
                  user={user}
                >

                  <PageWrapper>

                    <Dashboard />

                  </PageWrapper>

                </ProtectedRoute>
              }
            />

            {/* GOALS */}

            <Route
              path="/goals"

              element={

                <ProtectedRoute
                  user={user}
                >

                  <PageWrapper>

                    <Goals />

                  </PageWrapper>

                </ProtectedRoute>
              }
            />

            {/* ANALYTICS */}

            <Route
              path="/analytics"

              element={

                <ProtectedRoute
                  user={user}
                >

                  <PageWrapper>

                    <Analytics />

                  </PageWrapper>

                </ProtectedRoute>
              }
            />

            {/* ACHIEVEMENTS */}

            <Route
              path="/achievements"

              element={

                <ProtectedRoute
                  user={user}
                >

                  <PageWrapper>

                    <Achievements />

                  </PageWrapper>

                </ProtectedRoute>
              }
            />

            {/* HEATMAP */}

            <Route
              path="/heatmap"

              element={

                <ProtectedRoute
                  user={user}
                >

                  <PageWrapper>

                    <Heatmap />

                  </PageWrapper>

                </ProtectedRoute>
              }
            />

            {/* INSIGHTS */}

            <Route
              path="/insights"

              element={

                <ProtectedRoute
                  user={user}
                >

                  <PageWrapper>

                    <Insights />

                  </PageWrapper>

                </ProtectedRoute>
              }
            />

            {/* LEADERBOARD */}

            <Route
              path="/leaderboard"

              element={

                <ProtectedRoute
                  user={user}
                >

                  <PageWrapper>

                    <Leaderboard />

                  </PageWrapper>

                </ProtectedRoute>
              }
            />

            {/* QUESTIONS */}

            <Route
              path="/questions"

              element={

                <ProtectedRoute
                  user={user}
                >

                  <PageWrapper>

                    <QuestionSheets />

                  </PageWrapper>

                </ProtectedRoute>
              }
            />

            {/* CHAT */}

            <Route
              path="/chat"

              element={

                <ProtectedRoute
                  user={user}
                >

                  <PageWrapper>

                    <Chat />

                  </PageWrapper>

                </ProtectedRoute>
              }
            />

            {/* PLANNER */}

            <Route
              path="/planner"

              element={

                <ProtectedRoute
                  user={user}
                >

                  <PageWrapper>

                    <StudyPlanner />

                  </PageWrapper>

                </ProtectedRoute>
              }
            />

            {/* MENTOR */}

            <Route
              path="/mentor"

              element={

                <ProtectedRoute
                  user={user}
                  requiredRole="mentor"
                >

                  <PageWrapper>

                    <MentorDashboard />

                  </PageWrapper>

                </ProtectedRoute>
              }
            />

            {/* CREATE SHEET */}

            <Route
              path="/create-sheet"

              element={

                <ProtectedRoute
                  user={user}
                  requiredRole="mentor"
                >

                  <PageWrapper>

                    <CreateSheet />

                  </PageWrapper>

                </ProtectedRoute>
              }
            />

            {/* STUDENT */}

            <Route
              path="/student/:uid"

              element={

                <ProtectedRoute
                  user={user}
                  requiredRole="mentor"
                >

                  <PageWrapper>

                    <StudentProgress />

                  </PageWrapper>

                </ProtectedRoute>
              }
            />

          </Routes>

        </div>

      </div>

    </BrowserRouter>
  );
}