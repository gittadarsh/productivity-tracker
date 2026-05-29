import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from "recharts";

import PremiumCard from "./PremiumCard";

export default function ProfileAnalytics() {

  const data = [

    {
      day: "Mon",
      xp: 100,
    },

    {
      day: "Tue",
      xp: 220,
    },

    {
      day: "Wed",
      xp: 400,
    },

    {
      day: "Thu",
      xp: 550,
    },

    {
      day: "Fri",
      xp: 800,
    },
  ];

  return (

    <PremiumCard className="p-8">

      <h2 className="text-4xl font-black mb-8">

        Productivity Growth

      </h2>

      <div className="h-[320px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart
            data={data}
          >

            <XAxis
              dataKey="day"
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="xp"
              stroke="#06b6d4"
              strokeWidth={4}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </PremiumCard>
  );
}