import { RegisterUserInfo } from '@/types/users/registerUserInfo';
import { create } from 'zustand';

type SignupState = RegisterUserInfo & {
  setField: <K extends keyof RegisterUserInfo>(key: K, value: RegisterUserInfo[K]) => void;
  reset: () => void;
};

const initial: RegisterUserInfo = {
  email: '',
  password: '',
  full_name: '',
  rol: '',
  interests: '',
  description: '',
  firebaseImageUuid: '',
  firebaseUuid: '',
};

export const useSignupStore = create<SignupState>((set) => ({
  ...initial,
  setField: (key, value) => set({ [key]: value } as Pick<RegisterUserInfo, typeof key>),
  reset: () => set(initial),
}));
