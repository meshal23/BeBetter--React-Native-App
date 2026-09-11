import '@/global.css';
import { SplashScreen, Stack, useRouter, useSegments } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import { refreshAuth } from '@/lib/auth';

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

function AuthNavigator() {
  const router = useRouter();
  const segments = useSegments();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const [hasHydrated, setHasHydrated] = useState(useAuthStore.persist.hasHydrated());
  const [isValidating, setIsValidating] = useState(false);

  // Track hydration completion
  useEffect(() => {
    const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
      setHasHydrated(true);
    });
    return unsubscribe;
  }, []);

  // Validate persisted session after hydration
  useEffect(() => {
    const validateSession = async () => {
      if (!hasHydrated || isLoading) return; // Wait for hydration to complete

      if (isAuthenticated) {
        setIsValidating(true);
        // Validate the persisted token
        const isValid = await refreshAuth();
        if (!isValid) {
          // Token invalid, clear auth state
          clearAuth();
        }
        setIsValidating(false);
      }
    };

    validateSession();
  }, [hasHydrated, isLoading, isAuthenticated, clearAuth]);

  // Navigation logic
  useEffect(() => {
    if (!hasHydrated || isLoading || isValidating) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      // Redirect to sign-in if not authenticated
      router.replace('/(auth)/sign-in');
    } else if (isAuthenticated && inAuthGroup) {
      // Redirect to app if authenticated
      router.replace('/(drawer)/(tabs)');
    }
  }, [isAuthenticated, segments, isLoading, isValidating, hasHydrated, router]);

  if (!hasHydrated || isLoading) {
    return null;
  }

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
