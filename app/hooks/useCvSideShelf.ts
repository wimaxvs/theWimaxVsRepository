import { create } from "zustand";

interface SideShelfStore {
  offset: number;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setOffset: (amount: number) => void;
}

const useCvSideShelf = create<SideShelfStore>((set) => ({
  offset: 0,
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setOffset: (amount) => set((state) => ({ offset: state.offset + amount })),
}));

export default useCvSideShelf;
