// app/(drawer)/(tabs)/index.tsx (Home)

import React from 'react';
import { View, ScrollView } from 'react-native';
import dayjs from 'dayjs';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import SobrietyTracker from '@/components/SobrietyTracker';
import DailyIntentionsList from '@/components/DailyIntentionsList';
import AnimatedCard from '@/components/AnimatedCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RewardsSection from '@/components/RewardsSection';
import ReflectCardList from '@/components/ReflectCardList';

const Home = () => {
  const insets = useSafeAreaInsets();
  return (
    <ScreenWrapper>
      <ScrollView
        className="w-full flex-1 gap-9 px-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}>
        {/* Top Section: Takes natural height */}
        <View className="mb-8 w-full">
          <SobrietyTracker nextMilestoneDays={40} />
        </View>

        <View className="w-full flex-1">
          <DailyIntentionsList />
        </View>

        <View className="w-full flex-1">
          <AnimatedCard />
        </View>

        <View className="w-full flex-1">
          <RewardsSection />
        </View>

        <View className="w-full flex-1">
          <ReflectCardList />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Home;
