import {
  useProductivityStore,
} from "../store/useProductivityStore";

import {
  generateRecommendations,
} from "../utils/recommendationEngine";

import PremiumCard from "./PremiumCard";

export default function AIRecommendations() {

  const productivity =
    useProductivityStore();

  const recommendations =
    generateRecommendations({

      score:
        productivity.score,

      streak:
        productivity.streak,

      sessions:
        productivity.sessions,
    });

  return (

    <PremiumCard className="p-8">

      <h2 className="text-4xl font-black mb-8">

        AI Recommendations

      </h2>

      <div className="space-y-5">

        {recommendations.map(
          (
            item,
            index
          ) => (

            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >

              <p className="text-lg text-slate-300">

                {item}

              </p>

            </div>
          )
        )}

      </div>

    </PremiumCard>
  );
}