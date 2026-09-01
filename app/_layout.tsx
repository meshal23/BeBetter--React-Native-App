import '@/global.css';
import { Slot, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'sans-regular': require('../assets/fonts/Manrope-Regular.ttf'),
    'sans-bold': require('../assets/fonts/Manrope-Bold.ttf'),
    'sans-medium': require('../assets/fonts/Manrope-Medium.ttf'),
    'sans-semibold': require('../assets/fonts/Manrope-SemiBold.ttf'),
    'sans-extrabold': require('../assets/fonts/Manrope-ExtraBold.ttf'),
    'sans-light': require('../assets/fonts/Manrope-Light.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  return <Slot />;
}
