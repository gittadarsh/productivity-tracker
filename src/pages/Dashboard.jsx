import PageWrapper from "../components/PageWrapper";

export default function Dashboard() {

  return (

    <PageWrapper>

      <div className="space-y-8 pb-20">

        {/* HERO */}

        <div className="rounded-[42px] overflow-hidden border border-white/10 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-slate-900 p-8 xl:p-12">

          <div className="space-y-5">

            <p className="uppercase tracking-[10px] text-cyan-400 text-sm xl:text-lg font-bold">

              Accountability System

            </p>

            <h1 className="text-5xl xl:text-7xl font-black leading-none max-w-5xl bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">

              Build real consistency.

            </h1>

            <p className="text-slate-400 text-lg xl:text-2xl max-w-3xl leading-relaxed">

              Focus on goals, streaks, reminders, and long-term accountability.

            </p>

          </div>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8">

            <p className="text-slate-400">
              Current Streak
            </p>

            <h2 className="text-5xl font-black mt-4 text-orange-400">
              12
            </h2>

          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8">

            <p className="text-slate-400">
              Weekly Consistency
            </p>

            <h2 className="text-5xl font-black mt-4 text-cyan-400">
              84%
            </h2>

          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8">

            <p className="text-slate-400">
              Upcoming Reminder
            </p>

            <h2 className="text-2xl font-black mt-4">
              CodeChef Contest
            </h2>

            <p className="text-slate-400 mt-2">
              Wednesday • 7:30 PM
            </p>

          </div>

        </div>

        {/* TODAY GOALS */}

        <div className="rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-xl p-8">

          <h2 className="text-4xl font-black mb-8">
            Today's Goals
          </h2>

          <div className="space-y-5">

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

              <div>

                <h3 className="text-2xl font-bold">
                  DSA Practice
                </h3>

                <p className="text-slate-400 mt-2">
                  Solve 3 questions
                </p>

              </div>

              <div className="flex gap-3">

                <button className="bg-green-500 hover:bg-green-600 transition px-5 py-3 rounded-2xl font-semibold">
                  Done
                </button>

                <button className="bg-yellow-500 hover:bg-yellow-600 transition px-5 py-3 rounded-2xl font-semibold">
                  Progress
                </button>

                <button className="bg-red-500 hover:bg-red-600 transition px-5 py-3 rounded-2xl font-semibold">
                  Missed
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </PageWrapper>
  );
}