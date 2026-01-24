import { create } from "zustand";

interface MobileSidebarState {
    isOpen: boolean;
    toggle: () => void;
    close: () => void;
}

export const useMobileSidebarStore = create<MobileSidebarState>((set) => ({
    isOpen: false,
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
    close: () => set({ isOpen: false }),
}));
