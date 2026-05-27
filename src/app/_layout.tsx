import '@/global.css';

import { useEffect } from 'react';
import { Stack } from 'expo-router';

import { useAuthStore } from '@/stores/auth';

export default function RootLayout() {
  useEffect(() => {
    useAuthStore.getState().hydrate();
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}
