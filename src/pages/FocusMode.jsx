import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  auth,
  db,
} from "../firebase";

import {
  doc,
  getDoc,
  updateDoc,
  increment,
  setDoc,
} from "firebase/firestore";

import toast from "react-hot-toast";

import {
  updateActivityHistory,
} from "../utils/activityEngine";

export default function FocusMode() {

  const [minutes, setMinutes] =
    useState(25);

  const [seconds, setSeconds] =
    useState(0);

  const [running, setRunning] =
    useState(false);

  const [sessions, setSessions] =
    useState(0);

  const [xp, setXp] =
    useState(0);

  const [score, setScore] =
    useState(0);

  /* LOAD DATA */

  useEffect(() => {

    loadFocusData();

  }, []);

  const loadFocusData =
    async () => {

      try {

        const user =
          auth.currentUser;

        if (!user)
          return;

        const focusRef =
          doc(
            db,
            "focusSessions",
            user.uid
          );

        const userRef =
          doc(
            db,
            "users",
            user.uid
          );

        const focusSnap =
          await getDoc(
            focusRef
          );

        const userSnap =
          await getDoc(
            userRef
          );

        if (
          focusSnap.exists()
        ) {

          const data =
            focusSnap.data();

          setSessions(
            data.sessions || 0
          );
        }

        if (
          userSnap.exists()
        ) {

          const data =
            userSnap.data();

          setXp(
            data.xp || 0
          );
        }

      } catch (error) {

        console.log(error);

      }
    };

  /* RESTORE TIMER */

  useEffect(() => {

    const saved =
      JSON.parse(

        localStorage.getItem(
          "focusTimer"
        )
      );

    if (saved) {

      setMinutes(
        saved.minutes
      );

      setSeconds(
        saved.seconds
      );

      setRunning(
        saved.running
      );
    }

  }, []);

  /* SAVE TIMER */

  useEffect(() => {

    localStorage.setItem(

      "focusTimer",

      JSON.stringify({

        minutes,
        seconds,
        running,
      })
    );

  }, [
    minutes,
    seconds,
    running,
  ]);

  /* PRODUCTIVITY SCORE */

  useEffect(() => {

    const calculatedScore =
      Math.min(

        100,

        Math.floor(

          xp * 0.02 +

          sessions * 2
        )
      );

    setScore(
      calculatedScore
    );

  }, [
    xp,
    sessions,
  ]);

  /* TIMER */

  useEffect(() => {

    let timer;

    if (
      running
    ) {

      timer = setInterval(() => {

        if (
          seconds > 0
        ) {

          setSeconds(
            seconds - 1
          );

        } else {

          if (
            minutes === 0
          ) {

            clearInterval(timer);

            completeSession();

          } else {

            setMinutes(
              minutes - 1
            );

            setSeconds(59);

          }
        }

      }, 1000);
    }

    return () =>
      clearInterval(timer);

  }, [
    running,
    seconds,
    minutes,
  ]);

  /* COMPLETE SESSION */

  const completeSession =
    async () => {

      try {

        const user =
          auth.currentUser;

        if (!user)
          return;

        setRunning(false);

        const newSessions =
          sessions + 1;

        const gainedXP = 50;

        const newXP =
          xp + gainedXP;

        const productivityScore =
          Math.min(

            100,

            Math.floor(

              newXP * 0.02 +

              newSessions * 2
            )
          );

        setSessions(
          newSessions
        );

        setXp(
          newXP
        );

        setScore(
          productivityScore
        );

        /* SAVE FOCUS */

        await setDoc(

          doc(
            db,
            "focusSessions",
            user.uid
          ),

          {
            sessions:
              newSessions,
          },

          {
            merge: true,
          }
        );

        /* UPDATE USER XP */

        await updateDoc(

          doc(
            db,
            "users",
            user.uid
          ),

          {
            xp: increment(
              gainedXP
            ),
          }
        );

        /* ACTIVITY HISTORY */

        await updateActivityHistory(

          user.uid,

          {

            xp: newXP,

            sessions:
              newSessions,

            productivityScore,
          }
        );

        toast.success(
          "+50 XP Earned 🚀"
        );

        resetTimer();

      } catch (error) {

        console.log(error);

        toast.error(
          "Session failed"
        );
      }
    };

  /* CONTROLS */

  const startTimer =
    () => {

      if (
        minutes === 0 &&
        seconds === 0
      ) {

        setMinutes(25);
      }

      setRunning(true);
    };

  const pauseTimer =
    () => {

      setRunning(false);
    };

  const resetTimer =
    () => {

      setRunning(false);

      setMinutes(25);

      setSeconds(0);
    };

  return (

    <div className="space-y-8">

      {/* HERO */}

      <motion.div

        initial={{
          opacity: 0,
          y: 20,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 backdrop-blur-xl p-8 md:p-12 shadow-2xl"
      >

        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/20 blur-[120px]" />

        <div className="relative z-10">

          <p className="text-cyan-400 uppercase tracking-[6px] text-sm font-semibold">

            Deep Work Engine

          </p>

          <h1 className="text-5xl md:text-7xl font-black mt-6 leading-tight">

            Enter{" "}

            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              Focus Mode

            </span>

          </h1>

          <p className="text-slate-400 text-lg md:text-xl mt-6 max-w-3xl leading-relaxed">

            Train deep work, eliminate distractions, and compound productivity through focused execution.

          </p>

        </div>

      </motion.div>

      {/* TIMER */}

      <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl p-10 md:p-16 shadow-2xl text-center">

        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-[120px]" />

        <div className="relative z-10">

          <motion.div

            key={`${minutes}:${seconds}`}

            initial={{
              scale: 0.96,
            }}

            animate={{
              scale: 1,
            }}

            className="text-[90px] md:text-[150px] font-black tracking-tight"
          >

            {String(minutes).padStart(2, "0")}
            :
            {String(seconds).padStart(2, "0")}

          </motion.div>

          <p className="text-slate-400 text-xl mt-5">

            {
              running

                ? "Deep work session active"

                : "Ready to focus"
            }

          </p>

          {/* BUTTONS */}

          <div className="flex flex-wrap items-center justify-center gap-5 mt-10">

            <button
              onClick={startTimer}
              className="px-10 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 font-black text-lg hover:scale-[1.03] transition-all duration-300 shadow-2xl"
            >

              {
                running

                  ? "Running..."

                  : "▶ Start Focus"
              }

            </button>

            <button
              onClick={pauseTimer}
              className="px-10 py-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 font-bold text-lg transition-all duration-300"
            >

              ⏸ Pause

            </button>

            <button
              onClick={resetTimer}
              className="px-10 py-5 rounded-2xl border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-lg transition-all duration-300"
            >

              ↺ Reset

            </button>

          </div>

        </div>

      </div>

      {/* LIVE METRICS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* SESSIONS */}

        <motion.div
          whileHover={{
            y: -5,
          }}
          className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-7 shadow-2xl"
        >

          <div className="text-5xl">

            🧠

          </div>

          <p className="text-slate-400 mt-6">

            Focus Sessions

          </p>

          <h2 className="text-5xl font-black mt-4">

            {sessions}

          </h2>

        </motion.div>

        {/* XP */}

        <motion.div
          whileHover={{
            y: -5,
          }}
          className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-7 shadow-2xl"
        >

          <div className="text-5xl">

            ⚡

          </div>

          <p className="text-slate-400 mt-6">

            Total XP

          </p>

          <h2 className="text-5xl font-black mt-4">

            {xp}

          </h2>

        </motion.div>

        {/* SCORE */}

        <motion.div
          whileHover={{
            y: -5,
          }}
          className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-7 shadow-2xl"
        >

          <div className="text-5xl">

            🚀

          </div>

          <p className="text-slate-400 mt-6">

            Productivity Score

          </p>

          <h2 className="text-5xl font-black mt-4">

            {score}

          </h2>

        </motion.div>

      </div>

    </div>
  );
}