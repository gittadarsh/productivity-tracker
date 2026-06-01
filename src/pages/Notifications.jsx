import { useState } from "react";

import { motion } from "framer-motion";

export default function Notifications() {

  const [reminders, setReminders] =
    useState([
      {
        title: "CodeChef Contest",
        day: "Wednesday",
        time: "7:30 PM",
      },

      {
        title: "Weekly Reflection",
        day: "Sunday",
        time: "9:00 PM",
      },

      {
        title: "Daily DSA Practice",
        day: "Everyday",
        time: "8:00 PM",
      },
    ]);

  const [title, setTitle] =
    useState("");

  const [day, setDay] =
    useState("");

  const [time, setTime] =
    useState("");

  const addReminder = () => {

    if (
      !title ||
      !day ||
      !time
    )
      return;

    setReminders([
      ...reminders,
      {
        title,
        day,
        time,
      },
    ]);

    setTitle("");
    setDay("");
    setTime("");
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
        className="rounded-[40px] border border-white/10 bg-gradient-to-br from-orange-500/10 to-red-500/5 backdrop-blur-xl p-8 md:p-12 shadow-2xl"
      >

        <p className="text-orange-400 uppercase tracking-[8px] text-sm font-semibold mb-4">

          Reminder System

        </p>

        <h1 className="text-5xl md:text-7xl font-black">

          🔔 Stay Consistent

        </h1>

        <p className="text-slate-400 text-lg mt-6 max-w-3xl">

          Create reminders for contests, goals, study sessions, workouts, and weekly reflections.

        </p>

      </motion.div>

      {/* CREATE REMINDER */}

      <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

        <h2 className="text-3xl font-black mb-8">

          Create Reminder

        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Reminder title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="bg-white/5 border border-white/10 focus:border-orange-400 outline-none px-5 py-4 rounded-2xl"
          />

          <input
            type="text"
            placeholder="Day"
            value={day}
            onChange={(e) =>
              setDay(e.target.value)
            }
            className="bg-white/5 border border-white/10 focus:border-orange-400 outline-none px-5 py-4 rounded-2xl"
          />

          <input
            type="text"
            placeholder="Time"
            value={time}
            onChange={(e) =>
              setTime(e.target.value)
            }
            className="bg-white/5 border border-white/10 focus:border-orange-400 outline-none px-5 py-4 rounded-2xl"
          />

          <button
            onClick={addReminder}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:scale-[1.02] transition-all rounded-2xl font-bold"
          >

            Add Reminder

          </button>

        </div>

      </div>

      {/* REMINDERS */}

      <div className="space-y-5">

        {reminders.map(
          (
            item,
            index
          ) => (

            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              whileHover={{
                y: -4,
              }}
              className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-7 shadow-2xl"
            >

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                <div>

                  <h2 className="text-3xl font-black">

                    {item.title}

                  </h2>

                  <p className="text-slate-400 text-lg mt-4">

                    {item.day}
                    {" • "}
                    {item.time}

                  </p>

                </div>

                <button className="bg-blue-500 hover:bg-blue-600 transition px-6 py-3 rounded-2xl font-semibold">

                  Edit

                </button>

              </div>

            </motion.div>
          )
        )}

      </div>

    </div>
  );
}