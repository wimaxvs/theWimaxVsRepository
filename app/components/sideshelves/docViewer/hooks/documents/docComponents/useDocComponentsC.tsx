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

  function mapLanguageAbilityToCEFR(level: number) {
    if (level < 1 || level > 10) {
      return "Invalid input"; // Handle out-of-range input
    }

    if (level <= 2) {
      return "A1 - Beginner";
    } else if (level <= 4) {
      return "A2 - Elementary";
    } else if (level <= 6) {
      return "B1 - Intermediate";
    } else if (level <= 8) {
      return "B2 - Upper Intermediate";
    } else {
      return "C1/C2 - Advanced/Proficient";
    }
  }

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
    let isMerited =
      ["Education", "Certifications", "Awards"].indexOf(section as string) >= 0;
    let content = subsegs.map((subseg, index) => (
      <View key={index} style={styles.innerWorkSection}>
        <View style={styles.titleWithDot}>
          {isMerited ? (
            <></>
          ) : (
            <View
              style={[
                styles.summarySectionDot,
                { marginTop: 0, transform: "translateX(-27.5px)" },
              ]}
            ></View>
          )}
          <Text
            style={[
              styles.innerWorkSectionTitle,
              { left: isMerited ? "" : "-7.5px" },
            ]}
          >
            {subseg.title}
          </Text>
        </View>
        <View
          style={[
            styles.titleWithDot,
            { gap: "3px", left: isMerited ? "7.5px" : "10px" },
          ]}
        >
          {[subseg.subTitle]
            .concat(
              isMerited
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
        {isMerited && section !== "Awards" ? (
          <View
            style={[
              styles.titleWithDot,
              { gap: "3px", left: isMerited ? "7.5px" : "10px" },
            ]}
          >
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
        ) : section === "Awards" ? (
          <></>
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

  const introspectSectionTitle = (styles: indexObj, title: string) => (
    <Text style={[styles.sectionTitleDetails, styles.sectionTitle]}>
      {title}
    </Text>
  );

  const introspectDetailedSection = (
    styles: indexObj,
    subsegs: SubSeg[],
    section?: string
  ) => {
    let isMerited: boolean = ["education"].indexOf(section!.toLowerCase()) >= 0;
    const content =
      subsegs.length > 0 ? (
        subsegs.map((subseg, index) => (
          <View
            key={index}
            style={[styles.sectionCol].concat(
              isMerited ? styles.rightColSection : styles.leftColSection
            )}
          >
            <Text
              style={[
                styles.sectionContent,
                { textAlign: isMerited ? "left" : "right" },
              ]}
            >
              {`${returnFormattedDate(
                subseg.dateFrom!,
                "trig"
              )} - ${returnFormattedDate(subseg.dateTo!, "trig")}`}
            </Text>
            <Text
              style={[
                styles.sectionTitle,
                { textAlign: isMerited ? "left" : "right" },
              ]}
            >
              {subseg.title}
            </Text>
            <Text
              style={[
                styles.sectionSubtitle,
                { textAlign: isMerited ? "left" : "right" },
              ]}
            >
              {subseg.subTitle}
            </Text>
            {section?.toLowerCase() === "work experience" && (
              <View
                style={[styles.leftColContentSection].concat(
                  isMerited ? styles.rightColSection : styles.leftColSection
                )}
              >
                {subseg.content?.map((string, index) => (
                  <Text
                    key={index}
                    style={[
                      {
                        textAlign: isMerited ? "left" : "right",
                      },
                      styles.sectionContent,
                    ]}
                  >
                    {string}
                  </Text>
                ))}
              </View>
            )}
          </View>
        ))
      ) : (
        <></>
      );

    return (
      <View
        style={[styles.parentSection].concat(
          isMerited ? { alignItems: "flex-start" } : {}
        )}
      >
        {introspectSectionTitle(styles, section!.toUpperCase())}
        {content}
      </View>
    );
  };

  const loadingBar = (styles: indexObj, subsegs: SubSeg[], section: string) => {
    return (
      <View style={[styles.parentSection, { alignItems: "flex-start" }]}>
        {introspectSectionTitle(styles, section!.toUpperCase())}
        <View
          style={[
              styles.leftColContentSection,
            styles.rightColSection,
            { width: "95%", marginTop: 0 },
          ]}
        >
          {subsegs?.map((segment, index) => (
            <View
                key={index}
              style={[styles.loadingBarElement, { width: "95%" }]}
            >
              <Text style={[styles.sectionContent, { textAlign: "left" }]}>
                {segment.title}
              </Text>
              <View style={styles.loadingBar}>
                <View style={styles.outerBar}>
                  <View
                    style={[
                      styles.innerBar,
                      { width: `${(segment?.order! / 10) * 100}%` },
                    ]}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return {
    theLineBelowASection,
    theContentInWorkSection,
    mapLanguageAbilityToCEFR,
    introspectDetailedSection,
    loadingBar,
  };
};

export default useDocComponentsC;
