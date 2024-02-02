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
  startDate: (() => {
    let today = new Date()
    let thisMonth = today.getMonth()+1
    let thisYear = today.getFullYear()
    let startDate = `${thisYear}-${thisMonth}`
    return startDate
  })(),
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
