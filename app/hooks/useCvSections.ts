import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface EssentialsStore {
  hm: {
    firstname?: string;
    lastname?: string;
    email?: string;
    image?: string | Blob | null;
    telephone?: string;
    dob?: Date;
    location?: string;
  };

  setFirstname: (fn: string) => void;
  setLastname: (ln: string) => void;
  setEmail: (email: string) => void;
  setImage: (img: string) => void;
  setTelephone: (tel: string) => void;
  setDob: (san: Date) => void;
  setLocation: (lctn: string) => void;

  setEssentials: (handm: EssentialsStore["hm"]) => void;
}

const useCvEssentials = create<EssentialsStore>()(
  persist(
    (set, get) => ({
      hm: {
        firstname: "",
        lastname: "",
        email: "",
        image: null,
        telephone: "",
        dob: new Date(),
        location: "",
      },

      setFirstname: (fn) =>
        set((state) => ({ hm: { ...state.hm, firstname: fn } })),
      setLastname: (ln) =>
        set((state) => ({ hm: { ...state.hm, lastname: ln } })),
      setEmail: (email) =>
        set((state) => ({ hm: { ...state.hm, email: email } })),
      setImage: (img) => set((state) => ({ hm: { ...state.hm, image: img } })),
      setTelephone: (tel) =>
        set((state) => ({ hm: { ...state.hm, telephone: tel } })),
      setDob: (san) => set((state) => ({ hm: { ...state.hm, dob: san } })),
      setLocation: (ln) =>
        set((state) => ({ hm: { ...state.hm, location: ln } })),

      setEssentials: (hm) => set({ hm: { ...hm } }),
    }),
    {
      name: "essentials-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useCvEssentials;
