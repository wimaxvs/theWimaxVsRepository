import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { SafeUser } from "@/app/types";
import getCurrentUser from "../actions/getCurrentUser";

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

type user = {
  firstname?: string;
  lastname?: string;
  email?: string;
  image?: string | Blob | null;
  telephone?: string;
  dob?: Date;
  location?: string;
};

interface SubSegmentStore {
  theCurrentUser?: user;
  subsegments: SubSeg[];
  setSubsegments: (subSegs: SubSeg[]) => void;
  setEssentials: (handm: SubSegmentStore["theCurrentUser"]) => void;

  removeSubseg: (id: SubSeg["subsegmentId"]) => void;
}

const useCvSubSegments = create<SubSegmentStore>()(
  persist(
    (set, get) => ({
      theCurrentUser: {
        firstname: "",
        lastname: "",
        email: "",
        image: null,
        telephone: "",
        dob: new Date(),
        location: "",
      },
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
          subsegments: state.subsegments.filter(
            (subseg) => subseg.subsegmentId !== id
          ),
        })),

      setEssentials: (handm) => set({ theCurrentUser: { ...handm } }),
    }),
    {
      name: "subsegment-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useCvSubSegments;
