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
      completed: 4,
    },

    {
      name: "Tue",
      completed: 3,
    },

    {
      name: "Wed",
      completed: 5,
    },

    {
      name: "Thu",
      completed: 2,
    },

    {
      name: "Fri",
      completed: 5,
    },

    {
      name: "Sat",
      completed: 4,
    },

    {
      name: "Sun",
      completed: 3,
    },
  ];

  const total =
    data.reduce(
      (acc, item) =>
        acc + item.completed,
      0
    );

  const average =
    (
      total / data.length
    ).toFixed(1);

  const bestDay =
    data.reduce((prev, current) =>
      prev.completed >
      current.completed
        ? prev
        : current
    );

  return (

    <div>

      <h1 className="text-4xl font-bold mb-10 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

        📊 Advanced Analytics

      </h1>

      {/* TOP CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl">

          <h2 className="text-2xl mb-4 text-slate-300">
            Weekly Total
          </h2>

          <p className="text-5xl font-bold text-cyan-400">
            {total}
          </p>

        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl">

          <h2 className="text-2xl mb-4 text-slate-300">
            Daily Average
          </h2>

          <p className="text-5xl font-bold text-green-400">
            {average}
          </p>

        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl">

          <h2 className="text-2xl mb-4 text-slate-300">
            Best Day
          </h2>

          <p className="text-5xl font-bold text-yellow-400">
            {bestDay.name}
          </p>

        </div>

      </div>

      {/* CHART */}

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl">

        <h2 className="text-3xl font-bold mb-8">

          Weekly Progress

        </h2>

        <ResponsiveContainer
          width="100%"
          height={400}
        >

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
  );
}