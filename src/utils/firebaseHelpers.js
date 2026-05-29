import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import {
  db,
} from "../firebase";

export const getUserDoc =
  async (
    collection,
    uid
  ) => {

    const ref =
      doc(
        db,
        collection,
        uid
      );

    const snap =
      await getDoc(ref);

    return snap.exists()

      ? snap.data()

      : null;
  };

export const mergeUserDoc =
  async (
    collection,
    uid,
    data
  ) => {

    await setDoc(

      doc(
        db,
        collection,
        uid
      ),

      data,

      {
        merge: true,
      }
    );
  };