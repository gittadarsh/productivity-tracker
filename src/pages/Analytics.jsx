import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Analytics() {

  const data = [
    {
      name: "Mon",
      completed: 3,
    },
    {
      name: "Tue",
      completed: 4,
    },
    {
      name: "Wed",
      completed: 2,
    },
    {
      name: "Thu",
      completed: 5,
    },
    {
      name: "Fri",
      completed: 4,
    },
    {
      name: "Sat",
      completed: 5,
    },
    {
      name: "Sun",
      completed: 3,
    },
  ];

  return (

    <div>

      {/* TITLE */}

      <h1 className="text-5xl font-bold mb-10">
        📈 Analytics
      </h1>

      {/* TOP STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-slate-800 p-8 rounded-3xl shadow-xl">

          <h2 className="text-2xl mb-3 font-semibold">
            Weekly Completion
          </h2>

          <p className="text-5xl font-bold">
            82%
          </p>

        </div>

        <div className="bg-slate-800 p-8 rounded-3xl shadow-xl">

          <h2 className="text-2xl mb-3 font-semibold">
            Best Day
          </h2>

          <p className="text-5xl font-bold">
            Thursday
          </p>

        </div>

        <div className="bg-slate-800 p-8 rounded-3xl shadow-xl">

          <h2 className="text-2xl mb-3 font-semibold">
            Total Streak
          </h2>

          <p className="text-5xl font-bold">
            14 Days
          </p>

        </div>

      </div>

      {/* CHART */}

      <div className="bg-slate-800 p-8 rounded-3xl shadow-xl">

        <h2 className="text-3xl font-bold mb-8">
          Weekly Productivity
        </h2>

        <div className="w-full h-[400px]">

          <ResponsiveContainer width="100%" height="100%">

            <BarChart data={data}>

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="completed"
                radius={[10, 10, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}