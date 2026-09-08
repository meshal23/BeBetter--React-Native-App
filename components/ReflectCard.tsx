import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Icon } from '@/utils/icon';
import { icons } from '@/constants/icons';
import * as WebBrowser from 'expo-web-browser';

export interface ReflectItem {
  id: string;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  type?: 'article' | 'video';
  linkUrl: string;
}

interface ReflectCardProps {
  item: ReflectItem;
  onPress?: () => void;
}

export const ReflectCard: React.FC<ReflectCardProps> = ({ item, onPress }) => {
  const handlePress = async () => {
    if (item.linkUrl) {
      await WebBrowser.openBrowserAsync(item.linkUrl);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handlePress}
      className="mb-4 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
      {/* Image Container */}
      <View className="relative h-48 w-full bg-gray-200">
        <Image source={{ uri: item.imageUrl }} className="h-full w-full" resizeMode="cover" />

        {/* Video Play Button Overlay */}
        {item.type === 'video' && (
          <View className="absolute inset-0 items-center justify-center bg-black/10">
            <View className="h-12 w-12 items-center justify-center rounded-full bg-white/80 pl-0.5">
              <Icon icon={icons.play} />
            </View>
          </View>
        )}
      </View>

      {/* Content Container */}
      <View className="p-5">
        {/* Category Label */}
        <Text className="mb-1 text-xs font-semibold tracking-wider text-[#3d6b6b] uppercase">
          {item.category}
        </Text>

        {/* Card Title */}
        <Text className="mb-2 text-xl leading-snug font-bold text-gray-800">{item.title}</Text>

        {/* Card Description */}
        {item.description ? (
          <Text numberOfLines={2} className="text-sm leading-relaxed text-gray-500">
            {item.description}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};
