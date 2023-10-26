import { Firm } from "@prisma/client";
import { create } from "zustand";

type State = {
  theFirms: Firm[] | undefined;
};

type Action = {
  setTheFirms: (firms: State["theFirms"]) => void;
  setRequestedFirm: (firm: Firm ) => void
};

const useAllFirms = create<State & Action>((set) => ({
  theFirms: undefined,
  setTheFirms: (firmsToSet) =>
    set(() => {
      console.log(firmsToSet);
      return { theFirms: firmsToSet };
    }),
  setRequestedFirm: (requestedFirm: Firm) => set(() => {
    const theUpdatedFirms = theFirms.map()
  })
}));

export default useAllFirms;
