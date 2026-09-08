import React, { useState } from 'react';
import { View, Text, Modal, Pressable } from 'react-native';
import { useSoberityStore } from '@/store/useSoberityStore';

export const ResetStreakButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const resetStreak = useSoberityStore((state) => state.resetStreak);

  const handleConfirmReset = () => {
    resetStreak(); // Reset timestamp in Zustand store & AsyncStorage
    setModalVisible(false); // Close modal
  };

  return (
    <View className="w-full items-center">
      {/* --- Trigger Button --- */}
      <Pressable
        onPress={() => setModalVisible(true)}
        className="rounded-xl bg-red-50/80 px-4 py-2.5 active:opacity-80">
        <Text className="font-sans-medium text-xs text-red-600">Reset Streak</Text>
      </Pressable>

      {/* --- Confirmation Modal --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View className="flex-1 items-center justify-center bg-black/50 px-6">
          <View className="w-full max-w-xs rounded-2xl bg-white p-6 shadow-xl">
            {/* Modal Title & Description */}
            <Text className="font-sans-bold text-center text-lg text-[#2D4A43]">
              Reset Sobriety Streak?
            </Text>
            <Text className="text-muted-foreground mt-2 text-center font-sans text-xs leading-5">
              Are you sure you want to start over? This will set your streak back to Day 0.
            </Text>

            {/* Action Buttons */}
            <View className="mt-6 flex-row gap-3">
              {/* Cancel Button */}
              <Pressable
                onPress={() => setModalVisible(false)}
                className="flex-1 rounded-xl bg-gray-100 py-3 active:bg-gray-200">
                <Text className="font-sans-medium text-center text-xs text-gray-700">Cancel</Text>
              </Pressable>

              {/* Reset Confirm Button */}
              <Pressable
                onPress={handleConfirmReset}
                className="flex-1 rounded-xl bg-red-500 py-3 active:bg-red-600">
                <Text className="font-sans-medium text-center text-xs text-white">Reset</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
