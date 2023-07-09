"use client";

import useDoc1 from "./useDoc1";
import useDoc2 from "./useDoc2";
import useDoc3 from "./useDoc3";

const useAllDocs = () => {
  const {Doc1} = useDoc1()
  const {Doc2} = useDoc2()
  const {Doc3} = useDoc3()

  const TheDocs = {
    Doc1,
    Doc2,
    Doc3

  };

  return { TheDocs };
};

export default useAllDocs;
