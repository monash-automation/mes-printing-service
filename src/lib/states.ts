import { create } from 'zustand';
import { PrinterServerApi } from './api';

type UserState = {
  id: string | undefined;
  accessToken: string | undefined;
  api: PrinterServerApi;
};

type UserAction = {
  reset: () => void;
  updateId: (id: UserState['id']) => void;
  updateAccessToken: (accessToken: UserState['accessToken']) => void;
};

const initialUserState: UserState = { id: undefined, accessToken: undefined, api: new PrinterServerApi(),};

export const useUserStore = create<UserState & UserAction>((set) => ({
  ...initialUserState,
  reset: () => set(initialUserState),
  updateId: (id) => set(() => ({ id: id })),
  updateAccessToken: (accessToken) => set(() => ({ accessToken: accessToken, api: new PrinterServerApi(accessToken), })),
}));
