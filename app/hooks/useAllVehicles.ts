import { Vehicle } from "@prisma/client";
import { create } from "zustand";
import { SafeVehicle } from "../types";

type State = {
  theVehicles: Partial<SafeVehicle>[];
  vehicleBeingAssigned: Partial<SafeVehicle>;
  vehicleBeingEdited: Partial<SafeVehicle>;
};

type Action = {
  setTheVehicles: (Vehicles: State["theVehicles"]) => void;
  setRequestedVehicle: (Vehicle: Vehicle) => void;
  setVehicleBeingAssigned: (
    Vehicle: Partial<SafeVehicle>,
    reset?: boolean
  ) => void;
  setVehicleBeingEdited: (
    Vehicle: Partial<SafeVehicle>,
    reset?: boolean
  ) => void;
};

const useAllVehicles = create<State & Action>((set) => ({
  theVehicles: [],
  vehicleBeingAssigned: {},
  vehicleBeingEdited: {},
  setVehicleBeingAssigned: (VehicleToSet, reset) =>
    set((state) => {
      if (!reset) {
        return {
          vehicleBeingAssigned: {
            ...state.vehicleBeingAssigned,
            ...VehicleToSet,
          },
        };
      } else {
        return { vehicleBeingAssigned: VehicleToSet };
      }
    }),
  setVehicleBeingEdited: (VehicleToSet, reset) =>
    set((state) => {
      if (!reset) {
        return {
          vehicleBeingEdited: {
            ...state.vehicleBeingEdited,
            ...VehicleToSet,
          },
        };
      } else {
        return { vehicleBeingEdited: VehicleToSet };
      }
    }),
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
