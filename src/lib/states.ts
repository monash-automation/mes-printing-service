import { create } from 'zustand';

type UserState = {
  id: string | undefined;
  accessToken: string | undefined;
};

type UserAction = {
  reset: () => void;
  update: (id: UserState['id'], accessToken: UserState['accessToken']) => void;
};

const initialUserState: UserState = {
  id: undefined,
  accessToken: undefined,
};

export const useUserStore = create<UserState & UserAction>((set) => ({
  ...initialUserState,
  reset: () => set(initialUserState),
  update: (id, accessToken) =>
    set(() => ({
      id: id,
      accessToken: accessToken,
    })),
}));
