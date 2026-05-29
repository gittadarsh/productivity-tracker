import {
  db,
} from "../firebase";

import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

export const addActivity =
  async (
    uid,
    activity
  ) => {

    try {

      const ref =
        doc(
          db,
          "activityFeed",
          uid
        );

      const snap =
        await getDoc(ref);

      let activities =
        [];

      if (
        snap.exists()
      ) {

        activities =
          snap.data()
            .activities || [];
      }

      activities.unshift({

        ...activity,

        createdAt:
          Date.now(),
      });

      activities =
        activities.slice(
          0,
          20
        );

      await setDoc(

        ref,

        {
          activities,
        },

        {
          merge: true,
        }
      );

    } catch (error) {

      console.log(error);
    }
  };