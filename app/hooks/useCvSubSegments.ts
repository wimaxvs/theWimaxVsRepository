import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type SubSeg = {
  parentSection?: string;
  subsegmentId?: string;
  order?: number;
  title?: string;
  subtitle?: string;
  dateFrom?: Date;
  dateTo?: Date;
  content?: string[];
};

interface SubSegmentStore {
  subsegments: SubSeg[];
  setSubsegments: (subSeg: SubSeg) => void;
}

const useCvSubSegments = create<SubSegmentStore>()(
  persist(
    (set, get) => ({
      subsegments: [],

      setSubsegments: (subSeg) =>
        set((state) => {
          const updatedSubsegment = Array.isArray(state.subsegments)
            ? [...state.subsegments]
            : [];
          const index = updatedSubsegment.findIndex(
            (item) => item.subsegmentId === subSeg.subsegmentId
          );
          if (index !== -1) {
            updatedSubsegment[index] = subSeg;
          } else {
            updatedSubsegment.push(subSeg);
          }
          return { subsegments: updatedSubsegment };
        }),
    }),
    {
      name: "subsegment-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useCvSubSegments;
