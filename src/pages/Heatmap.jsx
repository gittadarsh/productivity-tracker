import {
  useEffect,
  useState,
} from "react";

import {
  auth,
  db,
} from "../firebase";

import {
  doc,
  getDoc,
} from "firebase/firestore";

export default function Heatmap() {

  const [history, setHistory] =
    useState([]);

  useEffect(() => {

    loadHistory();

  }, []);

  const loadHistory =
    async () => {

      const user =
        auth.currentUser;

      if (!user)
        return;

      const snap =
        await getDoc(

          doc(
            db,
            "activityHistory",
            user.uid
          )
        );

      if (
        snap.exists()
      ) {

        setHistory(

          snap.data()
            .history || []
        );
      }
    };

  return (

    <div className="space-y-8">

      <h1 className="text-5xl font-black">

        🔥 Activity Heatmap

      </h1>

      <div className="grid grid-cols-7 gap-4">

        {history.map(
          (
            item,
            index
          ) => (

            <div
              key={index}
              className={`

              h-24 rounded-2xl p-4

              flex flex-col justify-between

              ${
                item.productivityScore > 70

                  ? "bg-green-500/30"

                  : item.productivityScore > 40

                  ? "bg-yellow-500/30"

                  : "bg-red-500/30"
              }`}
            >

              <p className="text-xs">

                {item.date}

              </p>

              <h2 className="text-2xl font-black">

                {
                  item.productivityScore
                }

              </h2>

            </div>
          )
        )}

      </div>

    </div>
  );
}