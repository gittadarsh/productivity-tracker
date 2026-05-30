import {
  db,
} from "../firebase";

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export const getUserData =
  async uid => {

    const ref =
      doc(
        db,
        "users",
        uid
      );

    const snap =
      await getDoc(ref);

    return snap.exists()

      ? snap.data()

      : null;
  };

export const updateUserData =
  async (
    uid,
    data
  ) => {

    await updateDoc(

      doc(
        db,
        "users",
        uid
      ),

      data
    );
  };

export const mergeUserData =
  async (
    uid,
    data
  ) => {

    await setDoc(

      doc(
        db,
        "users",
        uid
      ),

      data,

      {
        merge: true,
      }
    );
  };