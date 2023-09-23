import { SubSeg, user } from "@/app/hooks/useCvSubSegments";
import { indexObj, striNum } from "./useDocComponents";
import { Text, View } from "@react-pdf/renderer";
import useDoc6Styles from "../../styles/useDoc6Styles";
import useCvData from "../../useCvData";

const useDocComponentsC = () => {
  const {} = useDoc6Styles();
  const { fontSizeDeterminant } = useCvData();
  const returnFontSize = (word: string, size: number) =>
    fontSizeDeterminant(word as string, 10, size).fontSize;

  const returnFormattedDate = (date: Date | string, trigger: string) => {
    let theDate = new Date(date);
    let month = theDate.getMonth() + 1;
    let day = theDate.getDate();
    let year = theDate.getFullYear();

    switch (trigger) {
      case "dmy":
        return `${day}/${month}/${year}`;
      case "ymd":
        return `${year}/${month}/${day}`;
      case "mdy":
        return `${month}/${day}/${year}`;

      default:
        return year.toString();
    }
  };

  const theLineBelowASection = (styles: indexObj) => (
    <View style={styles.summarySection}>
      <View style={styles.summarySectionDivider}></View>
    </View>
  );

  const theContentInWorkSection = (
    styles: indexObj,
    subsegs: SubSeg[],
    section?: string
  ) => {
    let  isEducational = section === "Education" || section === "Certifications"
    let content = subsegs.map((subseg, index) => (
      <View key={index} style={styles.innerWorkSection}>
        <View style={styles.titleWithDot}>
          {isEducational ? (
            <></>
          ) : (
            <View
              style={[
                styles.summarySectionDot,
                { marginTop: 0, transform: "translateX(-27.5px)" },
              ]}
            ></View>
          )}
          <Text style={[styles.innerWorkSectionTitle,  {left: isEducational? "": "-7.5px"}]}>{subseg.title}</Text>
        </View>
        <View style={[styles.titleWithDot, { gap: "3px", left: isEducational? "7.5px":"10px" }]}>
          {[subseg.subTitle]
            .concat(
              isEducational
                ? []
                : [
                    "|",
                    returnFormattedDate(subseg.dateFrom!, "trig"),
                    "-",
                    returnFormattedDate(subseg.dateTo!, "trig"),
                  ]
            )
            .map((string: string | undefined, index: number) => (
              <Text
                style={[styles.innerWorkSectionTitle, styles.sectionSubtitle]}
                key={index}
              >
                {string}
              </Text>
            ))}
        </View>
        {isEducational ? (
          <View style={[styles.titleWithDot, { gap: "3px", left: isEducational? "7.5px":"10px" }]}>
            {[
              returnFormattedDate(subseg.dateFrom!, "trig"),
              "-",
              returnFormattedDate(subseg.dateTo!, "trig"),
            ].map((string: string | undefined, index: number) => (
              <Text
                style={[styles.innerWorkSectionTitle, styles.sectionSubtitle]}
                key={index}
              >
                {string}
              </Text>
            ))}
          </View>
        ) : (
          <View style={[styles.actualContent, { left: "10px" }]}>
            {subseg.content &&
              subseg.content?.map((line, index) => (
                <View
                  key={index}
                  style={[styles.titleWithDot, styles.workContent]}
                >
                  <View
                    style={[
                      styles.summarySectionDot,
                      { marginTop: 0, height: "3.75px", width: "3.75px" },
                    ]}
                  ></View>
                  <Text style={styles.sectionContent}>{line}</Text>
                </View>
              ))}
          </View>
        )}
      </View>
    ));

    return content;
  };

  return {
    theLineBelowASection,
    theContentInWorkSection,
  };
};

export default useDocComponentsC;
