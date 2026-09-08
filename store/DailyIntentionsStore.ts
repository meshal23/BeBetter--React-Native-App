import { DAILY_INTENTIONS } from '@/constants/data';
import { create } from 'zustand';

interface DailyIntentionsStore {
  dailyIntentions: DailyIntention[];
  addDailyIntentions: (intentions: DailyIntention) => void;
}

export const useDailyIntentionsStore = create<DailyIntentionsStore>((set) => ({
  dailyIntentions: DAILY_INTENTIONS,
  addDailyIntentions: (intentions: DailyIntention) =>
    set((state) => ({
      dailyIntentions: [...state.dailyIntentions, intentions],
    })),
}));
