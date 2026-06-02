# Scholarly Atelier — Todo List App 📚✅

A full-stack task-management mobile app built with **React Native + Expo**. Users
sign in with **Firebase Authentication**, and the app talks to a custom backend
over an authenticated REST API (Firebase **JWT** ID tokens). You can create and
organize **task lists**, manage **tasks** (with priority and due dates), search
across everything, and view your profile.

> Final project for the React Native module. Mobile app lives in this repo; the
> backend is a separate service (see [Deployed links](#-deployed-links)).

---

## ✨ Features

- **Firebase email/password auth** with multi-step sign-up (profile photo, role,
  interests) and a persisted session that survives app restarts.
- **Home** — today's tasks + paginated list of your projects with progress.
- **Task lists CRUD** — create/edit (color + icon picker), view detail, delete.
- **Tasks CRUD** — create/edit (priority, due date), complete toggle, delete,
  with optimistic UI updates and rollback on failure.
- **Search** across both lists and tasks.
- **Profile / About** screen and a working **logout**.
- Loading spinners, empty states, and HTTP error handling throughout.

---

## 🛠 Tech stack

| Area       | Tech                                                                  |
| ---------- | --------------------------------------------------------------------- |
| Framework  | Expo SDK 56, React Native 0.85, React 19                              |
| Navigation | expo-router (file-based, native tabs, modal sheets)                   |
| Styling    | NativeWind v5 / react-native-css (Tailwind), custom `@/tw` primitives |
| Auth       | Firebase Authentication (email/password) + JWT ID tokens              |
| Networking | Axios (custom instance + request/response interceptors)               |
| State      | Zustand (+ AsyncStorage persistence)                                  |
| Storage    | Firebase Storage (profile photos)                                     |
| Components | Reusable kit in `src/project_components` (+ Storybook)                |

---

## 📋 Prerequisites

- **Node.js 20+** and **npm**
- A **Firebase** project with **Email/Password** auth enabled (and Storage if you
  want profile photos)
- The backend running and reachable (locally or deployed)
- To run on a device/simulator: **Xcode** (iOS) or **Android Studio** (Android),
  or the **Expo Go** app

---

## 🚀 Installation & running

```bash
# 1. Install dependencies
npm install

# 2. Create your environment file (see below) and fill it in
cp .env.example .env

# 3. Start the dev server
npx expo start
```

Then press `i` (iOS simulator), `a` (Android emulator), or `w` (web), or scan the
QR code with Expo Go.

```bash
npm run ios        # open directly in the iOS simulator
npm run android    # open directly in the Android emulator
npm run web        # run in the browser
```

> **Note:** This app uses the Firebase JS SDK and native modules; it runs in a
> development build or simulator. Use the iOS simulator for the most reliable
> experience.

---

## 🔑 Environment variables

All config is provided via **`EXPO_PUBLIC_*`** variables in a `.env` file at the
project root. A template is in [`.env.example`](./.env.example):

```bash
# Firebase (Project settings → General → Your apps → Web app config)
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=

# Backend REST API base URL (no trailing slash), e.g. https://api.example.com
EXPO_PUBLIC_API_URL=
```

Notes:

- `EXPO_PUBLIC_*` values are **bundled into the client** and are not secret —
  the Firebase _web_ config is safe to commit/share for evaluation.
- The app reads these at build time. After editing `.env`, restart the dev
  server with `npx expo start --clear`.
- **Don't use `http://localhost`** for `EXPO_PUBLIC_API_URL` on a real device —
  `localhost` points at the device itself. Use your machine's LAN IP
  (`http://192.168.x.x:PORT`) for local testing, or the deployed HTTPS URL.

---

## 🌐 Deployed links

- **Backend API:** `https://to-do-860378882125.us-central1.run.app` — deployed on
  Google Cloud Run and already set as `EXPO_PUBLIC_API_URL` in `.env`. (It may
  cold-start on the first request after being idle, hence the 30s client timeout.)
- **Web deploy:** managed separately, outside this repository.

## 👤 Test user

You can register a fresh account from the sign-up screen, or use the demo account:

- **Email:** `2@gmail.com`
- **Password:** `12345678`

---

## 🧱 Project structure

```
src/
  app/                  # expo-router routes
    (auth)/             # login + multi-step signup (redirects out if logged in)
    (app)/              # authenticated area (redirects to login if not)
      (tabs)/           # Home, Explore (search), Account
      add-tasklist.tsx  # modal sheets
    tasklist/           # list detail [id] + add/edit task & list (modals)
  project_components/   # reusable UI kit (Button, TaskCard, EmptyState, ...)
  services/
    axios/              # api instance + interceptors + per-domain services
    firebase/           # app, auth (AsyncStorage persistence), storage
  stores/               # Zustand stores (auth, signup)
  types/                # DTOs per domain
  tw/                   # NativeWind-aware View/Text/Pressable/... primitives
```

### Architecture notes

- **Axios instance** (`src/services/axios/api.ts`) attaches a live Firebase JWT
  on every request and, on `401`, transparently refreshes the token once and
  retries; if refresh fails it signs the user out. 30s timeout for cold-starting
  hosts.
- **Auth/session** persists via Firebase (`initializeAuth` + AsyncStorage) and a
  Zustand store; route groups guard access (`(app)` vs `(auth)`).
- **Services** follow one pattern: `try/catch` → `console.error` → rethrow
  (mutations) or return an empty value (queries).

---

## 📜 Available scripts

| Script                            | Description                 |
| --------------------------------- | --------------------------- |
| `npm start`                       | Start the Expo dev server   |
| `npm run ios` / `android` / `web` | Open on a specific platform |
| `npm run lint`                    | Run Expo's ESLint           |
| `npm run storybook:ios`           | Run the component Storybook |
