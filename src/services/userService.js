import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  db,
} from "../firebase";

export async function createUserProfile(
  user
) {

  if (!user) return;

  try {

    await setDoc(

      doc(
        db,
        "users",
        user.uid
      ),

      {

        uid: user.uid,

        email:
          user.email || "",

        name:
          user.displayName ||
          "Student",

        joinedAt:
          serverTimestamp(),

        lastLogin:
          serverTimestamp(),

        xp: 0,

        streak: 0,

        productivityScore: 0,

        role: "student",
      },

      {
        merge: true,
      }
    );

  } catch (error) {

    console.log(error);
  }
}