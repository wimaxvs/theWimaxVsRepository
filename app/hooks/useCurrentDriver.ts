import { create } from "zustand";
import { SafeDriver } from "../types";

type State = {
  currentDriver: Partial<SafeDriver> | undefined;
};

type Action = {
  setCurrentDriver: (currentDriver: State["currentDriver"]) => void;
};

const useDriver = create<State & Action>((set) => ({
  currentDriver: undefined,
  setCurrentDriver: (DriverStringToSet) =>
    set(() => {
      return { currentDriver: DriverStringToSet };
    }),
}));

export default useDriver;
