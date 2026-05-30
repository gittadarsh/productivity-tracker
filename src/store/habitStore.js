import { create } from "zustand";

import {
  calculateXP,
} from "../utils/xpEngine";

import {
  resetDailyHabits,
} from "../utils/resetEngine";

const savedHabits =
  JSON.parse(
    localStorage.getItem(
      "habits"
    )
  ) || [];

const initialHabits =
  resetDailyHabits(
    savedHabits
  );

export const useHabitStore =
  create((set, get) => ({

    habits: initialHabits,

    xp:
      calculateXP(
        initialHabits
      ),

    addHabit: (title) => {

      if (!title.trim())
        return;

      const newHabit = {

        id: Date.now(),

        title,

        completed: false,

        streak: 0,

        createdAt:
          new Date().toISOString(),
      };

      const updated = [

        newHabit,

        ...get().habits,
      ];

      localStorage.setItem(
        "habits",
        JSON.stringify(updated)
      );

      set({

        habits: updated,

        xp:
          calculateXP(
            updated
          ),
      });
    },

    toggleHabit: (id) => {

      const updated =
        get().habits.map(
          (habit) => {

            if (
              habit.id === id
            ) {

              return {

                ...habit,

                completed:
                  !habit.completed,

                streak:
                  !habit.completed
                    ? habit.streak +
                      1
                    : Math.max(
                        habit.streak -
                          1,
                        0
                      ),
              };
            }

            return habit;
          }
        );

      localStorage.setItem(
        "habits",
        JSON.stringify(updated)
      );

      set({

        habits: updated,

        xp:
          calculateXP(
            updated
          ),
      });
    },

    deleteHabit: (id) => {

      const updated =
        get().habits.filter(
          (habit) =>
            habit.id !== id
        );

      localStorage.setItem(
        "habits",
        JSON.stringify(updated)
      );

      set({

        habits: updated,

        xp:
          calculateXP(
            updated
          ),
      });
    },
}));