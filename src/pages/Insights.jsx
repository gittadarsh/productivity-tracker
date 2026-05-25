export default function Insights() {

  const insights = [

    {
      title: "🔥 Best Productivity Day",
      description:
        "You perform best on Thursdays with 92% task completion.",
    },

    {
      title: "📚 Reading Improvement",
      description:
        "Your reading consistency improved by 18% this week.",
    },

    {
      title: "💪 Fitness Alert",
      description:
        "Fitness habit completion dropped in the last 3 days.",
    },

    {
      title: "⚡ Peak Performance",
      description:
        "You are most productive between 7 PM and 10 PM.",
    },

    {
      title: "🎯 Goal Focus",
      description:
        "Development goals are progressing faster than others.",
    },
  ];

  return (

    <div>

      <h1 className="text-5xl font-bold mb-10">
        🧠 AI Productivity Insights
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {insights.map((insight, index) => (

          <div
            key={index}

            className="bg-slate-800 p-8 rounded-3xl shadow-xl hover:scale-105 transition duration-300 border border-cyan-500"
          >

            <h2 className="text-3xl font-bold mb-4 text-cyan-400">
              {insight.title}
            </h2>

            <p className="text-xl text-slate-300 leading-relaxed">
              {insight.description}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}