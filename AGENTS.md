# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v56.0.0/ before writing any code.
This project is on **Expo SDK 56** (expo-router, NativeWind v5 / react-native-css, React 19, RN 0.85).

# Project conventions

Follow these patterns for any future implementation so the codebase stays consistent.

## Styling — always import UI primitives from `@/tw`

Import `View`, `Text`, `Pressable`, `ScrollView`, `TextInput` from `@/tw`, **never** from
`react-native`. Only the `@/tw` wrappers interpret NativeWind `className`; raw `react-native`
components silently ignore it (text ends up top-left / unstyled). `Modal`, `ActivityIndicator`,
`Dimensions`, etc. that have no `@/tw` wrapper come from `react-native` and are styled via inline
`style`.

- Multiline `TextInput`: set padding via inline `style={{ padding: ... }}`, not className —
  className vertical padding is dropped on multiline inputs.

## Screens & navigation

- Routes live under `src/app` (expo-router). Sheet-style screens (add/edit) are normal routes
  registered in the relevant `_layout.tsx` with `options={{ presentation: 'modal' }}` so they
  appear as native iOS sheets — do **not** build in-component `Modal` sheets for this.
- Add/edit screens follow the `src/app/tasklist/add-task.tsx` / `edit-task.tsx` pattern:
  header with title + close `xmark`, `ScrollView` body, inputs from `@/project_components`,
  a `Button` to submit, plus `ErrorModal` (validation/errors) and `LoadingModal` (saving).
- **Initial-load spinner:** on a modal-presented screen, render the initial fetch state with an
  inline `ActivityIndicator`, NOT a `LoadingModal`. A full-screen `Modal` shown/dismissed during
  the sheet's entry animation leaves a transparent overlay that kills touch handling. Use
  `LoadingModal` only for actions that happen after the screen settles (e.g. saving).
- Refresh data on return with `useFocusEffect`. For instant feedback do optimistic local updates
  (toggle/delete) and roll back / refetch on failure.

## Reusable components

Live in `src/project_components/<kebab-name>/` with `<name>.tsx` + `index.ts`, and are re-exported
from `src/project_components/index.ts` (the `@/project_components` barrel). Compose from existing
primitives (`Button`, `IconBadge`, inputs, `SectionHeading`, `DeleteConfirmModal`, etc.) before
making new ones.

## Data layer

- Types in `src/types/<domain>/`, axios services in `src/services/axios/<domain>/`.
- Each service: `try`/`catch` with `console.error`, then `throw` (mutations) or return an empty
  value (queries). Use the shared `api` instance from `src/services/axios/api.ts`.
- **DTO field names must match the backend JSON exactly.** Java boolean getters `isXxx()`
  serialize to `xxx` — use `completed` (not `isCompleted`) and `taskListIds`.
- **Priority** maps between the selector values and the backend enum:
  `alta↔HIGH`, `media↔MEDIUM`, `baja↔LOW`.
- **Dates** (`LocalDateTime`): send ISO without timezone via `date.toISOString().split(".")[0]`.

## FlatList

Dedupe data by `id` (`new Map(...).values()`); for pagination guard concurrent loads with a
`useRef` flag and filter out ids already in state before appending.
