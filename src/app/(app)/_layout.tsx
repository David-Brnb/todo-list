import { Redirect, Stack } from 'expo-router';

import { useAuthStore } from '@/stores/auth';

export default function AppLayout() {
  const hydrated = useAuthStore((s) => s.hydrated);
  const user = useAuthStore((s) => s.user);

  if (!hydrated) return null;
  if (!user) return <Redirect href="/(auth)/login" />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="add-tasklist"
        options={{
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
