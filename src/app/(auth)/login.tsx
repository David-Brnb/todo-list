import { Text, View } from "@/tw";
import { Link } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { BrandLogo } from "@/icons";
import {
  Button,
  ErrorModal,
  LoadingModal,
  PasswordInput,
  SingleLineInput,
} from "@/project_components";
import { getErrorMessage } from "@/services/axios/errors";
import { getUserById } from "@/services/axios/users/getUserById";
import { auth } from "@/services/firebase/auth";
import { login } from "@/services/firebase/authService";
import { useAuthStore } from "@/stores/auth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const signIn = useAuthStore((s) => s.signIn);

  async function loginAccount(): Promise<void> {
    const trimmedEmail = email.trim();

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

    setLoadingModalVisible(true);
    try {
      const token = await login(trimmedEmail, password);
      const userDTO = await getUserById(auth.currentUser!.uid);
      await signIn(userDTO, token);
      setLoadingModalVisible(false);
    } catch (err: any) {
      setLoadingModalVisible(false);
      const message = getErrorMessage(
        err,
        "Ocurrió un error inesperado al intentar iniciar sesión.",
      );
      // Wait for the loading modal's dismiss animation to finish before
      // opening the error modal — iOS can't transition two Modals at once.
      setTimeout(() => {
        setErrorMessage(message);
        setErrorModalVisible(true);
      }, 400);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
        <BrandLogo />
      </View>
      <View className="flex-1 items-center justify-center px-5">
        <View className="w-full py-2">
          <Text className="text-4xl text-blue-600 font-semibold">Login</Text>
        </View>
        <View className="w-full gap-5">
          <SingleLineInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="correo@ejemplo.com"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            maxLength={50}
          />
          <PasswordInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
          />

          <Button
            text="login"
            bgColor="#005BBF"
            textColor="#FFFFFF"
            onClick={loginAccount}
          />

          <View className="flex-row justify-center items-center mt-2">
            <Text className="text-sm text-gray-600">
              Don't have an account?{" "}
            </Text>
            <Link href="/(auth)/signup" replace asChild>
              <Text className="text-sm text-blue-600 font-semibold">
                Create account
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

      {/* Modal de Carga de Login */}
      <LoadingModal visible={loadingModalVisible} />
    </SafeAreaView>
  );
}
