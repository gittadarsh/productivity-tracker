import PageWrapper from "../components/PageWrapper";

import PremiumCard from "../components/PremiumCard";

import {
  Trophy,
  Flame,
  Brain,
} from "lucide-react";

const students = [

  {
    id: 1,

    name:
      "Adarsh Kumar",

    xp: 450,

    streak: 12,

    score: 82,
  },

  {
    id: 2,

    name:
      "Rahul",

    xp: 320,

    streak: 8,

    score: 65,
  },

  {
    id: 3,

    name:
      "Priya",

    xp: 270,

    streak: 5,

    score: 58,
  },
];

export default function Students() {

  return (

    <PageWrapper>

      <div className="space-y-8 pb-20">

        {/* HERO */}

        <div className="rounded-[40px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 p-8 xl:p-12">

          <h1 className="text-5xl xl:text-7xl font-black bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">

            Student Directory

          </h1>

          <p className="text-slate-400 text-xl mt-4">

            Monitor student productivity and engagement.

          </p>

        </div>

        {/* STUDENTS */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {students.map(
            (student) => (

              <PremiumCard
                key={student.id}
                className="rounded-[36px] p-8 border border-white/10 bg-white/[0.03]"
              >

                <div className="flex items-start justify-between">

                  <div>

                    <h2 className="text-3xl font-black">

                      {student.name}

                    </h2>

                    <p className="text-slate-400 mt-2">

                      Productivity Student

                    </p>

                  </div>

                  <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-2xl font-black">

                    {student.name[0]}

                  </div>

                </div>

                {/* STATS */}

                <div className="grid grid-cols-3 gap-4 mt-8">

                  <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 text-center">

                    <Trophy className="mx-auto text-cyan-400" />

                    <h3 className="text-2xl font-black mt-3">

                      {student.xp}

                    </h3>

                    <p className="text-slate-400 text-sm mt-1">

                      XP

                    </p>

                  </div>

                  <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 text-center">

                    <Flame className="mx-auto text-orange-400" />

                    <h3 className="text-2xl font-black mt-3">

                      {student.streak}

                    </h3>

                    <p className="text-slate-400 text-sm mt-1">

                      Streak

                    </p>

                  </div>

                  <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 text-center">

                    <Brain className="mx-auto text-green-400" />

                    <h3 className="text-2xl font-black mt-3">

                      {student.score}%

                    </h3>

                    <p className="text-slate-400 text-sm mt-1">

                      Score

                    </p>

                  </div>

                </div>

              </PremiumCard>
            )
          )}

        </div>

      </div>

    </PageWrapper>
  );
}