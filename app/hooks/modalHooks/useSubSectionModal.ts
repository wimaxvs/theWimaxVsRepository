import { create } from 'zustand';

interface SubSectionModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSubSectionModal = create<SubSectionModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useSubSectionModal;
