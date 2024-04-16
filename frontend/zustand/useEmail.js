import { create } from "zustand";

const useEmailStore = create((set, get) => ({
  userEmail: localStorage.getItem("userEmail") || null,
  setUserEmail: (userEmail) => {
    localStorage.setItem("userEmail", userEmail);
    set({ userEmail });
  },
}));

export { useEmailStore };