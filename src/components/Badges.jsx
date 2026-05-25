export default function Badges({
  completed,
}) {

  return (

    <div className="mt-10">

      <h1 className="text-3xl font-bold mb-6">
        🏆 Achievement Badges
      </h1>

      <div className="flex flex-wrap gap-5">

        {completed >= 1 && (

          <div className="bg-blue-500 px-6 py-4 rounded-2xl shadow-xl text-xl font-bold">

            🚀 Beginner
          </div>
        )}

        {completed >= 3 && (

          <div className="bg-orange-500 px-6 py-4 rounded-2xl shadow-xl text-xl font-bold">

            🔥 Consistent
          </div>
        )}

        {completed >= 5 && (

          <div className="bg-yellow-500 text-black px-6 py-4 rounded-2xl shadow-xl text-xl font-bold">

            👑 Discipline King
          </div>
        )}

      </div>

    </div>
  );
}