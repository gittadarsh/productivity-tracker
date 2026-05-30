import {
  useEffect,
} from "react";

import {
  auth,
  db,
} from "../firebase";

import {
  doc,
  onSnapshot,
} from "firebase/firestore";

import {
  useProductivityStore,
} from "../store/useProductivityStore";

import {
  calculateLevel,
} from "../utils/levelEngine";

import {
  calculateProductivityScore,
} from "../utils/productivityScoreEngine";

export default function useInitializeProductivity() {

  const setProductivity =
    useProductivityStore(

      state =>
        state.setProductivity
    );

  const setLoading =
    useProductivityStore(

      state =>
        state.setLoading
    );

  useEffect(() => {

    const user =
      auth.currentUser;

    if (!user)
      return;

    const userRef =
      doc(
        db,
        "users",
        user.uid
      );

    const focusRef =
      doc(
        db,
        "focusSessions",
        user.uid
      );

    let userData = {};
    let focusData = {};

    const updateStore =
      () => {

        const xp =
          userData.xp || 0;

        const sessions =
          focusData.sessions || 0;

        const quality =
          focusData.quality || 100;

        const streak =
          Number(
            localStorage.getItem(
              "streak"
            ) || 0
          );

        const level =
          calculateLevel(xp);

        const score =
          calculateProductivityScore({

            xp,

            sessions,

            streak,

            quality,
          });

        setProductivity({

          xp,

          sessions,

          streak,

          quality,

          level,

          score,
        });

        setLoading(false);
      };

    const unsubUser =
      onSnapshot(

        userRef,

        snapshot => {

          userData =
            snapshot.data() || {};

          updateStore();
        }
      );

    const unsubFocus =
      onSnapshot(

        focusRef,

        snapshot => {

          focusData =
            snapshot.data() || {};

          updateStore();
        }
      );

    return () => {

      unsubUser();

      unsubFocus();
    };

  }, []);
}