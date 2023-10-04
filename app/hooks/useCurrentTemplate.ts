import { create } from "zustand";

import useAllDocs from "../components/sideshelves/docViewer/hooks/documents/useAllDocs";

type State = {
  currentTemplate: string;
};

type Action = {
  setCurrentTemplate: (currentTemplate: State["currentTemplate"]) => void;
};


const useCurrentTemplate = create<State & Action>((set) => ({
  currentTemplate: "Chikane",

  setCurrentTemplate: (TemplateStringToSet) =>
    set(() => ({ currentTemplate: TemplateStringToSet })),
}));


const useCurrentTemplateForReal = () => {
  const { currentTemplate, setCurrentTemplate } = useCurrentTemplate();
  const existentDocs = useAllDocs().theDocs.map((doc)=> doc.name);
  

  return { currentTemplate, setCurrentTemplate, existentDocs };
};

export default useCurrentTemplateForReal;
