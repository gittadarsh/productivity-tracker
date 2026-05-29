import {
  generateMemoryInsights,
} from "../utils/memoryEngine";

export default function AdvancedWeeklyReport({

  history,

}) {

  const insights =
    generateMemoryInsights(
      history
    );

  return (

    <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

      <h2 className="text-4xl font-black mb-8">

        📊 Intelligence Report

      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div>

          <p className="text-slate-400">

            Strongest Day

          </p>

          <h3 className="text-3xl font-black mt-3 text-green-400">

            {insights.strongestDay}

          </h3>

        </div>

        <div>

          <p className="text-slate-400">

            Weakest Day

          </p>

          <h3 className="text-3xl font-black mt-3 text-red-400">

            {insights.weakestDay}

          </h3>

        </div>

        <div>

          <p className="text-slate-400">

            Avg Productivity

          </p>

          <h3 className="text-3xl font-black mt-3 text-cyan-400">

            {insights.averageScore}

          </h3>

        </div>

      </div>

    </div>
  );
}