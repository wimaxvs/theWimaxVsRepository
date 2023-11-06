import { create } from "zustand";

type State = {
  theLocation: string;
};

type Action = {
  setTheLocation: (location: State["theLocation"]) => void;
};

const usePracNav = create<State & Action>((set) => ({
  theLocation: "Zatrudnij",
  setTheLocation: (locationToSet) =>
    set(() => {
      return { theLocation: locationToSet };
    }),
}));

export default usePracNav;
