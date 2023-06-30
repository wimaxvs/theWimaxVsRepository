"use client";

import useDoc1 from "./useDoc1";
import useDoc2 from "./useDoc2";

const useAllDocs = () => {
  const doc1 = useDoc1().Doc1
  const doc2 = useDoc2().Doc2

  const TheDocs = {
    Doc1: doc1,
    Doc2: doc2

  };

  return { TheDocs };
};

export default useAllDocs;
