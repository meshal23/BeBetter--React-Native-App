import React, { useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { SelectBox } from '@/components/SelectBox';
import { DAILY_INTENTIONS } from '@/constants/data';

export default function DailyIntentionsList() {
  // Store selected IDs in state for single or multi-select functionality
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id)); // Deselect
    } else {
      setSelectedIds([...selectedIds, id]); // Select
    }
  };

  return (
    <View>
      <View className="flex-1 px-4 pt-2">
        <Text className="mb-4 text-xl font-bold text-gray-900">Daily Intentions</Text>

        <FlatList
          data={DAILY_INTENTIONS}
          keyExtractor={(item) => item.title}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View className="mr-3 w-72">
              {/* Gives each horizontal item a fixed width */}
              <SelectBox
                label={item.title}
                description={item.subtitle}
                isSelected={selectedIds.includes(item.title)}
                onPress={() => toggleSelect(item.title)}
                icon={item.icon}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
}
