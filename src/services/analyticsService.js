import {
  db,
} from "../firebase";

import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

export const getAnalyticsService =
  async uid => {

    const ref =
      doc(
        db,
        "analytics",
        uid
      );

    const snap =
      await getDoc(ref);

    return snap.exists()

      ? snap.data()

      : null;
  };

export const updateAnalyticsService =
  async (
    uid,
    data
  ) => {

    await setDoc(

      doc(
        db,
        "analytics",
        uid
      ),

      data,

      {
        merge: true,
      }
    );
  };