import { Redirect } from 'expo-router';

import AppTabs from '@/components/app-tabs';
import { useAuthStore } from '@/stores/auth';

export default function AppLayout() {
  const hydrated = useAuthStore((s) => s.hydrated);
  const user = useAuthStore((s) => s.user);

  if (!hydrated) return null;
  if (!user) return <Redirect href="/(auth)/login" />;

  return <AppTabs />;
}
