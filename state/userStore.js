// state/userStore.js

import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null,
  role: null, // 'Stacker' or 'Seeker'
  rulesAccepted: false,

  setUser: (userData) => set({ user: userData }),
  clearUser: () => set({ user: null, role: null, rulesAccepted: false }),

  setRole: (selectedRole) => set({ role: selectedRole }),
  setRulesAccepted: (status) => set({ rulesAccepted: status }),
}));

export default useUserStore;
