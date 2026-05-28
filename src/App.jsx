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

  /* THEME */

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
        className={`

        min-h-screen

        relative overflow-hidden

        transition duration-300

        ${
          darkMode

            ? "bg-[#020617] text-white"

            : "bg-slate-100 text-black"
        }`}
      >

        {/* BACKGROUND GLOWS */}

        <div className="absolute top-[-150px] left-[-100px] w-[500px] h-[500px] bg-cyan-500/20 blur-[140px] rounded-full pointer-events-none" />

        <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-blue-500/20 blur-[160px] rounded-full pointer-events-none" />

        <div className="absolute top-[40%] left-[35%] w-[300px] h-[300px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

        {/* OVERLAY */}

        {
          mobileMenu && (

            <div
              onClick={() =>
                setMobileMenu(
                  false
                )
              }

              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
          )
        }

        {/* SIDEBAR */}

        {
          user?.role && (

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

        <div className="relative z-10 p-4 md:p-6 xl:p-8">

          {/* TOPBAR */}

          {
            user?.role && (

              <div className="mb-8">

                <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[30px] px-6 py-5 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">

                  <div className="flex items-center justify-between gap-6 flex-wrap">

                    {/* LEFT */}

                    <div className="flex items-center gap-5">

                      <button
                        onClick={() =>
                          setMobileMenu(
                            !mobileMenu
                          )
                        }

                        className="bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 px-4 py-3 rounded-2xl text-2xl"
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

                          className="w-14 h-14 rounded-2xl border-2 border-cyan-400 object-cover shadow-xl"
                        />

                        <div>

                          <h2 className="text-2xl md:text-3xl font-black leading-tight">

                            Welcome back,

                            <span className="text-cyan-400">

                              {" "}
                              {
                                user?.name?.split(
                                  " "
                                )[0]
                              }

                            </span>

                          </h2>

                          <p className="text-slate-400 capitalize mt-1">

                            {user?.role}
                            {" "}
                            Dashboard
                          </p>

                        </div>

                      </div>

                    </div>

                    {/* RIGHT */}

                    <div className="flex items-center gap-4 flex-wrap">

                      {/* SEARCH */}

                      <div className="hidden lg:flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl min-w-[260px]">

                        <span className="text-slate-400">

                          🔍

                        </span>

                        <input
                          type="text"

                          placeholder="Search..."

                          className="bg-transparent outline-none text-white placeholder:text-slate-500 w-full"
                        />

                      </div>

                      {/* NOTIFICATION */}

                      <button className="relative bg-white/5 hover:bg-white/10 transition-all duration-300 p-4 rounded-2xl border border-white/10">

                        🔔

                        <span className="absolute top-2 right-2 w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />

                      </button>

                      {/* THEME */}

                      <button
                        onClick={() =>
                          setDarkMode(
                            !darkMode
                          )
                        }

                        className="bg-white/5 hover:bg-white/10 transition-all duration-300 px-5 py-4 rounded-2xl border border-white/10 text-xl"
                      >

                        {
                          darkMode

                            ? "☀"

                            : "🌙"
                        }

                      </button>

                    </div>

                  </div>

                </div>

              </div>
            )
          }

          {/* ROUTES */}

          <Routes>

            <Route
              path="/"
              element={<Landing />}
            />

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

            <Route
              path="/dashboard"

              element={

                <ProtectedRoute user={user}>

                  <PageWrapper>

                    <Dashboard />

                  </PageWrapper>

                </ProtectedRoute>
              }
            />

            <Route
              path="/goals"

              element={

                <ProtectedRoute user={user}>

                  <PageWrapper>

                    <Goals />

                  </PageWrapper>

                </ProtectedRoute>
              }
            />

            <Route
              path="/analytics"

              element={

                <ProtectedRoute user={user}>

                  <PageWrapper>

                    <Analytics />

                  </PageWrapper>

                </ProtectedRoute>
              }
            />

            <Route
              path="/achievements"

              element={

                <ProtectedRoute user={user}>

                  <PageWrapper>

                    <Achievements />

                  </PageWrapper>

                </ProtectedRoute>
              }
            />

            <Route
              path="/heatmap"

              element={

                <ProtectedRoute user={user}>

                  <PageWrapper>

                    <Heatmap />

                  </PageWrapper>

                </ProtectedRoute>
              }
            />

            <Route
              path="/insights"

              element={

                <ProtectedRoute user={user}>

                  <PageWrapper>

                    <Insights />

                  </PageWrapper>

                </ProtectedRoute>
              }
            />

            <Route
              path="/leaderboard"

              element={

                <ProtectedRoute user={user}>

                  <PageWrapper>

                    <Leaderboard />

                  </PageWrapper>

                </ProtectedRoute>
              }
            />

            <Route
              path="/questions"

              element={

                <ProtectedRoute user={user}>

                  <PageWrapper>

                    <QuestionSheets />

                  </PageWrapper>

                </ProtectedRoute>
              }
            />

            <Route
              path="/chat"

              element={

                <ProtectedRoute user={user}>

                  <PageWrapper>

                    <Chat />

                  </PageWrapper>

                </ProtectedRoute>
              }
            />

            <Route
              path="/planner"

              element={

                <ProtectedRoute user={user}>

                  <PageWrapper>

                    <StudyPlanner />

                  </PageWrapper>

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

                  <PageWrapper>

                    <MentorDashboard />

                  </PageWrapper>

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

                  <PageWrapper>

                    <CreateSheet />

                  </PageWrapper>

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