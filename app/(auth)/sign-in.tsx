import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';
import { Link } from 'expo-router';

const SafeAreaView = styled(RNSafeAreaView);

const SignIn = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Link href="/" className="rounded-2xl bg-black p-3 text-white">
        Home
      </Link>
    </SafeAreaView>
  );
};

export default SignIn;
