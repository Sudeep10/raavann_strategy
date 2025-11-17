import { create } from "zustand";

interface UserStore {
  team?: string;
  setTeam: (team: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  team: undefined,
  setTeam: (team: string) => set({ team }),
}));
