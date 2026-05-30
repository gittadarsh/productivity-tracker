import {
  motion,
} from "framer-motion";

import {
  Link,
} from "react-router-dom";

import ProductivityHeader from "../components/ProductivityHeader";

import AICoachDashboard from "../components/AICoachDashboard";

import XPProgress from "../components/XPProgress";

import PremiumCard from "../components/PremiumCard";

import AIAlerts from "../components/AIAlerts";

import RealtimeActivityFeed from "../components/RealtimeActivityFeed";

import AIRecommendations from "../components/AIRecommendations";

import {
  useProductivityStore,
} from "../store/useProductivityStore";

export default function Dashboard() {

  const productivity =
    useProductivityStore();

  const quickActions = [

    {
      title: "Focus",
      icon: "🧠",
      path: "/focus",
    },

    {
      title: "Analytics",
      icon: "📈",
      path: "/analytics",
    },

    {
      title: "Missions",
      icon: "🚀",
      path: "/missions",
    },

    {
      title: "Achievements",
      icon: "🏆",
      path: "/achievements",
    },
  ];

  const statCards = [

    {
      title: "Total XP",
      value:
        productivity.xp,

      icon: "⚡",

      color:
        "text-cyan-400",
    },

    {
      title:
        "Focus Sessions",

      value:
        productivity.sessions,

      icon: "🧠",

      color:
        "text-purple-400",
    },

    {
      title:
        "Current Streak",

      value:
        productivity.streak,

      icon: "🔥",

      color:
        "text-orange-400",
    },

    {
      title:
        "Productivity Score",

      value:
        productivity.score,

      icon: "📈",

      color:
        "text-green-400",
    },
  ];

  if (
    productivity.loading
  ) {

    return (

      <div className="min-h-screen bg-slate-950 text-white p-8">

        <div className="animate-pulse space-y-8">

          <div className="h-52 rounded-[40px] bg-white/5" />

        </div>

      </div>
    );
  }

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

            Productivity Intelligence

          </p>

          <h1 className="text-5xl md:text-7xl font-black mt-6 leading-tight">

            Build{" "}

            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              elite consistency

            </span>

          </h1>

          <p className="text-slate-400 text-lg md:text-xl mt-6 max-w-3xl leading-relaxed">

            AI-powered productivity operating system.

          </p>

        </div>

      </motion.div>

      <ProductivityHeader />

      <AICoachDashboard />

      <XPProgress />

      {/* COMMAND CENTER */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <PremiumCard className="p-8">

          <p className="text-cyan-400 uppercase tracking-[5px] text-sm font-semibold">

            AI Momentum Analysis

          </p>

          <h2 className="text-4xl font-black mt-5 leading-tight">

            Productivity momentum is improving strongly.

          </h2>

          <p className="text-slate-400 text-lg mt-5 leading-relaxed">

            Your behavioral consistency and focus quality indicate strong growth patterns.

          </p>

        </PremiumCard>

        <AIRecommendations />

      </div>

      {/* LIVE SECTION */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <div>

          <h2 className="text-4xl font-black mb-6">

            Live Activity

          </h2>

          <RealtimeActivityFeed />

        </div>

        <div>

          <h2 className="text-4xl font-black mb-6">

            AI Alerts

          </h2>

          <AIAlerts />

        </div>

      </div>

      {/* QUICK ACTIONS */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

        {quickActions.map(
          (
            action,
            index
          ) => (

            <Link
              key={index}
              to={action.path}
            >

              <motion.div

                whileHover={{
                  y: -5,
                }}

                transition={{
                  duration: 0.25,
                }}

                className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-7 shadow-2xl hover:bg-white/10 transition-all"
              >

                <div className="text-5xl">

                  {action.icon}

                </div>

                <h3 className="text-2xl font-black mt-6">

                  {action.title}

                </h3>

              </motion.div>

            </Link>
          )
        )}

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {statCards.map(
          (
            stat,
            index
          ) => (

            <PremiumCard
              key={index}
              className="p-7"
            >

              <div className="text-5xl">

                {stat.icon}

              </div>

              <p className="text-slate-400 mt-7 text-lg">

                {stat.title}

              </p>

              <h2 className={`

              text-5xl md:text-6xl font-black mt-4

              ${stat.color}`}
              >

                {stat.value}

              </h2>

            </PremiumCard>
          )
        )}

      </div>

    </div>
  );
}