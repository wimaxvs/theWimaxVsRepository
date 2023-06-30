import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type SubSeg = {
  parentSection?: string;
  subsegmentId?: string;
  order?: number;
  title?: string;
  subTitle?: string;
  dateFrom?: string;
  dateTo?: string;
  content?: string[];
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  parentCvId?: string;
};

type cv = {
  createdAt?: string;
  cvName?: string | null;
  cvId?: string;
  isDeleted?: boolean;
  updatedAt?: string;
  userId?: string;
  subSegments?: SubSeg[];
};

type user = {
  firstname?: string;
  lastname?: string;
  email?: string;
  image?: string | Blob | null;
  telephone?: string;
  dob?: Date;
  location?: string;
  bio?: string
};

interface SubSegmentStore {
  theCurrentUser?: user;
  subsegments: SubSeg[];
  cv: cv;
  parentSections: string[];

  setCv: (creds: Partial<cv>) => void;
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
        bio: ""
      },
      subsegments: [],
      parentSections: get()?.subsegments?.reduce((acc: string[], obj) => {
        const { parentSection } = obj;
        if (parentSection && !acc.includes(parentSection)) {
          acc.push(parentSection);
        }
        return acc;
      }, []),
      cv: {},

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

      setEssentials: (handm) => set({ theCurrentUser: { ...handm } }),
      setCv: (creds) => set((state) => ({ cv: { ...state.cv, ...creds } })),
      removeSubseg: (id) =>
        set((state) => ({
          subsegments: state.subsegments.filter(
            (subseg) => subseg.subsegmentId !== id
          ),
        })),
    }),
    {
      name: "subsegment-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useCvSubSegments;
