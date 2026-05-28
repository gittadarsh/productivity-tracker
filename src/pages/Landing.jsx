import {

  Link,

} from "react-router-dom";

import {

  motion,

} from "framer-motion";

export default function Landing() {

  return (

    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">

      {/* HERO */}

      <div className="max-w-7xl mx-auto px-6 py-20">

        <motion.div

          initial={{

            opacity: 0,

            y: 40,
          }}

          animate={{

            opacity: 1,

            y: 0,
          }}

          transition={{

            duration: 0.7,
          }}

          className="text-center"
        >

          <h1 className="text-6xl md:text-8xl font-black leading-tight">

            🚀 AI Productivity

            <span className="text-cyan-400">

              {" "}
              SaaS
            </span>

          </h1>

          <p className="text-slate-400 text-xl md:text-2xl mt-8 max-w-3xl mx-auto leading-relaxed">

            Realtime habit tracking,
            AI insights,
            mentor collaboration,
            analytics,
            and productivity optimization —
            all in one platform.

          </p>

          {/* BUTTONS */}

          <div className="flex flex-wrap justify-center gap-6 mt-12">

            <Link
              to="/login"

              className="bg-cyan-500 hover:bg-cyan-600 transition px-10 py-5 rounded-2xl text-black font-bold text-xl shadow-2xl"
            >

              Get Started

            </Link>

            <a
              href="#features"

              className="border border-slate-700 hover:border-cyan-400 transition px-10 py-5 rounded-2xl text-xl"
            >

              Explore Features

            </a>

          </div>

        </motion.div>

        {/* FEATURES */}

        <div
          id="features"

          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-32"
        >

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">

            <h2 className="text-3xl font-bold mb-4">

              ⚡ Realtime Sync

            </h2>

            <p className="text-slate-400 text-lg">

              Live Firebase architecture
              with instant updates
              across devices.

            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">

            <h2 className="text-3xl font-bold mb-4">

              🤖 AI Insights

            </h2>

            <p className="text-slate-400 text-lg">

              AI-powered productivity
              analysis and smart
              recommendations.

            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">

            <h2 className="text-3xl font-bold mb-4">

              👨‍🏫 Mentor System

            </h2>

            <p className="text-slate-400 text-lg">

              Mentors can track
              students and monitor
              productivity live.

            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">

            <h2 className="text-3xl font-bold mb-4">

              📲 Installable App

            </h2>

            <p className="text-slate-400 text-lg">

              Install as mobile or
              desktop app using
              PWA support.

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}