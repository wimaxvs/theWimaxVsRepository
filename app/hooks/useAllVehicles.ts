import { Vehicle } from "@prisma/client";
import { create } from "zustand";
import { SafeVehicle } from "../types";

type State = {
  theVehicles: Partial<SafeVehicle>[];
};

type Action = {
  setTheVehicles: (Vehicles: State["theVehicles"]) => void;
  setRequestedVehicle: (Vehicle: Vehicle) => void;
};

const useAllVehicles = create<State & Action>((set) => ({
  theVehicles: [],
  setTheVehicles: (VehiclesToSet) =>
    set(() => {
      return { theVehicles: VehiclesToSet };
    }),

  setRequestedVehicle: (requestedVehicle: Vehicle) =>
    set((state) => {
      return {
        theVehicles: state.theVehicles?.map((Vehicle) =>
          Vehicle.id === requestedVehicle.id
            ? { ...Vehicle, ...requestedVehicle }
            : Vehicle
        ),
      };
    }),
}));

export default useAllVehicles;
