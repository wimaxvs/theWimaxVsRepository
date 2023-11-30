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
    set(() => {
      return { isFirstTab: value };
    }),
  setTheLocation: (locationToSet) =>
    set((state) => {
      console.log(state.theLocation)
      return { theLocation: locationToSet };
    }),
}));

export default usePracNav;
