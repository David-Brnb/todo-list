import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./auth";

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
