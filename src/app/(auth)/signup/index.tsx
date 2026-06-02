import { Link, useRouter } from "expo-router";
import { useState } from "react";

import { BrandLogo } from "@/icons/brand-logo";
import {
  Button,
  ErrorModal,
  PasswordInput,
  SingleLineInput,
} from "@/project_components";
import { useSignupStore } from "@/stores/signup";
import { Text, View } from "@/tw";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignupEmailStep() {
  const router = useRouter();
  const setField = useSignupStore((s) => s.setField);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleContinue() {
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setErrorMessage("Por favor, ingresa tu nombre completo.");
      setErrorModalVisible(true);
      return;
    }

    if (!trimmedEmail) {
      setErrorMessage("Por favor, ingresa tu correo electrónico.");
      setErrorModalVisible(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage(
        "El correo electrónico no es válido. Asegúrate de incluir un formato correcto (ej. usuario@dominio.com).",
      );
      setErrorModalVisible(true);
      return;
    }

    if (!password) {
      setErrorMessage("Por favor, ingresa tu contraseña.");
      setErrorModalVisible(true);
      return;
    }

    if (password.length < 8) {
      setErrorMessage(
        "La contraseña debe tener al menos 8 caracteres. Por favor, verifica e intenta de nuevo.",
      );
      setErrorModalVisible(true);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage(
        "Las contraseñas no coinciden. Por favor, verifica e intenta de nuevo.",
      );
      setErrorModalVisible(true);
      return;
    }

    setField("full_name", trimmedName);
    setField("email", trimmedEmail);
    setField("password", password);

    router.push('/(auth)/signup/generalInfo');
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
        <BrandLogo />
      </View>
      <View className="flex-1 items-center justify-center px-5">
        <View className="w-full py-2">
          <Text className="text-4xl text-blue-600 font-semibold">
            Create Account
          </Text>
        </View>
        <View className="w-full gap-5">
          <SingleLineInput
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            placeholder="John Doe"
            autoCapitalize="words"
          />
          <SingleLineInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="correo@ejemplo.com"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />
          <PasswordInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
          />
          <PasswordInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm Password"
          />
          <Button
            text="Continue"
            bgColor="#005BBF"
            textColor="#FFFFFF"
            onClick={handleContinue}
          />
          <View className="flex-row justify-center items-center mt-2">
            <Text className="text-sm text-gray-600">
              Already have an account?{" "}
            </Text>
            <Link href="/(auth)/login" replace asChild>
              <Text className="text-sm text-blue-600 font-semibold">
                Log in
              </Text>
            </Link>
          </View>
        </View>
      </View>

      {/* Modal de Error de Validación */}
      <ErrorModal
        visible={errorModalVisible}
        message={errorMessage}
        onClose={() => setErrorModalVisible(false)}
      />
    </SafeAreaView>
  );
}
