import {
  db,
} from "../firebase";

import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

export const getFocusData =
  async uid => {

    const ref =
      doc(
        db,
        "focusSessions",
        uid
      );

    const snap =
      await getDoc(ref);

    return snap.exists()

      ? snap.data()

      : null;
  };

export const updateFocusData =
  async (
    uid,
    data
  ) => {

    await setDoc(

      doc(
        db,
        "focusSessions",
        uid
      ),

      data,

      {
        merge: true,
      }
    );
  };