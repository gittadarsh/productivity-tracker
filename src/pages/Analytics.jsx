import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function Analytics() {

  const weeklyData = [

    {
      day: "Mon",
      productivity: 4,
    },

    {
      day: "Tue",
      productivity: 6,
    },

    {
      day: "Wed",
      productivity: 5,
    },

    {
      day: "Thu",
      productivity: 8,
    },

    {
      day: "Fri",
      productivity: 7,
    },

    {
      day: "Sat",
      productivity: 9,
    },

    {
      day: "Sun",
      productivity: 6,
    },
  ];

  const habitData = [

    {
      habit: "DSA",
      completed: 22,
    },

    {
      habit: "Development",
      completed: 18,
    },

    {
      habit: "Fitness",
      completed: 15,
    },

    {
      habit: "Reading",
      completed: 12,
    },

    {
      habit: "Debating",
      completed: 10,
    },
  ];

  return (

    <div>

      <h1 className="text-5xl font-bold mb-10">

        📈 Advanced Analytics

      </h1>

      {/* WEEKLY PRODUCTIVITY */}

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl mb-10">

        <h2 className="text-3xl font-bold mb-8">

          📊 Weekly Productivity Trend

        </h2>

        <div className="w-full h-[400px]">

          <ResponsiveContainer>

            <LineChart
              data={weeklyData}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="day" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="productivity"
                stroke="#06b6d4"
                strokeWidth={4}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* HABIT PERFORMANCE */}

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl">

        <h2 className="text-3xl font-bold mb-8">

          🏆 Habit Performance

        </h2>

        <div className="w-full h-[400px]">

          <ResponsiveContainer>

            <BarChart
              data={habitData}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="habit" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="completed"
                fill="#22c55e"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}