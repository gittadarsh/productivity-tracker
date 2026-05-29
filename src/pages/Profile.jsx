import {
  useProductivity,
} from "../context/ProductivityContext";

import {
  getRewardData,
} from "../utils/rewardEngine";

import {
  getProductivityPersona,
} from "../utils/personaEngine";

import {
  generateMemoryInsights,
} from "../utils/productivityMemoryEngine";

import PremiumCard from "../components/PremiumCard";

import ProfileAnalytics from "../components/ProfileAnalytics";

export default function Profile() {

  const productivity =
    useProductivity();

  const reward =
    getRewardData(
      productivity.xp
    );

  const persona =
    getProductivityPersona(
      productivity
    );

  const memoryInsight =
    generateMemoryInsights({

      score:
        productivity.score,

      streak:
        productivity.streak,

      sessions:
        productivity.sessions,
    });

  const consistencyGrade =

    productivity.score >= 85
      ? "A+"

    : productivity.score >= 70
      ? "A"

    : productivity.score >= 55
      ? "B"

    : productivity.score >= 40
      ? "C"

    : "D";

  const strongestMetric =

    productivity.streak >= 10
      ? "Consistency"

    : productivity.sessions >= 20
      ? "Deep Work"

    : productivity.xp >= 1500
      ? "Momentum"

    : "Growth";

  return (

    <div className="space-y-8">

      {/* HERO */}

      <div className="rounded-[40px] border border-white/10 bg-gradient-to-br from-purple-500/10 to-pink-500/5 backdrop-blur-xl p-10 shadow-2xl">

        <h1 className="text-6xl font-black">

          Productivity Profile

        </h1>

        <p className="text-slate-400 text-xl mt-5 max-w-3xl">

          Your behavioral productivity identity and AI performance profile.

        </p>

      </div>

      {/* PERSONA */}

      <PremiumCard className="p-8">

        <p className="text-cyan-400 uppercase tracking-[5px] text-sm font-semibold">

          Productivity Persona

        </p>

        <h2 className="text-5xl font-black mt-5">

          {persona.title}

        </h2>

        <p className="text-slate-400 text-lg mt-5 max-w-3xl">

          {persona.description}

        </p>

      </PremiumCard>

      {/* AI MEMORY */}

      <PremiumCard className="p-8">

        <p className="text-orange-400 uppercase tracking-[5px] text-sm font-semibold">

          AI Productivity Memory

        </p>

        <h2 className="text-4xl font-black mt-5">

          Behavioral Insight

        </h2>

        <p className="text-slate-400 text-lg mt-5 leading-relaxed">

          {memoryInsight.message}

        </p>

      </PremiumCard>

      {/* GRID */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <PremiumCard className="p-8">

          <p className="text-slate-400">

            Current Rank

          </p>

          <h2 className="text-4xl font-black mt-5 text-cyan-400">

            {reward.title}

          </h2>

        </PremiumCard>

        <PremiumCard className="p-8">

          <p className="text-slate-400">

            Reward Status

          </p>

          <h2 className="text-3xl font-black mt-5 text-purple-400">

            {reward.reward}

          </h2>

        </PremiumCard>

        <PremiumCard className="p-8">

          <p className="text-slate-400">

            Consistency Grade

          </p>

          <h2 className="text-5xl font-black mt-5 text-green-400">

            {consistencyGrade}

          </h2>

        </PremiumCard>

        <PremiumCard className="p-8">

          <p className="text-slate-400">

            Strongest Metric

          </p>

          <h2 className="text-4xl font-black mt-5 text-orange-400">

            {strongestMetric}

          </h2>

        </PremiumCard>

      </div>

      {/* PRODUCTIVITY STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <PremiumCard className="p-8">

          <p className="text-slate-400">

            Level

          </p>

          <h2 className="text-6xl font-black mt-5">

            {productivity.level}

          </h2>

        </PremiumCard>

        <PremiumCard className="p-8">

          <p className="text-slate-400">

            Productivity Score

          </p>

          <h2 className="text-6xl font-black mt-5 text-cyan-400">

            {productivity.score}

          </h2>

        </PremiumCard>

        <PremiumCard className="p-8">

          <p className="text-slate-400">

            Current Streak

          </p>

          <h2 className="text-6xl font-black mt-5 text-orange-400">

            {productivity.streak}

          </h2>

        </PremiumCard>

      </div>

      {/* ANALYTICS */}

      <ProfileAnalytics />

    </div>
  );
}