import CalendarHeatmap from "react-calendar-heatmap";

import "react-calendar-heatmap/dist/styles.css";

export default function Heatmap({
  habits,
}) {

  const values = Object.keys(habits).map(
    (date) => {

      const completed =
        Object.values(habits[date] || {})
          .filter(Boolean).length;

      return {
        date,
        count: completed,
      };
    }
  );

  return (

    <div className="mt-12">

      <h1 className="text-3xl font-bold mb-6">

        📅 Consistency Heatmap

      </h1>

      <div className="bg-slate-800 p-6 rounded-3xl overflow-auto">

        <CalendarHeatmap
          startDate={
            new Date(
              new Date().setMonth(
                new Date().getMonth() - 3
              )
            )
          }

          endDate={new Date()}

          values={values}

          classForValue={(value) => {

            if (!value) {
              return "color-empty";
            }

            if (value.count >= 5) {
              return "color-github-4";
            }

            if (value.count >= 3) {
              return "color-github-3";
            }

            if (value.count >= 1) {
              return "color-github-2";
            }

            return "color-empty";
          }}
        />

      </div>

    </div>
  );
}