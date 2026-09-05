import '@/global.css';
import { Slot, SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'sans-regular': require('../assets/fonts/Manrope-Regular.ttf'),
    'sans-bold': require('../assets/fonts/Manrope-Bold.ttf'),
    'sans-medium': require('../assets/fonts/Manrope-Medium.ttf'),
    'sans-semibold': require('../assets/fonts/Manrope-SemiBold.ttf'),
    'sans-extrabold': require('../assets/fonts/Manrope-ExtraBold.ttf'),
    'sans-light': require('../assets/fonts/Manrope-Light.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(drawer)" />
    </Stack>
  );
}
