import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, initializeAuth, type Auth } from "firebase/auth";
// getReactNativePersistence is exported by Firebase's React Native build at
// runtime, but firebase/auth's published types resolve to the browser build,
// which omits it — so we import it separately and silence the wrong type error.
// @ts-ignore — present at runtime via @firebase/auth's react-native entry
import { getReactNativePersistence } from "firebase/auth";
import { app } from "./firebase";

// Initialize Auth with AsyncStorage persistence so the Firebase session — and,
// crucially, the refresh token used to mint new ID tokens — survives app
// restarts. The default getAuth() uses in-memory persistence on React Native,
// which silently dropped the session (and broke token refresh) on relaunch.
//
// initializeAuth throws if it runs twice on the same app (e.g. Fast Refresh),
// so we fall back to getAuth() when it's already been initialized.
let auth: Auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} catch {
  auth = getAuth(app);
}

export { auth };
