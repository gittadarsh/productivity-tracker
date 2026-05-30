import PageWrapper from "../components/PageWrapper";

import PremiumCard from "../components/PremiumCard";

import {
  BarChart3,
  Activity,
  Trophy,
  Flame,
} from "lucide-react";

import {
  useHabitStore,
} from "../store/habitStore";

import {
  generateAnalytics,
} from "../utils/analyticsEngine";

export default function Analytics() {

  const { habits } =
    useHabitStore();

  const analytics =
    generateAnalytics(
      habits
    );

  const cards = [

    {
      title:
        "Completion Rate",

      value:
        `${analytics.completionRate}%`,

      icon: Activity,

      color:
        "text-cyan-400",

      bg:
        "from-cyan-500/20 to-blue-500/10",
    },

    {
      title:
        "Completed Habits",

      value:
        analytics.completedHabits,

      icon: Trophy,

      color:
        "text-green-400",

      bg:
        "from-green-500/20 to-emerald-500/10",
    },

    {
      title:
        "Average Streak",

      value:
        analytics.averageStreak,

      icon: Flame,

      color:
        "text-orange-400",

      bg:
        "from-orange-500/20 to-red-500/10",
    },

    {
      title:
        "Productivity Rank",

      value:
        analytics.productivityLabel,

      icon: BarChart3,

      color:
        "text-purple-400",

      bg:
        "from-purple-500/20 to-pink-500/10",
    },
  ];

  return (

    <PageWrapper>

      <div className="space-y-8 pb-20">

        {/* HERO */}

        <div className="rounded-[40px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 p-8 xl:p-12">

          <h1 className="text-5xl xl:text-7xl font-black bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">

            Analytics

          </h1>

          <p className="text-slate-400 text-xl mt-4">

            Track consistency and performance intelligently.

          </p>

        </div>

        {/* CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {cards.map((card) => {

            const Icon =
              card.icon;

            return (

              <PremiumCard
                key={card.title}
                className={`

                rounded-[36px]

                p-8 border border-white/10

                bg-gradient-to-br ${card.bg}
                `}
              >

                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-slate-400 text-lg">

                      {card.title}

                    </p>

                    <h2 className={`

                    text-4xl xl:text-5xl font-black mt-5

                    ${card.color}
                    `}>

                      {card.value}

                    </h2>

                  </div>

                  <div className={`

                  w-14 h-14 rounded-3xl

                  bg-white/10

                  flex items-center justify-center

                  ${card.color}
                  `}>

                    <Icon size={26} />

                  </div>

                </div>

              </PremiumCard>
            );
          })}

        </div>

        {/* INSIGHTS */}

        <PremiumCard className="rounded-[40px] p-8 border border-white/10 bg-white/[0.03]">

          <h2 className="text-3xl font-black mb-6">

            AI Insights

          </h2>

          <div className="space-y-4 text-lg text-slate-300">

            <p>

              • Your current completion rate is{" "}

              <span className="text-cyan-400 font-bold">

                {analytics.completionRate}%

              </span>

            </p>

            <p>

              • Your productivity level is classified as{" "}

              <span className="text-purple-400 font-bold">

                {analytics.productivityLabel}

              </span>

            </p>

            <p>

              • Consistency improves exponentially after a 7-day streak.

            </p>

            <p>

              • Elite productivity systems prioritize consistency over intensity.

            </p>

          </div>

        </PremiumCard>

      </div>

    </PageWrapper>
  );
}