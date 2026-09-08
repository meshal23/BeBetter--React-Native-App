import React, { useState } from 'react';
import { View, Text, Modal, Pressable } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';

const SafeAreaView = styled(RNSafeAreaView);

export const PanicButton = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="w-full items-center">
      {/* --- Panic Button Trigger --- */}
      <Pressable
        onPress={() => setModalVisible(true)}
        className="w-[90%] items-center rounded-2xl border border-amber-500/30 bg-amber-500/10 py-3.5 active:opacity-80">
        <Text className="font-sans-bold text-xs tracking-wider text-amber-700 uppercase">
          ⚡ Need Help? (Panic Button)
        </Text>
      </Pressable>

      {/* --- Solid Non-Transparent Reminder Modal --- */}
      <Modal
        animationType="slide"
        transparent={false} // Full solid background cover
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <SafeAreaView className="flex-1 bg-[#1E332D]">
          <View className="flex-1 justify-between px-8 py-10">
            {/* Top Badge */}
            <View className="items-center">
              <View className="rounded-full border border-emerald-500/30 bg-emerald-500/20 px-4 py-1.5">
                <Text className="font-sans-medium text-xs text-emerald-300">
                  Pause & Take A Deep Breath
                </Text>
              </View>
            </View>

            {/* Core Grounding Message */}
            <View className="my-auto items-center">
              <Text className="font-sans-bold text-center text-3xl leading-snug text-white">
                This urge is temporary.
              </Text>
              <Text className="font-sans-bold mt-1 text-center text-3xl leading-snug text-emerald-400">
                You are in control.
              </Text>

              <Text className="mt-6 max-w-xs text-center font-sans text-sm leading-6 text-emerald-100/80">
                Urges peak and fade like waves. Give yourself just 9-11 minutes before making any
                decisions. Remember why you started this journey.
              </Text>
            </View>

            {/* Grounding Actions & Exit */}
            <View className="w-full space-y-3">
              {/* Encouragement Button / Take Action */}
              <Pressable
                onPress={() => {
                  // You can navigate to a breathing exercise or quote screen here
                  setModalVisible(false);
                }}
                className="mb-3 w-full items-center rounded-2xl bg-emerald-500 py-4 active:bg-emerald-600">
                <Text className="font-sans-bold text-sm text-[#1E332D]">I Can Overcome This</Text>
              </Pressable>

              {/* Close Button */}
              <Pressable
                onPress={() => setModalVisible(false)}
                className="w-full items-center rounded-2xl border border-white/15 bg-white/10 py-4 active:bg-white/20">
                <Text className="font-sans-medium text-sm text-white">Close Reminder</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};
