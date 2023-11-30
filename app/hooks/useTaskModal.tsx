import { create } from "zustand";
import { SafeSettlement } from "../types";

type State = {
  taskToShow: Partial<SafeSettlement>;
  isOpen: boolean;
};

type Action = {
  setTaskToShow: (Task: Partial<SafeSettlement>, reset?: boolean) => void;
  setIsOpen: () => void;
};

const useTaskModal = create<State & Action>((set) => ({
  taskToShow: {},
  isOpen: false,
  setTaskToShow: (TaskToSet, reset) =>
    set((state) => {
      if (!reset) {
        return {
          taskToShow: {
            ...state.taskToShow,
            ...TaskToSet,
          },
        };
      } else {
        return { taskToShow: TaskToSet };
      }
    }),
  setIsOpen: () =>
    set((state) => {
      return { isOpen: !state.isOpen };
    }),
}));

export default useTaskModal;
