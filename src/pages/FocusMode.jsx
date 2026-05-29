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

        const ref = doc(
          db,
          "focusSessions",
          user.uid
        );

        const snap =
          await getDoc(ref);

        if (
          snap.exists()
        ) {

          const data =
            snap.data();

          setSessions(
            data.sessions || 0
          );

          setXp(
            data.xp || 0
          );
        }

      } catch (error) {

        console.log(error);

      }
    };

  /* SAVE LOCAL TIMER */

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

  /* COMPLETE */

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

        setSessions(
          newSessions
        );

        setXp(newXP);

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

            xp: newXP,
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

        toast.success(
          "+50 XP Earned 🚀"
        );

        resetTimer();

      } catch (error) {

        console.log(error);

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
        className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 backdrop-blur-xl p-8 md:p-10 shadow-2xl"
      >

        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/20 blur-[120px]" />

        <div className="relative z-10">

          <p className="text-cyan-400 uppercase tracking-[6px] text-sm font-semibold">

            Deep Work System

          </p>

          <h1 className="text-5xl md:text-6xl font-black mt-5 leading-tight">

            Enter
            {" "}

            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              Focus Mode

            </span>

          </h1>

          <p className="text-slate-400 text-lg mt-6 max-w-3xl leading-relaxed">

            Eliminate distractions and maximize deep work performance.

          </p>

        </div>

      </motion.div>

      {/* TIMER */}

      <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl p-10 md:p-16 shadow-2xl text-center">

        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 blur-[120px]" />

        <div className="relative z-10">

          <motion.div
            key={`${minutes}:${seconds}`}
            initial={{
              scale: 0.95,
            }}
            animate={{
              scale: 1,
            }}
            className="text-[90px] md:text-[140px] font-black tracking-tight"
          >

            {String(minutes).padStart(2, "0")}
            :
            {String(seconds).padStart(2, "0")}

          </motion.div>

          <p className="text-slate-400 text-xl mt-4">

            {
              running

                ? "Focus session active"

                : "Ready for deep work"
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
              onClick={() =>
                setRunning(false)
              }
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

      {/* LIVE STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <motion.div
          whileHover={{
            y: -5,
          }}
          className="rounded-[32px] border border-white/10 hover:border-cyan-500/20 bg-white/5 backdrop-blur-xl p-7 shadow-2xl hover:scale-[1.015] transition-all duration-300"
        >

          <div className="text-5xl">

            🧠

          </div>

          <p className="text-slate-400 mt-6">

            Sessions Completed

          </p>

          <motion.h2
            key={sessions}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="text-5xl font-black mt-3"
          >

            {sessions}

          </motion.h2>

        </motion.div>

        <motion.div
          whileHover={{
            y: -5,
          }}
          className="rounded-[32px] border border-white/10 hover:border-cyan-500/20 bg-white/5 backdrop-blur-xl p-7 shadow-2xl hover:scale-[1.015] transition-all duration-300"
        >

          <div className="text-5xl">

            ⚡

          </div>

          <p className="text-slate-400 mt-6">

            Focus XP

          </p>

          <motion.h2
            key={xp}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="text-5xl font-black mt-3"
          >

            {xp}

          </motion.h2>

        </motion.div>

        <motion.div
          whileHover={{
            y: -5,
          }}
          className="rounded-[32px] border border-white/10 hover:border-cyan-500/20 bg-white/5 backdrop-blur-xl p-7 shadow-2xl hover:scale-[1.015] transition-all duration-300"
        >

          <div className="text-5xl">

            🔥

          </div>

          <p className="text-slate-400 mt-6">

            Deep Work Hours

          </p>

          <motion.h2
            key={sessions * 25}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="text-5xl font-black mt-3"
          >

            {
              (
                sessions *
                25 /
                60
              ).toFixed(1)
            }

          </motion.h2>

        </motion.div>

      </div>

    </div>
  );
}