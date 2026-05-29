import '@/global.css';

import { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Manrope_800ExtraBold } from '@expo-google-fonts/manrope';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useAuthStore } from '@/stores/auth';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ Manrope_800ExtraBold, Inter_400Regular });

  useEffect(() => {
    useAuthStore.getState().hydrate();
  }, []);

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(app)" />
        <Stack.Screen name="tasklist/[id]" />
        <Stack.Screen name="tasklist/add-task" options={{ presentation: 'modal' }} />
        <Stack.Screen name="tasklist/edit-task" options={{ presentation: 'modal' }} />
        <Stack.Screen name="tasklist/edit-tasklist" options={{ presentation: 'modal' }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
