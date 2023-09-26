"use client";

import useDoc1 from "./useDoc1";
import useDoc2 from "./useDoc2";
import useDoc3 from "./useDoc3";
import useDoc4 from "./useDoc4";
import useDoc5 from "./useDoc5";
import useDoc6 from "./useDoc6";
import useDoc7 from "./useDoc7";

const useAllDocs = () => {

  const theDocs = [
    { doc: useDoc1().Doc1, name: "Antique" },
    { doc: useDoc2().Doc2, name: "Mella Yella" },
    { doc: useDoc3().Doc3, name: "Utopia" },
    { doc: useDoc4().Doc4, name: "Dolphin" },
    { doc: useDoc5().Doc5, name: "Zoid" },
    { doc: useDoc6().Doc6, name: "Cooper" },
    { doc: useDoc7().Doc7, name: "Introspect" },
  ];

  return { theDocs };
};

export default useAllDocs;
