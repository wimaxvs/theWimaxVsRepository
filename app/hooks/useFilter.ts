import { create } from "zustand";

type State = {
  startDate: string | number | undefined;
  endDate: number | string | undefined;
};

type Action = {
  setStartDate: (startDateToSet: State["startDate"]) => void;
  setEndDate: (endDateToSet: State["endDate"]) => void;
};

const useFilter = create<State & Action>((set) => ({
  startDate: undefined,
  endDate: undefined,
  setStartDate: (startDateToSet) =>
    set(() => {
      console.log(startDateToSet);
      return { startDate: startDateToSet };
    }),
  setEndDate: (endDateToSet) =>
    set(() => {
      console.log(endDateToSet);
      return { endDate: endDateToSet };
    }),
}));

export default useFilter;
