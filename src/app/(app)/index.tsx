import { useState } from 'react';

import { View, Text, Pressable } from '@/tw';
import { useAuthStore } from '@/stores/auth';

export default function HomeScreen() {
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await signOut();
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6 gap-4">
      <Text className="text-3xl font-bold text-black">Hola, {user?.email}</Text>
      <Pressable
        disabled={signingOut}
        className={`rounded-lg py-3 px-6 items-center ${signingOut ? 'bg-gray-400' : 'bg-black active:opacity-80'}`}
        onPress={handleSignOut}>
        <Text className="text-white font-semibold">
          {signingOut ? 'Saliendo…' : 'Cerrar sesión'}
        </Text>
      </Pressable>
    </View>
  );
}
