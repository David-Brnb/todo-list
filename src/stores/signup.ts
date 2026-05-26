import { create } from 'zustand';

export type SignupFields = {
  email: string;
  password: string;
  name: string;
};

type SignupState = SignupFields & {
  setField: <K extends keyof SignupFields>(key: K, value: SignupFields[K]) => void;
  reset: () => void;
};

const initial: SignupFields = {
  email: '',
  password: '',
  name: '',
};

export const useSignupStore = create<SignupState>((set) => ({
  ...initial,
  setField: (key, value) => set({ [key]: value } as Pick<SignupFields, typeof key>),
  reset: () => set(initial),
}));
