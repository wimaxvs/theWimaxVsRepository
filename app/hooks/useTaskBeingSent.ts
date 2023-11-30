import { create } from "zustand";
import { SafeSettlement } from "../types";

type State = {
  taskBeingSent: Partial<SafeSettlement>;
  pageNumber: number;
};

type Action = {
  setTaskBeingSent: (Task: Partial<SafeSettlement>, reset?: boolean) => void;
  setPageNumber: (number: number) => void;
};

const useTaskBeingSent = create<State & Action>((set) => ({
  pageNumber: 1,
  taskBeingSent: {},
  setTaskBeingSent: (TaskToSet, reset) =>
    set((state) => {
      if (!reset) {
        return {
          taskBeingSent: {
            ...state.taskBeingSent,
            ...TaskToSet,
          },
        };
      } else {
        return { taskBeingSent: TaskToSet };
      }
    }),
  setPageNumber: (num) =>
    set(() => {
      return { pageNumber: num };
    }),
}));

export default useTaskBeingSent;
