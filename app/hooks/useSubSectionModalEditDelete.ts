import { create } from "zustand";

interface useSubSectionModalEditDeleteStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSubSectionModalEditDelete = create<useSubSectionModalEditDeleteStore>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }), 
  })
);

export default useSubSectionModalEditDelete;
