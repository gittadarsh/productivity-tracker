export default function AIInsights({
  completed,
  total,
}) {

  const percentage =
    (completed / total) * 100;

  let message = "";

  if (percentage === 100) {

    message =
      "🔥 Perfect day! You're unstoppable.";

  } else if (percentage >= 70) {

    message =
      "🚀 Great progress! Keep pushing.";

  } else if (percentage >= 40) {

    message =
      "⚡ Decent work. You can do more.";

  } else {

    message =
      "💡 Small steps daily create success.";
  }

  return (

    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-8 rounded-3xl shadow-2xl mt-10">

      <h1 className="text-3xl font-bold mb-4">
        🧠 AI Productivity Insights
      </h1>

      <p className="text-xl mb-3">
        Productivity Score:
        {" "}
        {percentage.toFixed(0)}%
      </p>

      <p className="text-lg">
        {message}
      </p>

    </div>
  );
}