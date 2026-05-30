import {
  useProductivityStore,
} from "../store/useProductivityStore";

export default function ProductivityHeader() {

  const productivity =
    useProductivityStore();

  return (

    <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">

      <div className="rounded-[28px] border border-cyan-500/20 bg-cyan-500/10 p-6">

        <p className="text-slate-400">

          Total XP

        </p>

        <h2 className="text-5xl font-black mt-4 text-cyan-400">

          {productivity.xp}

        </h2>

      </div>

      <div className="rounded-[28px] border border-orange-500/20 bg-orange-500/10 p-6">

        <p className="text-slate-400">

          Streak

        </p>

        <h2 className="text-5xl font-black mt-4 text-orange-400">

          {productivity.streak}

        </h2>

      </div>

      <div className="rounded-[28px] border border-purple-500/20 bg-purple-500/10 p-6">

        <p className="text-slate-400">

          Level

        </p>

        <h2 className="text-5xl font-black mt-4 text-purple-400">

          {productivity.level}

        </h2>

      </div>

      <div className="rounded-[28px] border border-green-500/20 bg-green-500/10 p-6">

        <p className="text-slate-400">

          Productivity Score

        </p>

        <h2 className="text-5xl font-black mt-4 text-green-400">

          {productivity.score}

        </h2>

      </div>

    </div>
  );
}