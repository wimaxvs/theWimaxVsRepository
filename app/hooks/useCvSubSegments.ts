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
  setSubsegments: (subSegs: SubSeg[]) => void;
  removeSubseg: (id: SubSeg["subsegmentId"]) => void;
}

const useCvSubSegments = create<SubSegmentStore>()(
  persist(
    (set, get) => ({
      subsegments: [],

      setSubsegments: (subSegs) =>
        set((state) => {
          const updatedSubsegment = Array.isArray(state.subsegments)
            ? [...state.subsegments]
            : [];

          subSegs.map((segment) => {
            const index = updatedSubsegment.findIndex(
              (item) => item.subsegmentId === segment.subsegmentId
            );
            if (index !== -1) {
              updatedSubsegment[index] = segment;
            } else {
              updatedSubsegment.push(segment);
            }
          });

          return { subsegments: updatedSubsegment };
        }),
      removeSubseg: (id) =>
        set((state) => ({
          subsegments: state.subsegments.filter((subseg) => subseg.subsegmentId !== id),
        })),
    }),
    {
      name: "subsegment-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useCvSubSegments;
