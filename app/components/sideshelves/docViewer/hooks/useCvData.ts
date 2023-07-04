"use client"
import useCvSubSegments from "@/app/hooks/useCvSubSegments";
import { useCallback } from "react";

const useCvData = () => {
  const [subsegments] = useCvSubSegments((state) => [state.subsegments]);
  const [theCurrentUser] = useCvSubSegments((state) => [state.theCurrentUser]);

  const sections = subsegments?.reduce((acc: string[], obj) => {
    const { parentSection } = obj;
    if (parentSection) {
      if (acc.indexOf(parentSection) === -1) {
        acc.push(parentSection);
      }
    }
    return acc;
  }, []);

  const fontSizeDeterminant = useCallback(
    (word: string, limit: number, size: number) => {
      if (word.length > limit) {
        console.log(word);
        const fontSize = (limit / word.length) * size;
        return { fontSize: `${fontSize}px` };
      }
      return { fontSize: `${size}px` };
    },
    [theCurrentUser]
  );

  const fontSizes = {
    fnSize: fontSizeDeterminant(theCurrentUser?.firstname as string, 8, 60).fontSize,
    lnSize: fontSizeDeterminant(theCurrentUser?.lastname as string, 8, 60).fontSize,
    ptSize: fontSizeDeterminant(theCurrentUser?.prospectiveTitle as string, 31, 20).fontSize,
  }

  return { subsegments, sections, theCurrentUser, fontSizes };
};

export default useCvData;
