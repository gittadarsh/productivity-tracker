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
  onSnapshot,
} from "firebase/firestore";

import PremiumCard from "./PremiumCard";

export default function RealtimeActivityFeed() {

  const [activities,
    setActivities] =
    useState([]);

  useEffect(() => {

    const user =
      auth.currentUser;

    if (!user)
      return;

    const ref =
      doc(
        db,
        "activityFeed",
        user.uid
      );

    const unsub =
      onSnapshot(

        ref,

        (
          snapshot
        ) => {

          if (
            snapshot.exists()
          ) {

            setActivities(

              snapshot.data()
                .activities || []
            );
          }
        }
      );

    return () =>
      unsub();

  }, []);

  if (!activities.length) {

    return (

      <PremiumCard className="p-10 text-center">

        <h2 className="text-4xl font-black">

          No Activity Yet

        </h2>

        <p className="text-slate-400 text-lg mt-5">

          Complete focus sessions to generate live productivity activity.

        </p>

      </PremiumCard>
    );
  }

  return (

    <div className="space-y-5">

      {activities.map(
        (
          item,
          index
        ) => (

          <PremiumCard
            key={index}
            className="p-6"
          >

            <div className="flex items-start gap-5">

              <div className="text-4xl">

                {item.icon}

              </div>

              <div>

                <h2 className="text-2xl font-black">

                  {item.title}

                </h2>

                <p className="text-slate-400 mt-2">

                  {item.description}

                </p>

              </div>

            </div>

          </PremiumCard>
        )
      )}

    </div>
  );
}