import {
  create,
} from "zustand";

export const useProductivityStore =
  create(set => ({

    /* CORE */

    xp: 0,

    sessions: 0,

    streak: 0,

    score: 0,

    level: 1,

    quality: 100,

    achievements: [],

    activities: [],

    loading: true,

    /* ACTIONS */

    setProductivity:
      data =>

        set(state => ({

          ...state,

          ...data,
        })),

    setLoading:
      loading =>

        set({
          loading,
        }),

    addActivity:
      activity =>

        set(state => ({

          activities: [

            activity,

            ...state.activities,
          ],
        })),

    setAchievements:
      achievements =>

        set({
          achievements,
        }),
  }));