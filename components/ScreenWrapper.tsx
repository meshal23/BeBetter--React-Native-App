import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from 'expo-router';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import { icons } from '@/constants/icons';
import { styled } from 'nativewind';

const SafeAreaView = styled(RNSafeAreaView);

export const ScreenWrapper = ({ children }: { children: React.ReactNode }) => {
  const navigation = useNavigation();

  return (
    // 1. Root container arranges header and content vertically (flex-col)
    <SafeAreaView className="bg-background flex-1 flex-col">
      {/* 2. Top Header Bar containing the hamburger menu */}
      <View className="w-full flex-row items-center justify-start px-3 py-2.5">
        <TouchableOpacity
          onPress={() => navigation.getParent()?.dispatch({ type: 'OPEN_DRAWER' })}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityRole="button"
          accessibilityLabel="Open navigation menu">
          <View className="tabs-icon">
            <View className="drawer-pill">
              <Image source={icons.hamburger} resizeMode="contain" className="tabs-glyph" />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* 3. Screen body fills remaining space beneath the header */}
      <View className="w-full flex-1 gap-y-5 px-4">{children}</View>
    </SafeAreaView>
  );
};
