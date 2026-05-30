import PremiumCard from "./PremiumCard";

export default function ProfileInsights() {

  const insights = [

    "Your consistency improves significantly during structured deep work sessions.",

    "You perform best when momentum is maintained for multiple days.",

    "Your AI productivity identity is evolving positively.",

    "Your recent focus behavior indicates improving productivity discipline.",
  ];

  return (

    <PremiumCard className="p-8">

      <h2 className="text-4xl font-black mb-8">

        Behavioral Insights

      </h2>

      <div className="space-y-5">

        {insights.map(
          (
            insight,
            index
          ) => (

            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >

              <p className="text-lg text-slate-300 leading-relaxed">

                {insight}

              </p>

            </div>
          )
        )}

      </div>

    </PremiumCard>
  );
}