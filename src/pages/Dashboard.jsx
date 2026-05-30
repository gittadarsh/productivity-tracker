import PageWrapper from "../components/PageWrapper";

import PremiumCard from "../components/PremiumCard";

import XPProgress from "../components/XPProgress";

import AIBrainPanel from "../components/AIBrainPanel";

import {
  Flame,
  Trophy,
  Brain,
  Zap,
} from "lucide-react";

import {
  useProductivityStore,
} from "../store/useProductivityStore";

import {
  useHabitStore,
} from "../store/habitStore";

import {
  generateDailyMissions,
} from "../utils/dailyMissionEngine";

import {
  generateAnalytics,
} from "../utils/analyticsEngine";

import {
  generateInsights,
} from "../utils/insightEngine";

export default function Dashboard() {

  const productivity =
    useProductivityStore();

  const {
    habits,
    xp,
  } = useHabitStore();

  const analytics =
    generateAnalytics(
      habits
    );

  const missions =
    generateDailyMissions(
      habits
    );

  const insights =
    generateInsights(
      analytics
    );

  const stats = [

    {
      title:
        "Current Streak",

      value:
        productivity.streak || 0,

      icon: Flame,

      color:
        "from-orange-500/20 to-red-500/10",

      text:
        "text-orange-400",
    },

    {
      title:
        "Level",

      value:
        productivity.level || 1,

      icon: Trophy,

      color:
        "from-purple-500/20 to-pink-500/10",

      text:
        "text-purple-400",
    },

    {
      title:
        "Productivity Score",

      value:
        analytics.completionRate || 0,

      icon: Brain,

      color:
        "from-green-500/20 to-emerald-500/10",

      text:
        "text-green-400",
    },

    {
      title:
        "XP",

      value:
        xp,

      icon: Zap,

      color:
        "from-cyan-500/20 to-blue-500/10",

      text:
        "text-cyan-400",
    },
  ];

  return (

    <PageWrapper>

      <div className="space-y-8 pb-20">

        {/* HERO */}

        <div className="rounded-[42px] overflow-hidden border border-white/10 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-slate-900 p-8 xl:p-12">

          <div className="space-y-5">

            <p className="uppercase tracking-[10px] text-cyan-400 text-sm xl:text-lg font-bold">

              Productivity Intelligence

            </p>

            <h1 className="text-5xl xl:text-7xl font-black leading-none max-w-5xl bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">

              Build elite consistency.

            </h1>

            <p className="text-slate-400 text-lg xl:text-2xl max-w-3xl leading-relaxed">

              Transform your focus, habits, and productivity into an intelligent operating system.

            </p>

          </div>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {stats.map((stat) => {

            const Icon =
              stat.icon;

            return (

              <PremiumCard
                key={stat.title}
                className={`

                rounded-[36px]

                bg-gradient-to-br ${stat.color}

                p-8 border border-white/10
                `}
              >

                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-slate-400 text-base xl:text-lg">

                      {stat.title}

                    </p>

                    <h2 className={`

                    text-4xl xl:text-5xl font-black mt-6

                    ${stat.text}
                    `}>

                      {stat.value}

                    </h2>

                  </div>

                  <div className={`

                  w-14 h-14 xl:w-16 xl:h-16 rounded-3xl

                  bg-white/10

                  flex items-center justify-center

                  ${stat.text}
                  `}>

                    <Icon size={28} />

                  </div>

                </div>

              </PremiumCard>
            );
          })}

        </div>

        {/* XP PROGRESS */}

        <XPProgress />

        {/* DAILY MISSIONS + INSIGHTS */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* DAILY MISSIONS */}

          <PremiumCard className="rounded-[36px] p-8 border border-white/10 bg-white/[0.03]">

            <h2 className="text-3xl font-black mb-6">

              Daily Missions

            </h2>

            <div className="space-y-4">

              {missions.map(
                (mission) => (

                  <div
                    key={mission.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 flex items-center justify-between"
                  >

                    <div>

                      <h3 className="text-xl font-semibold">

                        {mission.title}

                      </h3>

                      <p className="text-slate-400 mt-1">

                        +{mission.xp} XP

                      </p>

                    </div>

                    <div className={`

                    px-4 py-2 rounded-xl text-sm font-bold

                    ${
                      mission.completed
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }
                    `}>

                      {mission.completed
                        ? "Completed"
                        : "Pending"}

                    </div>

                  </div>
                )
              )}

            </div>

          </PremiumCard>

          {/* AI INSIGHTS */}

          <PremiumCard className="rounded-[36px] p-8 border border-white/10 bg-white/[0.03]">

            <h2 className="text-3xl font-black mb-6">

              AI Insights

            </h2>

            <div className="space-y-4">

              {insights.length === 0 && (

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-slate-400">

                  Start completing habits to unlock insights.

                </div>
              )}

              {insights.map(
                (
                  insight,
                  index
                ) => (

                  <div
                    key={index}
                    className="rounded-2xl border border-cyan-500/10 bg-cyan-500/5 p-5 text-lg text-slate-300"
                  >

                    {insight}

                  </div>
                )
              )}

            </div>

          </PremiumCard>

        </div>

        {/* AI BRAIN */}

        <AIBrainPanel />

      </div>

    </PageWrapper>
  );
}