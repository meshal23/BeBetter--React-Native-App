import '@/global.css';
import { SplashScreen, Stack, useRouter, useSegments } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

function AuthNavigator() {
  const router = useRouter();
  const segments = useSegments();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      // Redirect to sign-in if not authenticated
      router.replace('/(auth)/sign-in');
    } else if (isAuthenticated && inAuthGroup) {
      // Redirect to app if authenticated
      router.replace('/(drawer)/(tabs)');
    }
  }, [isAuthenticated, segments, isLoading, router]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(drawer)" />
    </Stack>
  );
}

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
    <QueryClientProvider client={queryClient}>
      <AuthNavigator />
    </QueryClientProvider>
  );
}
