import { Firm } from "@prisma/client";
import { create } from "zustand";
import { SafeFirm } from "../types";

type State = {
  theFirms: Partial<SafeFirm>[] | undefined;
};

type Action = {
  setTheFirms: (firms: State["theFirms"]) => void;
  setRequestedFirm: (firm: Firm) => void;
};

const useAllFirms = create<State & Action>((set) => ({
  theFirms: undefined,
  setTheFirms: (firmsToSet) =>
    set(() => {
      return { theFirms: firmsToSet };
    }),

  setRequestedFirm: (requestedFirm: Firm) =>
    set((state) => {
      const theFirmsAsArray = Array.isArray(state.theFirms)
        ? [...state.theFirms]
        : [];

      const index = state.theFirms?.findIndex(
        (item) => item.id === requestedFirm.id
      );
      if (index && index > -1) {
        theFirmsAsArray[index] = requestedFirm;
      }
      // else {
      //   theFirmsAsArray.push(requestedFirm);
      // }

      return { theFirms: theFirmsAsArray };
    }),
}));

export default useAllFirms;
