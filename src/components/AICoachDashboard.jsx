import {
  useProductivity,
} from "../context/ProductivityContext";

import {
  generateRecommendations,
} from "../utils/recommendationEngine";

import {
  getProductivityPersona,
} from "../utils/personaEngine";

export default function AICoachDashboard() {

  const productivity =
    useProductivity();

  const recommendations =
    generateRecommendations(
      productivity
    );

  const persona =
    getProductivityPersona(
      productivity
    );

  return (

    <div className="rounded-[40px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 backdrop-blur-xl p-8 shadow-2xl">

      <p className="text-cyan-400 uppercase tracking-[6px] text-sm font-semibold">

        AI Productivity Coach

      </p>

      <h2 className="text-5xl font-black mt-6">

        {persona.title}

      </h2>

      <p className="text-slate-400 text-xl mt-5 max-w-3xl">

        {persona.description}

      </p>

      <div className="space-y-4 mt-10">

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

    </div>
  );
}