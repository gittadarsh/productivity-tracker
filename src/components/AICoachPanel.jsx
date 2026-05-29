import {
  generateRecommendations,
} from "../utils/recommendationEngine";

import {
  useProductivity,
} from "../context/ProductivityContext";

export default function AICoachPanel() {

  const productivity =
    useProductivity();

  const recommendations =
    generateRecommendations(
      productivity
    );

  return (

    <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 backdrop-blur-xl p-8 shadow-2xl">

      <p className="text-cyan-400 uppercase tracking-[6px] text-sm font-semibold">

        AI Productivity Coach

      </p>

      <h2 className="text-5xl font-black mt-6">

        Personalized
        {" "}

        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

          Guidance

        </span>

      </h2>

      <div className="space-y-5 mt-10">

        {recommendations.map(
          (
            item,
            index
          ) => (

            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >

              <p className="text-lg leading-relaxed text-slate-300">

                {item}

              </p>

            </div>
          )
        )}

      </div>

    </div>
  );
}