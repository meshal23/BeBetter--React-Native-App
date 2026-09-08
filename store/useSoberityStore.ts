import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

interface SoberityState {
  startDateString: string;
  resetStreak: () => void;
  setStartDate: (date: string) => void;
}

export const useSoberityStore = create<SoberityState>()(
  persist(
    (set) => ({
      // Defaults to the current moment ISO string when initialized
      startDateString: dayjs().toISOString(),

      // Action to reset the timer (e.g., if the user relapses or resets)
      resetStreak: () => set({ startDateString: dayjs().toISOString() }),

      // Action to manually set a specific date
      setStartDate: (dateString: string) => set({ startDateString: dateString }),
    }),
    {
      name: 'soberity-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
