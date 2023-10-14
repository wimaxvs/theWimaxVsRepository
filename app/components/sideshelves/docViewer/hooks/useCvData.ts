import useCvSubSegments from "@/app/hooks/useCvSubSegments";
import { useCallback } from "react";

const useCvData = () => {
  const {theCurrentUser, subsegments} = useCvSubSegments();

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
        const fontSize = (limit / word.length) * size;
        return { fontSize: `${fontSize}px` };
      }
      return { fontSize: `${size}px` };
    },
    []
  );

  const fontSizes = {
    fnSize: fontSizeDeterminant(theCurrentUser?.firstname as string, 8, 60).fontSize,
    lnSize: fontSizeDeterminant(theCurrentUser?.lastname as string, 8, 60).fontSize,
    ptSize: fontSizeDeterminant(theCurrentUser?.prospectiveTitle as string, 31, 20).fontSize,
    fnSizeB: fontSizeDeterminant(theCurrentUser?.firstname as string, 8, 40).fontSize,
    lnSizeB: fontSizeDeterminant(theCurrentUser?.lastname as string, 8, 40).fontSize,
    lesserPtSize: fontSizeDeterminant(theCurrentUser?.prospectiveTitle as string, 31, 12).fontSize,
  }

  return { subsegments, sections, theCurrentUser, fontSizeDeterminant, fontSizes };
};

export default useCvData;
