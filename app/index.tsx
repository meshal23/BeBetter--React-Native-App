import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';

const SafeAreaView = styled(RNSafeAreaView);

const Home = () => {
  return (
    <SafeAreaView className="bg-background flex-1">
      <Text>Home</Text>
    </SafeAreaView>
  );
};

export default Home;
