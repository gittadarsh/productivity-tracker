import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import {
  db,
} from "../firebase";

export const updateActivityHistory =
  async (

    userId,

    activityData

  ) => {

    try {

      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      const ref =
        doc(
          db,
          "activityHistory",
          userId
        );

      const snap =
        await getDoc(ref);

      let history = [];

      if (
        snap.exists()
      ) {

        history =
          snap.data()
            .history || [];
      }

      const existingIndex =
        history.findIndex(

          item =>
            item.date ===
            today
        );

      if (
        existingIndex >= 0
      ) {

        history[
          existingIndex
        ] = {

          ...history[
            existingIndex
          ],

          ...activityData,
        };

      } else {

        history.push({

          date: today,

          ...activityData,
        });
      }

      await setDoc(

        ref,

        {
          history,
        },

        {
          merge: true,
        }
      );

    } catch (error) {

      console.log(error);
    }
  };