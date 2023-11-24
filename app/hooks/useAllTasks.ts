import { Settlement } from "@prisma/client";
import { create } from "zustand";
import { SafeSettlement } from "../types";

type State = {
  theTasks: Partial<SafeSettlement>[];
  taskBeingAssigned: Partial<SafeSettlement>;
};

type Action = {
  setTheTasks: (Tasks: State["theTasks"]) => void;
  setRequestedTask: (Task: Settlement) => void;
  setTaskBeingAssigned: (
    Task: Partial<SafeSettlement>,
    reset?: boolean
  ) => void;
};

const useAllTasks = create<State & Action>((set) => ({
  theTasks: [],
  taskBeingAssigned: {},
  setTaskBeingAssigned: (TaskToSet, reset) =>
    set((state) => {
      if (!reset) {
        return {
          taskBeingAssigned: {
            ...state.taskBeingAssigned,
            ...TaskToSet,
          },
        };
      } else {
        return { taskBeingAssigned: TaskToSet };
      }
    }),
  setTheTasks: (TasksToSet) =>
    set(() => {
      return { theTasks: TasksToSet };
    }),

  setRequestedTask: (requestedTask: Settlement) =>
    set((state) => {
      return {
        theTasks: state.theTasks?.map((Task) =>
          Task.id === requestedTask.id
            ? { ...Task, ...requestedTask }
            : Task
        ),
      };
    }),
}));

export default useAllTasks;
