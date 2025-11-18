import { create } from "zustand";

interface UserStore {
  team?: string;
  setTeam: (team: string) => void;
  companyId?: string;
  setCompanyId: (companyId: string) => void;
  companyName?: string;
  setCompanyName: (companyName: string) => void;
  strategy?: string;
  setStrategy?: (strategy: string) => void;
  subStrategy?: string;
  setSubStrategy?: (subStrategy: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  team: undefined,
  companyId: undefined,
  companyName: undefined,
  strategy: undefined,
  subStrategy: undefined,
  setTeam: (team: string) => set({ team }),
  setCompanyId: (companyId: string) => set({ companyId }),
  setCompanyName: (companyName: string) =>
    set({
      companyName,
    }),
  setStrategy: (strategy: string) => set({ strategy: strategy }),
  setSubStrategy: (subStrategy: string) => set({ subStrategy: subStrategy }),
}));
