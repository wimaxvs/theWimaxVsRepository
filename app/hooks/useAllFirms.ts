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
      return {
        theFirms: state.theFirms?.map((firm) =>
          firm.id === requestedFirm.id ? { ...firm, ...requestedFirm } : firm
        ),
      };
    }),
}));

export default useAllFirms;
