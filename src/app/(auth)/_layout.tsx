import { Redirect, Stack } from 'expo-router';

import { useAuthStore } from '@/stores/auth';

export default function AuthLayout() {
  const hydrated = useAuthStore((s) => s.hydrated);
  const user = useAuthStore((s) => s.user);

  if (!hydrated) return null;
  if (user) return <Redirect href="/(app)" />;

  return <Stack screenOptions={{ headerShown: false }} />;
}
