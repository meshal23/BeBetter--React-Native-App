import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import dayjs from 'dayjs';
import clsx from 'clsx';
import { useSoberityStore } from '@/store/useSoberityStore';
import { ResetStreakButton } from './ResetStreakButton';
import { PanicButton } from './PanicButton';

const SobrietyTracker = ({ nextMilestoneDays = 60 }: SobrietyTrackerProps) => {
  // Access persisted start date directly from Zustand
  const startDateStr = useSoberityStore((state) => state.startDateString);
  const [days, setDays] = useState(0);

  useEffect(() => {
    const calculateDays = () => {
      if (!startDateStr) return;

      const start = dayjs(startDateStr);
      const now = dayjs();

      const elapsedDays = now.diff(start, 'day');
      setDays(Math.max(0, elapsedDays));
    };

    calculateDays();

    // Set up an interval to recalculate every minute to keep the tracker updated
    const interval = setInterval(calculateDays, 1000 * 60);

    return () => clearInterval(interval);
  }, [startDateStr]);

  // 1. Calculate dynamic progress fraction (clamped between 0 and 1)
  const progressRatio = Math.min(Math.max(days / nextMilestoneDays, 0), 1);
  const daysRemaining = Math.max(0, nextMilestoneDays - days);

  // 2. SVG Circle Dimensions
  const size = 220;
  const strokeWidth = 3;

  // Radius calculation ensures the circle fits within the SVG viewBox padding
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // 3. Dynamic stroke offset calculation based on progress ratio
  const strokeDashoffset = circumference - progressRatio * circumference;

  return (
    <View className="w-full items-center">
      <View className="flex items-center justify-center">
        <Svg width={size} height={size}>
          {/* Background Track Circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E0E6E3"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Dynamic Active Progress Ring */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#2D4A43"
            strokeWidth={strokeWidth + 1}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset} // Updates dynamically as 'days' updates
            strokeLinecap="round"
            rotation="-90" // Rotates start position to 12 o'clock (top)
            origin={`${size / 2}, ${size / 2}`}
          />
        </Svg>

        <View className="absolute items-center justify-center">
          <Text className="font-sans-bold text-text-color text-5xl tracking-[-1px]">{days}</Text>
          <Text className="font-sans-medium text-muted-foreground mt-2 text-xs tracking-[0.3em]">
            DAYS OF SOBRIETY
          </Text>
        </View>
      </View>

      {/* Next Milestone Linear Progress Bar */}
      <View className="mt-7.5 w-[90%]">
        <View className="mb-2 flex-col justify-between gap-4">
          <ResetStreakButton />
          <PanicButton />
        </View>

        <View className="mb-2 flex-row items-center justify-between">
          <Text className="text-text-color text-[12px]">
            Next Milestone: <Text className="font-sans-bold">{nextMilestoneDays} Days</Text>
          </Text>
          <Text className="text-text-color text-[12px]">{daysRemaining} days left</Text>
        </View>

        <View className="h-1.5 rounded-2xl bg-[#E0E6E3] *:overflow-hidden">
          <View
            style={[
              styles.progressBarFill,
              { width: `${progressRatio * 100}%` }, // Dynamic width percentage
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarFill: {
    height: '100%',
    backgroundColor: '#2D4A43',
    borderRadius: 3,
  },
});

export default SobrietyTracker;
