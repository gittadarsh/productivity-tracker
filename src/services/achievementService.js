import {
  db,
} from "../firebase";

import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

export const getAchievementsService =
  async uid => {

    const ref =
      doc(
        db,
        "achievements",
        uid
      );

    const snap =
      await getDoc(ref);

    return snap.exists()

      ? snap.data()
          .items || []

      : [];
  };

export const saveAchievementsService =
  async (
    uid,
    achievements
  ) => {

    await setDoc(

      doc(
        db,
        "achievements",
        uid
      ),

      {
        items:
          achievements,
      },

      {
        merge: true,
      }
    );
  };