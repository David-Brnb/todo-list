import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable as RNPressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BrandLogo } from "@/icons/brand-logo";
import { Button, ErrorModal } from "@/project_components";
import { createUser } from "@/services/axios/users/createUser";
import { auth } from "@/services/firebase/auth";
import { registerUserWithDetails } from "@/services/firebase/authService";
import { useAuthStore } from "@/stores/auth";
import { useSignupStore } from "@/stores/signup";
import { Text, View } from "@/tw";

export default function SignupConfirmStep() {
  const router = useRouter();
  const signIn = useAuthStore((s) => s.signIn);

  const email = useSignupStore((s) => s.email);
  const password = useSignupStore((s) => s.password);
  const fullName = useSignupStore((s) => s.full_name);
  const role = useSignupStore((s) => s.rol);
  const interest = useSignupStore((s) => s.interests);
  const description = useSignupStore((s) => s.description);

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorActionText, setErrorActionText] = useState<string | undefined>(
    undefined,
  );
  const [errorAction, setErrorAction] = useState<(() => void) | undefined>(
    undefined,
  );

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Lo sentimos, necesitamos permisos de la galería para continuar.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleCreate = async () => {
    setSubmitting(true);
    try {
      const { token, userPayload } = await registerUserWithDetails(
        {
          email,
          password,
          full_name: fullName,
          rol: role,
          interests: interest,
          description: description,
        },
        imageUri,
      );

      let userDTO;
      try {
        userDTO = await createUser({
          fullName: userPayload.full_name,
          email: userPayload.email,
          role: userPayload.rol,
          interest: userPayload.interests,
          description: userPayload.description,
          firebaseUuid: userPayload.firebaseUuid,
          firebaseImageUuid: userPayload.firebaseImageUuid,
        });
      } catch (backendErr) {
        await auth.currentUser?.delete();
        console.log(backendErr);
        throw backendErr;
      }

      await signIn(userDTO, token);

      useSignupStore.getState().reset();
    } catch (err: any) {
      setSubmitting(false);
      const message =
        err?.message ||
        "Ocurrió un error inesperado al intentar crear tu cuenta.";
      setErrorMessage(message);

      if (message.includes("Ya existe una cuenta")) {
        setErrorActionText("Iniciar Sesión");
        setErrorAction(() => () => {
          setErrorModalVisible(false);
          router.replace("/(auth)/login");
        });
      } else {
        setErrorActionText(undefined);
        setErrorAction(undefined);
      }

      setErrorModalVisible(true);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
        <BrandLogo />
      </View>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-sm text-gray-500 mb-1">Paso 4 de 4</Text>
        <Text className="text-3xl font-bold text-black mb-3">
          Revisa tus datos
        </Text>

        {/* Photo Picker */}
        <RNPressable
          onPress={pickImage}
          style={{ alignSelf: "center" }}
          className="items-center justify-center my-4 relative"
        >
          <View className="w-36 h-36 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 justify-center items-center overflow-hidden">
            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                style={{ width: 144, height: 144 }}
              />
            ) : (
              <View className="items-center justify-center">
                <Text className="text-5xl mb-1">📷</Text>
                <Text className="text-xs text-slate-500 font-semibold">
                  Agregar foto
                </Text>
              </View>
            )}
          </View>
        </RNPressable>

        {/* Review Box with Margin Top and Guaranteed Padding */}
        <View
          style={{ marginTop: 32, paddingVertical: 40, paddingHorizontal: 16 }}
          className="bg-gray-100 rounded-xl gap-3 mb-5"
        >
          <Row label="Nombre" value={fullName} />
          <Row label="Email" value={email} />
          <Row
            label="Password"
            value={"•".repeat(Math.max(password.length, 4))}
          />
          <Row label="Rol" value={role} />
          {interest ? <Row label="Intereses" value={interest} /> : null}
          <Row label="Descripción" value={description} />
        </View>

        <Button
          text={submitting ? "Creando…" : "Crear cuenta"}
          bgColor="#005BBF"
          textColor="#FFFFFF"
          onClick={handleCreate}
        />
      </ScrollView>

      {/* Modal de Error de Registro */}
      <ErrorModal
        visible={errorModalVisible}
        message={errorMessage}
        onClose={() => setErrorModalVisible(false)}
        actionText={errorActionText}
        onAction={errorAction}
      />
    </SafeAreaView>
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
