import React from 'react';
import { Pressable, View, StyleSheet, Text } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';

const SafeAreaView = styled(RNSafeAreaView);

const RegularContent = () => {
  return (
    <View
      //   style={regularContentStyles.card}
      className="w-full flex-1 items-center justify-center rounded-2xl bg-[#E5FFF9]">
      <View className="elevation-4 relative h-70 w-[320px] overflow-hidden rounded-3xl bg-[#F8FAF7] shadow-sm shadow-black/5">
        {/* Organic abstract background bubble in the top-right corner */}
        {/* Note: React Native style prop handles the custom oval distortion transform safely */}
        <View
          className="absolute -top-15 -right-10 h-35 w-35 rounded-full bg-[#EFEAE2]"
          style={{ transform: [{ scaleX: 1.2 }] }}
        />

        {/* Content Layout Layer */}
        <View className="flex-1 items-center justify-center px-7">
          <Text className="font-sans-extrabold rotate-180 text-[42px] text-[#A2A9A4]">””</Text>
          {/* Main Verse Text */}
          <Text className="font-sans-medium mb-5 text-center text-[17px] leading-6.5 text-[#555E58] italic">
            “And seek help through patience and prayer, and indeed, it is difficult except for the
            humbly submissive [to Allah].”
          </Text>

          {/* Reference Attribution Banner */}
          <Text className="font-sans-semibold text-[12px] tracking-[1.5px] text-[#8A938E]">
            QURAN 2:45
          </Text>
        </View>
      </View>
    </View>
  );
};

const FlippedContent = () => {
  return (
    <View
      //   style={regularContentStyles.card}
      className="w-full flex-1 items-center justify-center rounded-2xl bg-[#E5FFF9]">
      <View className="elevation-4 relative h-70 w-[320px] overflow-hidden rounded-3xl bg-[#F8FAF7] shadow-sm shadow-black/5">
        {/* Organic abstract background bubble in the top-right corner */}
        {/* Note: React Native style prop handles the custom oval distortion transform safely */}
        <View
          className="absolute -top-15 -right-10 h-35 w-35 rounded-full bg-[#EFEAE2]"
          style={{ transform: [{ scaleX: 1.2 }] }}
        />

        {/* Content Layout Layer */}
        <View className="flex-1 items-center justify-center px-7">
          {/* Main Verse Text */}
          <Text className="font-sans-medium mb-5 p-3 text-center text-[13px] leading-6.5 text-[#555E58] italic">
            If you&apos;re fighting an addiction, don&apos;t measure yourself by how many times
            you’ve fallen—measure yourself by your willingness to keep returning to Allah. Every day
            you resist, every time you repent, and every time you choose prayer over your addiction
            is a step forward. You are not your addiction. Keep fighting. Be patient. Turn to Allah.
            You don&apos;t have to overcome everything in one day—just don&apos;t give up today.
          </Text>
        </View>
      </View>
    </View>
  );
};

const FlipCard = ({
  isFlipped,
  cardStyle,
  direction = 'y',
  duration = 500,
  RegularContent,
  FlippedContent,
  onPress,
}: any) => {
  const isDirectionX = direction === 'x';

  const regularCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [0, 180]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });

    return {
      transform: [isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue }],
    };
  });

  const flippedCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [180, 360]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });

    return {
      transform: [isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue }],
    };
  });

  return (
    <Pressable onPress={onPress}>
      <Animated.View style={[flipCardStyles.regularCard, cardStyle, regularCardAnimatedStyle]}>
        {RegularContent}
      </Animated.View>
      <Animated.View style={[flipCardStyles.flippedCard, cardStyle, flippedCardAnimatedStyle]}>
        {FlippedContent}
      </Animated.View>
    </Pressable>
  );
};

const flipCardStyles = StyleSheet.create({
  regularCard: {
    position: 'absolute',
    zIndex: 1,
  },
  flippedCard: {
    zIndex: 2,
  },
});

export default function App() {
  const isFlipped = useSharedValue(false);

  const handlePress = () => {
    isFlipped.value = !isFlipped.value;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlipCard
        isFlipped={isFlipped}
        cardStyle={styles.flipCard}
        FlippedContent={<FlippedContent />}
        RegularContent={<RegularContent />}
        onPress={handlePress}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },

  flipCard: {
    width: 320,
    height: 240,
    backfaceVisibility: 'hidden',
  },
});
