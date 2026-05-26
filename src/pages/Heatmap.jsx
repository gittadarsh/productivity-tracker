import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";

import { useState } from "react";

export default function Heatmap() {

  const [date, setDate] =
    useState(new Date());

  const completedDates = [

    "2026-05-01",
    "2026-05-02",
    "2026-05-03",
    "2026-05-05",
    "2026-05-06",
    "2026-05-08",
    "2026-05-10",
    "2026-05-12",
  ];

  const tileClassName = ({
    date,
    view,
  }) => {

    if (view === "month") {

      const formatted =
        date
          .toISOString()
          .split("T")[0];

      if (
        completedDates.includes(
          formatted
        )
      ) {

        return "bg-green-500 text-white rounded-xl";
      }
    }

    return "";
  };

  return (

    <div>

      <h1 className="text-5xl font-bold mb-10">

        📅 Productivity Calendar

      </h1>

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl">

        <Calendar

          onChange={setDate}

          value={date}

          tileClassName={
            tileClassName
          }

        />

      </div>

    </div>
  );
}