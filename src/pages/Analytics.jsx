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
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,

} from "recharts";

export default function Analytics() {

  /* WEEKLY PRODUCTIVITY */

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

  /* HABIT PERFORMANCE */

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

  /* QUESTION ANALYTICS */

  const questionData = [

    {
      topic: "Arrays",
      solved: 18,
    },

    {
      topic: "Graphs",
      solved: 10,
    },

    {
      topic: "DP",
      solved: 7,
    },

    {
      topic: "Trees",
      solved: 13,
    },

    {
      topic: "Binary Search",
      solved: 15,
    },
  ];

  /* PRODUCTIVITY DISTRIBUTION */

  const productivityData = [

    {
      name: "Completed",
      value: 75,
    },

    {
      name: "Missed",
      value: 25,
    },
  ];

  const COLORS = [

    "#06b6d4",

    "#ef4444",
  ];

  return (

    <div>

      <h1 className="text-5xl font-bold mb-10">

        📈 Enterprise Analytics Dashboard

      </h1>

      {/* TOP ANALYTICS CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-8 rounded-3xl shadow-2xl">

          <h2 className="text-2xl font-bold mb-4">

            Productivity Score

          </h2>

          <p className="text-5xl font-bold">

            87%

          </p>

        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-3xl shadow-2xl">

          <h2 className="text-2xl font-bold mb-4">

            Questions Solved

          </h2>

          <p className="text-5xl font-bold">

            63

          </p>

        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-500 p-8 rounded-3xl shadow-2xl">

          <h2 className="text-2xl font-bold mb-4">

            Current Streak

          </h2>

          <p className="text-5xl font-bold">

            12

          </p>

        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-8 rounded-3xl shadow-2xl">

          <h2 className="text-2xl font-bold mb-4">

            AI Consistency

          </h2>

          <p className="text-5xl font-bold">

            High

          </p>

        </div>

      </div>

      {/* WEEKLY PRODUCTIVITY */}

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl mb-10">

        <h2 className="text-3xl font-bold mb-8">

          📊 Weekly Productivity Trend

        </h2>

        <div className="w-full h-[400px]">

          <ResponsiveContainer>

            <AreaChart
              data={weeklyData}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="day" />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="productivity"
                stroke="#06b6d4"
                fill="#06b6d4"
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* SECOND ROW */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">

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

        {/* PRODUCTIVITY PIE */}

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl">

          <h2 className="text-3xl font-bold mb-8">

            🎯 Productivity Distribution

          </h2>

          <div className="w-full h-[400px]">

            <ResponsiveContainer>

              <PieChart>

                <Pie
                  data={
                    productivityData
                  }

                  cx="50%"

                  cy="50%"

                  outerRadius={120}

                  dataKey="value"

                  label
                >

                  {
                    productivityData.map(
                      (
                        entry,
                        index
                      ) => (

                        <Cell
                          key={`cell-${index}`}

                          fill={
                            COLORS[
                              index
                            ]
                          }
                        />
                      )
                    )
                  }

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* QUESTION ANALYTICS */}

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl">

        <h2 className="text-3xl font-bold mb-8">

          📚 Question Solving Analytics

        </h2>

        <div className="w-full h-[400px]">

          <ResponsiveContainer>

            <LineChart
              data={questionData}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="topic" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="solved"
                stroke="#f59e0b"
                strokeWidth={4}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}