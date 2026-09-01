import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';
import { Link } from 'expo-router';

const SafeAreaView = styled(RNSafeAreaView);

const Home = () => {
  return (
    <SafeAreaView className="bg-background flex-1 items-center justify-center">
      <Link href="/(auth)/sign-in" className="rounded-2xl bg-black p-3 text-white">
        Sign in here
      </Link>

      <Link href="/(auth)/sign-up" className="mt-2 rounded-2xl bg-black p-3 text-white">
        Sign up here
      </Link>
    </SafeAreaView>
  );
};

export default Home;
