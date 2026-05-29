import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  auth,
  db,
} from "../firebase";

import {
  doc,
  onSnapshot,
} from "firebase/firestore";

const ProductivityContext =
  createContext();

export function ProductivityProvider({

  children,

}) {

  const [productivityData,
    setProductivityData] =
    useState({

      xp: 0,

      sessions: 0,

      streak: 0,

      score: 0,

      level: 1,
    });

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

    const updateState =
      () => {

        const xp =
          userData.xp || 0;

        const sessions =
          focusData.sessions || 0;

        const streak =
          Math.floor(
            sessions / 3
          );

        const score =
          Math.min(

            100,

            Math.floor(

              xp * 0.02 +

              sessions * 2 +

              streak * 4
            )
          );

        const level =
          Math.max(

            1,

            Math.floor(
              xp / 250
            )
          );

        setProductivityData({

          xp,

          sessions,

          streak,

          score,

          level,
        });
      };

    const unsubUser =
      onSnapshot(

        userRef,

        (
          snapshot
        ) => {

          userData =
            snapshot.data() || {};

          updateState();
        }
      );

    const unsubFocus =
      onSnapshot(

        focusRef,

        (
          snapshot
        ) => {

          focusData =
            snapshot.data() || {};

          updateState();
        }
      );

    return () => {

      unsubUser();

      unsubFocus();
    };

  }, []);

  return (

    <ProductivityContext.Provider
      value={
        productivityData
      }
    >

      {children}

    </ProductivityContext.Provider>
  );
}

export const useProductivity =
  () =>
    useContext(
      ProductivityContext
    );