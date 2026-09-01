import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';

const SafeAreaView = styled(RNSafeAreaView);

const SignUp = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text>SignUp</Text>
    </SafeAreaView>
  );
};

export default SignUp;
