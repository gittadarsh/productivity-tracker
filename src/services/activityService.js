import {
  db,
} from "../firebase";

import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

export const getActivities =
  async uid => {

    const ref =
      doc(
        db,
        "activityFeed",
        uid
      );

    const snap =
      await getDoc(ref);

    return snap.exists()

      ? snap.data()
          .activities || []

      : [];
  };

export const addActivityService =
  async (
    uid,
    activity
  ) => {

    const ref =
      doc(
        db,
        "activityFeed",
        uid
      );

    const snap =
      await getDoc(ref);

    const existing =
      snap.exists()

        ? snap.data()
            .activities || []

        : [];

    const updated = [

      {
        ...activity,

        createdAt:
          Date.now(),
      },

      ...existing,
    ].slice(0, 20);

    await setDoc(

      ref,

      {
        activities:
          updated,
      },

      {
        merge: true,
      }
    );
  };