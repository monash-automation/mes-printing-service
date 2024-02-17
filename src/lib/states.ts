import { PrinterServer } from '@/lib/api.ts';
import { create } from 'zustand';

type UserState = {
  id: string | undefined;
  accessToken: string | undefined;
  printerServer: PrinterServer;
};

type UserAction = {
  reset: () => void;
  updateId: (id: UserState['id']) => void;
  updateAccessToken: (accessToken: UserState['accessToken']) => void;
};

const initialUserState: UserState = {
  id: undefined,
  accessToken: undefined,
  printerServer: new PrinterServer(),
};

export const useUserStore = create<UserState & UserAction>((set) => ({
  ...initialUserState,
  reset: () => set(initialUserState),
  updateId: (id) => set(() => ({ id: id })),
  updateAccessToken: (accessToken) =>
    set(() => ({
      accessToken: accessToken,
      printerServer: new PrinterServer(accessToken),
    })),
}));
