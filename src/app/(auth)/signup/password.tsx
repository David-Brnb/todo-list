import { useRouter } from 'expo-router';

import { View, Text, TextInput, Pressable } from '@/tw';
import { useSignupStore } from '@/stores/signup';

export default function SignupPasswordStep() {
  const router = useRouter();
  const password = useSignupStore((s) => s.password);
  const setField = useSignupStore((s) => s.setField);

  const canContinue = password.trim().length > 0;

  return (
    <View className="flex-1 bg-white px-6 pt-16 gap-4">
      <Text className="text-sm text-gray-500">Paso 2 de 4</Text>
      <Text className="text-3xl font-bold text-black">Crea una contraseña</Text>

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 text-base text-black"
        placeholder="Password"
        placeholderTextColor="#9ca3af"
        secureTextEntry
        value={password}
        onChangeText={(v) => setField('password', v)}
      />

      <View className="flex-row gap-3 mt-4">
        <Pressable
          className="flex-1 rounded-lg py-3 items-center border border-gray-300 active:opacity-80"
          onPress={() => router.back()}>
          <Text className="text-black font-semibold">Atrás</Text>
        </Pressable>
        <Pressable
          disabled={!canContinue}
          className={`flex-1 rounded-lg py-3 items-center ${canContinue ? 'bg-black active:opacity-80' : 'bg-gray-400'}`}
          onPress={() => router.push('/(auth)/signup/name')}>
          <Text className="text-white font-semibold">Siguiente</Text>
        </Pressable>
      </View>
    </View>
  );
}
