import {

  useEffect,
  useState,

} from "react";

import {

  motion,
  AnimatePresence,

} from "framer-motion";

import {

  auth,
  db,

} from "../firebase";

import {

  addDoc,
  collection,
  serverTimestamp,
  doc,
  updateDoc,
  increment,

} from "firebase/firestore";

import toast from "react-hot-toast";

export default function FocusSessionModal({

  open,

  setOpen,

}) {

  const [
    seconds,
    setSeconds
  ] = useState(1500);

  const [
    running,
    setRunning
  ] = useState(false);

  const [
    saving,
    setSaving
  ] = useState(false);

  /* TIMER */

  useEffect(() => {

    let interval;

    if (
      running &&
      seconds > 0
    ) {

      interval =
        setInterval(() => {

          setSeconds(
            (prev) =>
              prev - 1
          );

        }, 1000);
    }

    return () =>
      clearInterval(
        interval
      );

  }, [

    running,
    seconds,
  ]);

  /* COMPLETE */

  useEffect(() => {

    if (
      seconds === 0
    ) {

      completeSession();
    }

  }, [seconds]);

  /* COMPLETE SESSION */

  const completeSession =
    async () => {

      try {

        setSaving(true);

        setRunning(false);

        const user =
          auth.currentUser;

        if (!user)
          return;

        /* SAVE SESSION */

        await addDoc(

          collection(
            db,
            "focusSessions"
          ),

          {
            uid:
              user.uid,

            duration:
              25,

            xp:
              120,

            createdAt:
              serverTimestamp(),
          }
        );

        /* UPDATE USER XP */

        const userRef =
          doc(
            db,
            "users",
            user.uid
          );

        await updateDoc(
          userRef,

          {
            xp:
              increment(
                120
              ),

            totalSessions:
              increment(
                1
              ),
          }
        );

        toast.success(
          "🔥 Focus Session Completed! +120 XP"
        );

        setSeconds(1500);

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to save session"
        );

      } finally {

        setSaving(false);
      }
    };

  /* FORMAT */

  const minutes =
    Math.floor(
      seconds / 60
    );

  const secs =
    seconds % 60;

  return (

    <AnimatePresence>

      {
        open && (

          <motion.div

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            exit={{
              opacity: 0,
            }}

            className="fixed inset-0 z-[100] flex items-center justify-center"
          >

            {/* BACKDROP */}

            <div
              onClick={() =>
                setOpen(false)
              }

              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* MODAL */}

            <motion.div

              initial={{
                scale: 0.9,
                opacity: 0,
              }}

              animate={{
                scale: 1,
                opacity: 1,
              }}

              exit={{
                scale: 0.9,
                opacity: 0,
              }}

              transition={{
                type: "spring",
                damping: 22,
              }}

              className="relative z-10 w-[95%] max-w-2xl overflow-hidden rounded-[40px] border border-white/10 bg-slate-900/90 backdrop-blur-2xl p-10 shadow-[0_20px_120px_rgba(0,0,0,0.65)]"
            >

              {/* GLOW */}

              <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/20 blur-[120px]" />

              <div className="relative z-10 text-center">

                <p className="text-cyan-400 uppercase tracking-[6px] text-sm font-semibold">

                  Deep Focus Session

                </p>

                <h1 className="text-5xl md:text-6xl font-black mt-5">

                  Stay
                  {" "}

                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                    locked in
                  </span>

                </h1>

                <p className="text-slate-400 text-lg mt-5 max-w-xl mx-auto leading-relaxed">

                  Eliminate distractions and build elite productivity consistency.

                </p>

                {/* TIMER */}

                <div className="mt-12 flex justify-center">

                  <div className="relative w-[280px] h-[280px] rounded-full border border-cyan-500/20 bg-white/5 backdrop-blur-xl flex items-center justify-center shadow-2xl">

                    <div className="absolute inset-4 rounded-full border border-white/5" />

                    <div>

                      <h2 className="text-7xl font-black tracking-tight">

                        {String(
                          minutes
                        ).padStart(
                          2,
                          "0"
                        )}

                        :

                        {String(
                          secs
                        ).padStart(
                          2,
                          "0"
                        )}

                      </h2>

                      <p className="text-slate-400 mt-3 uppercase tracking-[4px] text-sm">

                        Focus Timer

                      </p>

                    </div>

                  </div>

                </div>

                {/* ACTIONS */}

                <div className="flex flex-wrap justify-center gap-4 mt-12">

                  <button
                    onClick={() =>
                      setRunning(
                        !running
                      )
                    }

                    disabled={
                      saving
                    }

                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-[1.03] transition-all duration-300 px-8 py-4 rounded-2xl font-bold shadow-2xl text-lg"
                  >

                    {
                      running

                        ? "⏸ Pause Session"

                        : "▶ Start Session"
                    }

                  </button>

                  <button
                    onClick={() => {

                      setRunning(
                        false
                      );

                      setSeconds(
                        1500
                      );
                    }}

                    className="bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 px-8 py-4 rounded-2xl font-semibold text-lg"
                  >

                    🔄 Reset

                  </button>

                  <button
                    onClick={() =>
                      setOpen(false)
                    }

                    className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-all duration-300 px-8 py-4 rounded-2xl font-semibold text-red-400 text-lg"
                  >

                    ✕ Close

                  </button>

                </div>

                {/* STATS */}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-12">

                  {[
                    {
                      label:
                        "XP Reward",

                      value:
                        "+120 XP",
                    },

                    {
                      label:
                        "Focus Mode",

                      value:
                        "Deep Work",
                    },

                    {
                      label:
                        "Session Length",

                      value:
                        "25 Minutes",
                    },
                  ].map(
                    (
                      item,
                      index
                    ) => (

                      <div
                        key={index}

                        className="rounded-3xl border border-white/10 bg-white/5 p-5"
                      >

                        <p className="text-slate-400 text-sm uppercase tracking-widest">

                          {item.label}

                        </p>

                        <h3 className="text-2xl font-black mt-3">

                          {item.value}

                        </h3>

                      </div>
                    )
                  )}

                </div>

              </div>

            </motion.div>

          </motion.div>
        )
      }

    </AnimatePresence>
  );
}