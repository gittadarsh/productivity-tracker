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

import {
  calculateSessionQuality,
} from "../utils/sessionQualityEngine";

import {
  addActivity,
} from "../utils/activityFeedEngine";

import {
  checkAchievements,
} from "../utils/achievementEngine";

import {
  unlockAchievements,
} from "../utils/unlockAchievementEngine";

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

  const [interruptions,
    setInterruptions] =
    useState(0);

  const [quality,
    setQuality] =
    useState(100);

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

  /* SCORE */

  useEffect(() => {

    const calculatedScore =
      Math.min(

        100,

        Math.floor(

          xp * 0.02 +

          sessions * 2 +

          quality * 0.2
        )
      );

    setScore(
      calculatedScore
    );

  }, [
    xp,
    sessions,
    quality,
  ]);

  /* TIMER */

  useEffect(() => {

    let timer;

    if (running) {

      timer = setInterval(() => {

        if (seconds > 0) {

          setSeconds(
            seconds - 1
          );

        } else {

          if (minutes === 0) {

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

        let gainedXP = 50;

        if (
          newSessions >= 5
        ) {

          gainedXP += 25;
        }

        if (
          score >= 80
        ) {

          gainedXP += 40;
        }

        const newXP =
          xp + gainedXP;

        const sessionQuality =
          calculateSessionQuality({

            completed: true,

            interruptions,
          });

        setQuality(
          sessionQuality
        );

        const productivityScore =
          Math.min(

            100,

            Math.floor(

              newXP * 0.02 +

              newSessions * 2 +

              sessionQuality * 0.2
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

        await setDoc(

          doc(
            db,
            "focusSessions",
            user.uid
          ),

          {
            sessions:
              newSessions,

            quality:
              sessionQuality,
          },

          {
            merge: true,
          }
        );

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

        await updateActivityHistory(

          user.uid,

          {

            xp: newXP,

            sessions:
              newSessions,

            productivityScore,

            quality:
              sessionQuality,
          }
        );

        /* LIVE ACTIVITY */

        await addActivity(

          user.uid,

          {
            icon: "⚡",

            title:
              `+${gainedXP} XP Earned`,

            description:
              "Focus session completed successfully.",
          }
        );

        /* ACHIEVEMENTS */

        const unlocked =
          await unlockAchievements(

            user.uid,

            checkAchievements({

              xp: newXP,

              streak:
                Math.floor(
                  newSessions / 3
                ),

              sessions:
                newSessions,
            })
          );

        if (unlocked.length) {

          unlocked.forEach(
            achievement => {

              toast.success(

                `🏆 ${achievement.title} unlocked`
              );
            }
          );
        }

        toast.success(

          `+${gainedXP} XP Earned 🚀`
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

      setInterruptions(

        prev => prev + 1
      );
    };

  const resetTimer =
    () => {

      setRunning(false);

      setMinutes(25);

      setSeconds(0);

      setInterruptions(0);
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

            Train elite deep work and compound productivity through focused execution.

          </p>

        </div>

      </motion.div>

      {/* TIMER */}

      <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl p-10 md:p-16 shadow-2xl text-center">

        <div className="text-[90px] md:text-[150px] font-black tracking-tight">

          {String(minutes).padStart(2, "0")}
          :
          {String(seconds).padStart(2, "0")}

        </div>

        <p className="text-slate-400 text-xl mt-5">

          {
            running

              ? "Deep work session active"

              : "Ready to focus"
          }

        </p>

        <div className="flex flex-wrap items-center justify-center gap-5 mt-10">

          <button
            onClick={startTimer}
            className="px-10 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 font-black text-lg"
          >

            ▶ Start Focus

          </button>

          <button
            onClick={pauseTimer}
            className="px-10 py-5 rounded-2xl border border-white/10 bg-white/5"
          >

            ⏸ Pause

          </button>

          <button
            onClick={resetTimer}
            className="px-10 py-5 rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400"
          >

            ↺ Reset

          </button>

        </div>

      </div>

      {/* METRICS */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-7">

          <p className="text-slate-400">

            Sessions

          </p>

          <h2 className="text-5xl font-black mt-5">

            {sessions}

          </h2>

        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-7">

          <p className="text-slate-400">

            XP

          </p>

          <h2 className="text-5xl font-black mt-5 text-cyan-400">

            {xp}

          </h2>

        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-7">

          <p className="text-slate-400">

            Quality

          </p>

          <h2 className="text-5xl font-black mt-5 text-green-400">

            {quality}

          </h2>

        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-7">

          <p className="text-slate-400">

            Score

          </p>

          <h2 className="text-5xl font-black mt-5 text-purple-400">

            {score}

          </h2>

        </div>

      </div>

    </div>
  );
}