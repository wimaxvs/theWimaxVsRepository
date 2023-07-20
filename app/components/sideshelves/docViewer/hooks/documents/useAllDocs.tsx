"use client";

import useDoc1 from "./useDoc1";

import useDoc2 from "./useDoc2";

import useDoc3 from "./useDoc3";

const useAllDocs = () => {
  const Doc1 = { doc: useDoc1().Doc1, name: "Doc1" };

  const Doc2 = { doc: useDoc2().Doc2, name: "Doc2" };

  const Doc3 = { doc: useDoc3().Doc3, name: "Doc3" };

  const docs = [Doc1.name, Doc2.name, Doc3.name];

  const theDocs: { [key: string]: () => JSX.Element } = {
    Doc1: Doc1.doc,

    Doc2: Doc2.doc,

    Doc3: Doc3.doc,
  };

  return { theDocs, docs };
};

export default useAllDocs;
