import PremiumCard from "./PremiumCard";

import {
  useProductivityStore,
} from "../store/useProductivityStore";

import {
  generateAIBrain,
} from "../utils/aiBrainEngine";

export default function AIBrainPanel() {

  const productivity =
    useProductivityStore();

  const ai =
    generateAIBrain(
      productivity
    );

  return (

    <PremiumCard className="p-8">

      <div className="flex items-center justify-between gap-5 flex-wrap">

        <div>

          <p className="text-cyan-400 uppercase tracking-[5px] text-sm font-semibold">

            AI Intelligence Core

          </p>

          <h2 className="text-5xl font-black mt-5">

            {ai.persona.title}

          </h2>

        </div>

        <div className={`

        px-5 py-3 rounded-2xl font-bold text-lg

        ${
          ai.status === "elite"

            ? "bg-green-500/20 text-green-400"

          : ai.status === "warning"

            ? "bg-red-500/20 text-red-400"

            : "bg-cyan-500/20 text-cyan-400"
        }
        `}>

          {ai.status.toUpperCase()}

        </div>

      </div>

      <p className="text-slate-400 text-lg mt-8 leading-relaxed">

        {ai.memory.message}

      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">

        <div className="rounded-2xl bg-white/5 border border-white/10 p-5">

          <p className="text-slate-400">

            Weekly Growth

          </p>

          <h2 className="text-4xl font-black mt-4 text-cyan-400">

            {ai.analytics.weeklyGrowth}

          </h2>

        </div>

        <div className="rounded-2xl bg-white/5 border border-white/10 p-5">

          <p className="text-slate-400">

            Consistency

          </p>

          <h2 className="text-4xl font-black mt-4 text-orange-400">

            {ai.analytics.consistency}

          </h2>

        </div>

        <div className="rounded-2xl bg-white/5 border border-white/10 p-5">

          <p className="text-slate-400">

            Focus Strength

          </p>

          <h2 className="text-4xl font-black mt-4 text-purple-400">

            {ai.analytics.focusStrength}

          </h2>

        </div>

      </div>

      <div className="mt-10">

        <h3 className="text-2xl font-black mb-5">

          AI Recommendations

        </h3>

        <div className="space-y-4">

          {ai.recommendations.map(
            (
              item,
              index
            ) => (

              <div
                key={index}
                className="rounded-2xl bg-white/5 border border-white/10 p-5"
              >

                <p className="text-slate-300 text-lg">

                  {item}

                </p>

              </div>
            )
          )}

        </div>

      </div>

    </PremiumCard>
  );
}