import PremiumCard from "./PremiumCard";

import {
  useProductivityStore,
} from "../store/useProductivityStore";

import {
  generateFocusHeat,
} from "../utils/focusHeatEngine";

export default function FocusHeatCard() {

  const productivity =
    useProductivityStore();

  const heat =
    generateFocusHeat(

      productivity.sessions
    );

  return (

    <PremiumCard className="p-8">

      <h2 className="text-4xl font-black mb-8">

        Focus Heat Intelligence

      </h2>

      <div className="grid grid-cols-2 gap-5">

        <div className="rounded-2xl bg-white/5 border border-white/10 p-5">

          <p className="text-slate-400">

            Peak Window

          </p>

          <h2 className="text-4xl font-black mt-4 text-cyan-400">

            {heat.peak}

          </h2>

        </div>

        <div className="rounded-2xl bg-white/5 border border-white/10 p-5">

          <p className="text-slate-400">

            Focus Strength

          </p>

          <h2 className="text-4xl font-black mt-4 text-purple-400">

            {heat.strength}

          </h2>

        </div>

      </div>

    </PremiumCard>
  );
}