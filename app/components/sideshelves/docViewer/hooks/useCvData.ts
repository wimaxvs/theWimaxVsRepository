import useCvSubSegments from "@/app/hooks/useCvSubSegments";

const useCvData = () => {
  const [subsegments] = useCvSubSegments((state) => [state.subsegments]);

  const sections = subsegments?.reduce((acc: string[], obj) => {
    const { parentSection } = obj;
    if (parentSection) {
      if (acc.indexOf(parentSection) === -1) {
        acc.push(parentSection);
      }
    }
    return acc;
  }, []);

  return { subsegments, sections };
};

export default useCvData;