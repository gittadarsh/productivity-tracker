import {
  useProductivity,
} from "../context/ProductivityContext";

import {
  getRewardData,
} from "../utils/rewardEngine";

export default function Profile() {

  const productivity =
    useProductivity();

  const reward =
    getRewardData(
      productivity.xp
    );

  return (

    <div className="space-y-8">

      <div className="rounded-[40px] border border-white/10 bg-gradient-to-br from-purple-500/10 to-pink-500/5 backdrop-blur-xl p-10 shadow-2xl">

        <h1 className="text-6xl font-black">

          Productivity Profile

        </h1>

        <p className="text-slate-400 text-xl mt-5">

          Your behavioral productivity identity.

        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">

          <p className="text-slate-400">

            Current Rank

          </p>

          <h2 className="text-5xl font-black mt-5 text-cyan-400">

            {reward.title}

          </h2>

        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">

          <p className="text-slate-400">

            Reward Status

          </p>

          <h2 className="text-4xl font-black mt-5 text-purple-400">

            {reward.reward}

          </h2>

        </div>

      </div>

      <div className="grid grid-cols-3 gap-6">

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">

          <p className="text-slate-400">

            Level

          </p>

          <h2 className="text-5xl font-black mt-5">

            {productivity.level}

          </h2>

        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">

          <p className="text-slate-400">

            Score

          </p>

          <h2 className="text-5xl font-black mt-5">

            {productivity.score}

          </h2>

        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">

          <p className="text-slate-400">

            Streak

          </p>

          <h2 className="text-5xl font-black mt-5">

            {productivity.streak}

          </h2>

        </div>

      </div>

    </div>
  );
}