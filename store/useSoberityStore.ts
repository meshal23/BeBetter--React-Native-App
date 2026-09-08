import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

interface SoberityState {
  startDateString: string;
  resetStreak: () => void;
  setStartDate: (date: string) => void;
}

/**
 * Validates and normalizes a date string to ISO format.
 * Returns a valid ISO string or generates a new one if invalid.
 */
const validateAndNormalizeDateString = (dateString: string | undefined): string => {
  if (!dateString) {
    return dayjs().toISOString();
  }

  const parsed = dayjs(dateString);

  // dayjs.isValid() returns false for invalid dates
  if (!parsed.isValid()) {
    return dayjs().toISOString();
  }

  // Ensure it's in ISO format
  return parsed.toISOString();
};

export const useSoberityStore = create<SoberityState>()(
  persist(
    (set) => ({
      // Defaults to the current moment ISO string when initialized
      startDateString: dayjs().toISOString(),

      // Action to reset the timer (e.g., if the user relapses or resets)
      resetStreak: () => set({ startDateString: dayjs().toISOString() }),

      // Action to manually set a specific date
      setStartDate: (dateString: string) =>
        set({ startDateString: validateAndNormalizeDateString(dateString) }),
    }),
    {
      name: 'soberity-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Validate rehydrated state from AsyncStorage
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.startDateString = validateAndNormalizeDateString(state.startDateString);
        }
      },
    }
  )
);
