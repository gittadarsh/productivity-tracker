import CalendarHeatmap from "react-calendar-heatmap";

import "react-calendar-heatmap/dist/styles.css";

export default function Heatmap() {

  const values = [
    { date: "2026-05-01", count: 1 },
    { date: "2026-05-02", count: 3 },
    { date: "2026-05-03", count: 2 },
    { date: "2026-05-04", count: 5 },
    { date: "2026-05-05", count: 4 },
    { date: "2026-05-06", count: 1 },
    { date: "2026-05-07", count: 2 },
    { date: "2026-05-08", count: 5 },
    { date: "2026-05-09", count: 3 },
    { date: "2026-05-10", count: 4 },
  ];

  return (

    <div>

      <h1 className="text-5xl font-bold mb-10">
        📅 Consistency Heatmap
      </h1>

      <div className="bg-slate-800 p-8 rounded-3xl shadow-xl overflow-x-auto">

        <CalendarHeatmap
          startDate={new Date("2026-05-01")}
          endDate={new Date("2026-06-01")}
          values={values}

          classForValue={(value) => {

            if (!value) {
              return "color-empty";
            }

            return `color-scale-${value.count}`;
          }}
        />

      </div>

      {/* CUSTOM COLORS */}

      <style>

        {`

        .react-calendar-heatmap .color-empty {
          fill: #1e293b;
        }

        .react-calendar-heatmap .color-scale-1 {
          fill: #14532d;
        }

        .react-calendar-heatmap .color-scale-2 {
          fill: #166534;
        }

        .react-calendar-heatmap .color-scale-3 {
          fill: #16a34a;
        }

        .react-calendar-heatmap .color-scale-4 {
          fill: #22c55e;
        }

        .react-calendar-heatmap .color-scale-5 {
          fill: #4ade80;
        }

        `}
      </style>

    </div>
  );
}