import { Driver } from "@prisma/client";
import { create } from "zustand";

type State = {
  currentDriver: Driver | undefined;
};

type Action = {
  setCurrentDriver: (currentDriver: State["currentDriver"]) => void;
};

const useDriver = create<State & Action>((set) => ({
  currentDriver: undefined,
  setCurrentDriver: (DriverStringToSet) =>
    set(() => {
      // console.log(DriverStringToSet)
      return { currentDriver: DriverStringToSet };
    }),
}));

export default useDriver;
