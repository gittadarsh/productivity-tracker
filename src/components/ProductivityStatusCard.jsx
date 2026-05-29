import {
  useProductivity,
} from "../context/ProductivityContext";

export default function ProductivityStatusCard() {

  const {

    score,
    streak,
    level,

  } = useProductivity();

  let status =
    "Declining";

  let color =
    "text-red-400";

  if (
    score >= 80 &&
    streak >= 7
  ) {

    status =
      "Peak Performance";

    color =
      "text-green-400";

  } else if (
    score >= 60
  ) {

    status =
      "Strong Momentum";

    color =
      "text-cyan-400";

  } else if (
    score >= 40
  ) {

    status =
      "Balanced";

    color =
      "text-yellow-400";
  }

  return (

    <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

      <p className="text-slate-400">

        Productivity Status

      </p>

      <h2 className={`

      text-5xl font-black mt-5

      ${color}`}
      >

        {status}

      </h2>

      <div className="grid grid-cols-3 gap-4 mt-8">

        <div>

          <p className="text-slate-400 text-sm">

            Level

          </p>

          <h3 className="text-3xl font-black mt-2">

            {level}

          </h3>

        </div>

        <div>

          <p className="text-slate-400 text-sm">

            Score

          </p>

          <h3 className="text-3xl font-black mt-2">

            {score}

          </h3>

        </div>

        <div>

          <p className="text-slate-400 text-sm">

            Streak

          </p>

          <h3 className="text-3xl font-black mt-2">

            {streak}

          </h3>

        </div>

      </div>

    </div>
  );
}