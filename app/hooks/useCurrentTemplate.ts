import { create } from "zustand";

import useAllDocs from "../components/sideshelves/docViewer/hooks/documents/useAllDocs";

type State = {
  currentTemplate: string;
};

type Action = {
  setCurrentTemplate: (currentTemplate: State["currentTemplate"]) => void;
};


const useCurrentTemplate = create<State & Action>((set) => ({
  currentTemplate: "Doc6",

  setCurrentTemplate: (TemplateStringToSet) =>
    set(() => ({ currentTemplate: TemplateStringToSet })),
}));


const useCurrentTemplateForReal = () => {
  const { currentTemplate, setCurrentTemplate } = useCurrentTemplate();
  const existentDocs = useAllDocs().docs;
  

  return { currentTemplate, setCurrentTemplate, existentDocs };
};

export default useCurrentTemplateForReal;
