export default function Achievements() {

  const badges = [
    {
      title: "🔥 7 Day Streak",
      description:
        "Complete habits for 7 days continuously",
    },

    {
      title: "💪 Fitness Master",
      description:
        "Complete fitness habit 30 times",
    },

    {
      title: "📚 Reading Champion",
      description:
        "Read consistently for 15 days",
    },

    {
      title: "⚡ Consistency King",
      description:
        "Complete all habits in one day",
    },
  ];

  return (

    <div>

      <h1 className="text-5xl font-bold mb-10">
        🏆 Achievements
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {badges.map((badge, index) => (

          <div
            key={index}

            className="bg-slate-800 p-8 rounded-3xl shadow-xl hover:scale-105 transition duration-300"
          >

            <h2 className="text-3xl font-bold mb-4">
              {badge.title}
            </h2>

            <p className="text-xl text-slate-300">
              {badge.description}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}