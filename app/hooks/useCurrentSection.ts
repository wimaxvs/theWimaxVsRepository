import { create } from 'zustand';

type State = {
  currentSection: string;
};

type Action = {
  setCurrentSection: (currentSection: State["currentSection"]) => void;
};

const useSubSectionModal = create<State & Action>((set) => ({
  currentSection: "",
  setCurrentSection: (sectionStringToSet) => set(() => ({ currentSection: sectionStringToSet })),
}));


export default useSubSectionModal;
