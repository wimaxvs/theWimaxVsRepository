import { create } from "zustand";

interface useBioModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useBioModal = create<useBioModalStore>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }), 
  })
);

export default useBioModal;
