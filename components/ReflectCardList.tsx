import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { ReflectCard, ReflectItem } from './ReflectCard';
import { Icon } from '@/utils/icon';
import { icons } from '@/constants/icons';

// Sample Data matching the image context
const DUMMY_DATA: ReflectItem[] = [
  {
    id: '1',
    category: 'ARTICLE',
    title: 'Understanding the Psychology of Habits',
    description: 'Discover how gentle persistence and mindful awareness can slowly reshape...',
    imageUrl:
      'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=800&auto=format&fit=crop',
    type: 'article',
    linkUrl: 'https://www.psychologytoday.com/us/basics/habit-formation',
  },
  {
    id: '2',
    category: 'VIDEO',
    title: 'Guided Meditation for Cravings',
    description: 'A calming exercise designed to help you navigate through tough urges.',
    imageUrl:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    type: 'video',
    linkUrl: 'https://www.youtube.com/watch?v=fH7N9YRxMYc',
  },
];

export default function ReflectCardList() {
  const handleCardPress = (item: ReflectItem) => {
    console.log('Selected item:', item.title);
  };

  return (
    <View className="flex-1 p-4">
      {/* Header Section */}
      <View className="mb-4 flex-row items-center">
        <Icon icon={icons.learn} />
        <Text className="ml-2 text-xl font-bold text-[#1c3a3a]">Reflect & Learn</Text>
      </View>

      {/* FlatList Section */}
      <FlatList
        data={DUMMY_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReflectCard item={item} onPress={() => handleCardPress(item)} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        scrollEnabled={false}
      />
    </View>
  );
}
