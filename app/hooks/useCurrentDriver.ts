import { create } from "zustand";
import { SafeDriver } from "../types";
import { JoinRequest } from "@prisma/client";

type State = {
  currentDriver: Partial<SafeDriver> | undefined;
  allDrivers: Partial<SafeDriver>[];
};

type Action = {
  setCurrentDriver: (currentDriver: State["currentDriver"]) => void;
  setAllDrivers: (driversToSet: Partial<SafeDriver>[]) => void;
  setDriver: (driverToSet: Partial<SafeDriver>) => void;
};

const useDriver = create<State & Action>((set) => ({
  allDrivers: [],
  currentDriver: undefined,
  setCurrentDriver: (DriverStringToSet) =>
    set(() => {
      return { currentDriver: DriverStringToSet };
    }),
  setAllDrivers: (driversToSet: Partial<SafeDriver>[]) => {
    set(() => {
      return { allDrivers: driversToSet };
    });
  },
  setDriver: (driverToSet: Partial<SafeDriver>) => {
    set((state) => {
      return {
        allDrivers: state.allDrivers.map((driver) =>
          driver.id === driverToSet.id
            ? {
                ...driver,
                role: driverToSet.role,
                joinRequest: {
                  ...driverToSet.joinRequest as JoinRequest,
                },
              }
            : driver
        ),
      };
    });
  },
}));

export default useDriver;
