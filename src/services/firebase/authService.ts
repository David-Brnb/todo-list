import { RegisterUserInfo } from "@/types/registerUserInfo";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth } from "./auth";
import { storage } from "./storage";

const LOGIN_ERROR_MESSAGES: Record<string, string> = {
  "auth/invalid-credential":
    "Correo o contraseña incorrectos. Verifica tus datos e intenta de nuevo.",
  "auth/invalid-email": "El correo electrónico no es válido.",
  "auth/user-not-found":
    "No existe una cuenta con este correo electrónico.",
  "auth/wrong-password":
    "Contraseña incorrecta. Por favor, intenta de nuevo.",
  "auth/user-disabled": "Esta cuenta ha sido deshabilitada.",
  "auth/too-many-requests":
    "Demasiados intentos fallidos. Intenta de nuevo más tarde.",
  "auth/network-request-failed":
    "Error de conexión. Verifica tu conexión a internet.",
};

const REGISTER_ERROR_MESSAGES: Record<string, string> = {
  "auth/email-already-in-use":
    "Ya existe una cuenta con este correo electrónico.",
  "auth/invalid-email": "El correo electrónico no es válido.",
  "auth/weak-password":
    "La contraseña es muy débil. Usa al menos 8 caracteres.",
  "auth/network-request-failed":
    "Error de conexión. Verifica tu conexión a internet.",
};

function mapAuthError(
  err: unknown,
  messages: Record<string, string>,
  fallback: string,
): Error {
  const code =
    typeof err === "object" && err !== null && "code" in err
      ? String((err as { code: unknown }).code)
      : "";
  return new Error(messages[code] ?? fallback);
}

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    const token = await user.getIdToken();
    return token;
  } catch (err) {
    throw mapAuthError(
      err,
      LOGIN_ERROR_MESSAGES,
      "No se pudo iniciar sesión. Intenta de nuevo.",
    );
  }
};

export const logout = async () => {
  await signOut(auth);
};

export const register = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    const token = await user.getIdToken();
    return token;
  } catch (err) {
    throw mapAuthError(
      err,
      REGISTER_ERROR_MESSAGES,
      "No se pudo crear la cuenta. Intenta de nuevo.",
    );
  }
};

/**
 * Creates a new Firebase Auth account, uploads the profile photo to Storage,
 * and compiles the RegisterUserInfo payload containing the Auth Uid and image URL.
 */
export const registerUserWithDetails = async (
  userInfo: Omit<RegisterUserInfo, "firebaseUuid" | "firebaseImageUuid">,
  imageUri: string | null
): Promise<{ token: string; userPayload: RegisterUserInfo }> => {
  try {
    // 1. Create User in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userInfo.email,
      userInfo.password
    );
    const user = userCredential.user;

    // 2. Upload Profile Image to Firebase Storage if provided
    let imageUrl = "";
    if (imageUri) {
      try {
        // Use XMLHttpRequest to get a compatible Blob in React Native (fixes ArrayBuffer error)
        const blob = await new Promise<Blob>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            console.error("XHR request failed", e);
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", imageUri, true);
          xhr.send(null);
        });

        const storageRef = ref(storage, `profiles/${user.uid}.jpg`);
        await uploadBytes(storageRef, blob);
        imageUrl = await getDownloadURL(storageRef);
      } catch (storageError) {
        console.warn("Storage upload failed, falling back...", storageError);
      }
    }

    const token = await user.getIdToken();

    // 3. Compile the completed RegisterUserInfo payload
    const userPayload: RegisterUserInfo = {
      email: userInfo.email,
      password: userInfo.password,
      full_name: userInfo.full_name,
      rol: userInfo.rol,
      interests: userInfo.interests,
      description: userInfo.description,
      firebaseImageUuid: imageUrl,
      firebaseUuid: user.uid,
    };

    return { token, userPayload };
  } catch (err) {
    throw mapAuthError(
      err,
      REGISTER_ERROR_MESSAGES,
      "No se pudo completar el registro de usuario. Intenta de nuevo."
    );
  }
};
