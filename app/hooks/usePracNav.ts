import { create } from "zustand";

type State = {
  theLocation: string;
  isFirstTab: boolean;
};

type Action = {
  setTheLocation: (location: State["theLocation"]) => void;
  setIsFirstTab: (bool: State["isFirstTab"]) => void;
};

const usePracNav = create<State & Action>((set) => ({
  isFirstTab: true,
  theLocation: "Zatrudnij",
  setIsFirstTab: (value) =>
    set((state) => {
      console.log(state.isFirstTab);
      return { isFirstTab: value };
    }),
  setTheLocation: (locationToSet) =>
    set(() => {
      return { theLocation: locationToSet };
    }),
}));

export default usePracNav;
