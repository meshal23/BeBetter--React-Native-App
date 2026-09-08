import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from '@/utils/icon';
import { icons } from '@/constants/icons';

export default function RewardsSection() {
  return (
    <View className="rounded-xl  p-4">
      {/* Header */}
      <View className="mb-3 flex-row items-center">
        <Icon icon={icons.gift} />
        <Text className="ml-2 text-lg font-bold text-black">Rewards</Text>
      </View>

      {/* Cards Container */}
      <View className="flex-row gap-3">
        {/* Wallpapers Card */}
        <TouchableOpacity
          activeOpacity={0.7}
          className="flex-1 items-center justify-center rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <View className="mb-3">
            <Icon icon={icons.wallpaper} />
          </View>
          <Text className="text-sm font-medium text-gray-700">Wallpapers</Text>
        </TouchableOpacity>

        {/* Leaves Earned Card */}
        <TouchableOpacity
          activeOpacity={0.7}
          className="flex-1 items-center justify-center rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <Text className="mb-1 text-4xl font-bold text-[#2d5757]">0.5</Text>
          <Icon icon={icons.leaf} />
          <Text className="text-sm font-medium text-gray-700"> Earned</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
