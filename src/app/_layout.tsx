import '@/global.css';

import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';

import { useAuthStore } from '@/stores/auth';
import StorybookUIRoot from '../../.rnstorybook';

const STORYBOOK_ONLY = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true';

export default function RootLayout() {
  if (STORYBOOK_ONLY) {
    return <StorybookUIRoot />;
  }
  return <AppRoot />;
}

function AppRoot() {
  const hydrated = useAuthStore((s) => s.hydrated);
  const user = useAuthStore((s) => s.user);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    useAuthStore.getState().hydrate();
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const inAuthGroup = segments[0] === '(auth)';
    if (!user && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (user && inAuthGroup) {
      router.replace('/(app)');
    }
  }, [hydrated, user, segments, router]);

  if (!hydrated) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
