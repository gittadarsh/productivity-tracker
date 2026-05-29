export default function WeeklyReport({

  history,

}) {

  const totalXP =
    history.reduce(

      (
        acc,
        item
      ) =>

        acc +
        (item.xp || 0),

      0
    );

  const totalSessions =
    history.reduce(

      (
        acc,
        item
      ) =>

        acc +
        (item.sessions || 0),

      0
    );

  const avgScore =
    history.length

      ? Math.floor(

          history.reduce(

            (
              acc,
              item
            ) =>

              acc +

              (
                item.productivityScore ||
                0
              ),

            0
          ) /

          history.length
        )

      : 0;

  return (

    <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

      <h2 className="text-4xl font-black mb-8">

        📊 Weekly Report

      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div>

          <p className="text-slate-400">

            Total XP

          </p>

          <h3 className="text-5xl font-black mt-3">

            {totalXP}

          </h3>

        </div>

        <div>

          <p className="text-slate-400">

            Focus Sessions

          </p>

          <h3 className="text-5xl font-black mt-3">

            {totalSessions}

          </h3>

        </div>

        <div>

          <p className="text-slate-400">

            Avg Productivity

          </p>

          <h3 className="text-5xl font-black mt-3">

            {avgScore}

          </h3>

        </div>

      </div>

    </div>
  );
}