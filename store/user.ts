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
  compareStrategy?: string;
  setCompareStrategy?: (compareStrategy: string) => void;
  compareSubStrategy?: string;
  setCompareSubStrategy?: (compareSubStrategy: string) => void;
  companyA: string;
  setCompanyA: (companyA: string) => void;
  companyB: string;
  setCompanyB: (companyB: string) => void;
  showCompareDialog: boolean;
  setShowCompareDialog: (show: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  team: undefined,
  companyId: undefined,
  companyName: undefined,
  strategy: undefined,
  subStrategy: undefined,
  compareStrategy: undefined,
  compareSubStrategy: undefined,
  companyA: "Company A",
  companyB: "Company B",
  showCompareDialog: false,
  setTeam: (team: string) => set({ team }),
  setCompanyId: (companyId: string) => set({ companyId }),
  setCompanyName: (companyName: string) =>
    set({
      companyName,
    }),
  setStrategy: (strategy: string) => set({ strategy: strategy }),
  setSubStrategy: (subStrategy: string) => set({ subStrategy: subStrategy }),
  setCompareStrategy: (compareStrategy: string) =>
    set({ compareStrategy: compareStrategy }),
  setCompareSubStrategy: (compareSubStrategy: string) =>
    set({ compareSubStrategy: compareSubStrategy }),
  setCompanyA: (companyA: string) => set({ companyA }),
  setCompanyB: (companyB: string) => set({ companyB }),
  setShowCompareDialog: (show: boolean) => set({ showCompareDialog: show }),
}));
