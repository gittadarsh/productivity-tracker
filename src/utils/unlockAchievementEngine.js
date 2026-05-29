import {
  db,
} from "../firebase";

import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

export const unlockAchievements =
  async (
    uid,
    achievements
  ) => {

    try {

      const ref =
        doc(
          db,
          "achievements",
          uid
        );

      const snap =
        await getDoc(ref);

      const existing =
        snap.exists()

          ? snap.data()
              .items || []

          : [];

      const existingTitles =
        existing.map(
          item => item.title
        );

      const newUnlocks =
        achievements.filter(

          item =>

            !existingTitles.includes(
              item.title
            )
        );

      if (
        !newUnlocks.length
      ) return [];

      const updated = [

        ...existing,

        ...newUnlocks,
      ];

      await setDoc(

        ref,

        {
          items: updated,
        },

        {
          merge: true,
        }
      );

      return newUnlocks;

    } catch (error) {

      console.log(error);

      return [];
    }
  };