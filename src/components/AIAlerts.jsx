import {
  useProductivityStore,
} from "../store/useProductivityStore";

export default function AIAlerts() {

  const productivity =
    useProductivityStore();

  const alerts = [];

  if (
    productivity.streak < 3
  ) {

    alerts.push({

      text:
        "Your streak is at risk. Complete a focus session today.",
    });
  }

  if (
    productivity.score >= 80
  ) {

    alerts.push({

      text:
        "Elite productivity momentum detected.",
    });
  }

  if (
    productivity.sessions < 5
  ) {

    alerts.push({

      text:
        "Increase focus sessions to accelerate growth.",
    });
  }

  if (!alerts.length) {

    alerts.push({

      text:
        "Your productivity systems are stable and improving.",
    });
  }

  return (

    <div className="space-y-4">

      {alerts.map(
        (
          alert,
          index
        ) => (

          <div
            key={index}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >

            <p className="text-lg text-slate-300">

              {alert.text}

            </p>

          </div>
        )
      )}

    </div>
  );
}