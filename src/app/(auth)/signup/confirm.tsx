import { useState } from 'react';
import { useRouter } from 'expo-router';

import { View, Text, Pressable } from '@/tw';
import { useAuthStore } from '@/stores/auth';
import { useSignupStore } from '@/stores/signup';

export default function SignupConfirmStep() {
  const router = useRouter();
  const signIn = useAuthStore((s) => s.signIn);
  const email = useSignupStore((s) => s.email);
  const password = useSignupStore((s) => s.password);
  const name = useSignupStore((s) => s.name);
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async () => {
    setSubmitting(true);
    try {
      await signIn(email, password);
      useSignupStore.getState().reset();
    } catch {
      setSubmitting(false);
    }
  };

  return (
    <View className="flex-1 bg-white px-6 pt-16 gap-4">
      <Text className="text-sm text-gray-500">Paso 4 de 4</Text>
      <Text className="text-3xl font-bold text-black">Revisa tus datos</Text>

      <View className="bg-gray-100 rounded-lg p-4 gap-2 mt-2">
        <Row label="Nombre" value={name} />
        <Row label="Email" value={email} />
        <Row label="Password" value={'•'.repeat(Math.max(password.length, 4))} />
      </View>

      <View className="flex-row gap-3 mt-4">
        <Pressable
          className="flex-1 rounded-lg py-3 items-center border border-gray-300 active:opacity-80"
          onPress={() => router.back()}>
          <Text className="text-black font-semibold">Atrás</Text>
        </Pressable>
        <Pressable
          disabled={submitting}
          className={`flex-1 rounded-lg py-3 items-center ${submitting ? 'bg-gray-400' : 'bg-black active:opacity-80'}`}
          onPress={handleCreate}>
          <Text className="text-white font-semibold">
            {submitting ? 'Creando…' : 'Crear cuenta'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between">
      <Text className="text-gray-500">{label}</Text>
      <Text className="text-black font-medium">{value}</Text>
    </View>
  );
}
