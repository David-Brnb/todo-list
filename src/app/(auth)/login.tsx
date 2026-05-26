import { useState } from 'react';
import { useRouter } from 'expo-router';

import { View, Text, TextInput, Pressable } from '@/tw';
import { useAuthStore } from '@/stores/auth';

export default function LoginScreen() {
  const router = useRouter();
  const signIn = useAuthStore((s) => s.signIn);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = email.trim().length > 0 && password.trim().length > 0 && !submitting;

  const handleSignIn = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      await signIn(email, password);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View className="flex-1 justify-center bg-white px-6 gap-4">
      <Text className="text-3xl font-bold text-black mb-2">Iniciar sesión</Text>

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 text-base text-black"
        placeholder="Email"
        placeholderTextColor="#9ca3af"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 text-base text-black"
        placeholder="Password"
        placeholderTextColor="#9ca3af"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable
        disabled={!canSubmit}
        className={`rounded-lg py-3 items-center ${canSubmit ? 'bg-black active:opacity-80' : 'bg-gray-400'}`}
        onPress={handleSignIn}>
        <Text className="text-white font-semibold">
          {submitting ? 'Entrando…' : 'Iniciar sesión'}
        </Text>
      </Pressable>

      <Pressable className="py-3 items-center" onPress={() => router.push('/(auth)/signup')}>
        <Text className="text-blue-600">Crear cuenta</Text>
      </Pressable>
    </View>
  );
}
