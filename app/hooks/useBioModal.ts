import { create } from "zustand";

interface useSubSectionModalEditDeleteStore {
  isOpen: boolean;
  editing?: boolean;
  onOpen: () => void;
  onEdit: () => void;
  onClose: () => void;
}

const useSubSectionModalEditDelete = create<useSubSectionModalEditDeleteStore>(
  (set) => ({
    editing: false,
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onEdit: () => set({ isOpen: true, editing: true }),
    onClose: () => set({ isOpen: false, editing: false }),
  })
);

export default useSubSectionModalEditDelete;
