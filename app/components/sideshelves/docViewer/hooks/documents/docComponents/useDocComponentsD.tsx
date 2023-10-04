import { SubSeg, user } from "@/app/hooks/useCvSubSegments";
import { indexObj, striNum } from "./useDocComponents";
import { Text, View } from "@react-pdf/renderer";
import useDoc6Styles from "../../styles/useDoc6Styles";
import useDocComponentsC from "./useDocComponentsC";
import useCvData from "../../useCvData";
import React from "react";

const useDocComponentsD = () => {
  const {} = useDoc6Styles();
  const { fontSizeDeterminant } = useCvData();
  const { introspectSectionTitle } = useDocComponentsC();
  const returnFontSize = (word: string, size: number) =>
    fontSizeDeterminant(word as string, 10, size).fontSize;

  const rfDate = (date: Date | string, trigger?: string) => {
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

  const mapLanguageAbilityToCEFR = (level: number) => {
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
  };

  const detailedSectionComponent = (
    styles: indexObj,
    subsegments: SubSeg[]
  ) => {
    const isMerited = subsegments.every(
      (segment) =>
        segment.parentSection === "Education" ||
        segment.parentSection === "Certifications" ||
        segment.parentSection === "Awards"
    );
    const isWorkOrCert = subsegments.every(
      (segment) =>
        segment.parentSection === "Work Experience" ||
        segment.parentSection === "Certifications" ||
        segment.parentSection === "Awards"
    );

    let content = subsegments.map((seg, index) => (
      <React.Fragment key={index}>
        <Text style={styles.sectionTitle}>
          {`${seg?.title}`}
          {!isMerited &&
            `${
              " | " +
              rfDate(seg.dateFrom as string) +
              " - " +
              rfDate(seg.dateTo!)
            }`}
        </Text>
        <Text style={[styles.sectionSubtitle, styles.negativeTopMargin]}>
          {seg?.subTitle}
        </Text>
        {isMerited && seg.parentSection !== "Awards" && (
          <Text style={[styles.sectionContent, styles.negativeTopMargin]}>
            {rfDate(seg.dateFrom as string) +
              " - " +
              rfDate(seg.dateTo as string)}
          </Text>
        )}
        {isWorkOrCert &&
          seg?.content?.map((line, index) => (
            <Text
              style={[styles.sectionContent, styles.negativeTopMargin]}
              key={index}
            >
              {line}
            </Text>
          ))}
      </React.Fragment>
    ));

    return content;
  };

  const anySection = (
    styles: indexObj,
    subsegs: string | SubSeg[],
    sectionTitle: string
  ) => {
    let isProfile = typeof subsegs === "string";

    switch (sectionTitle) {
      case "Profile":
        return (
          <View style={styles.anySection}>
            {introspectSectionTitle(styles, sectionTitle.toUpperCase())}
            {isProfile && (
              <Text style={styles.sectionContent}>{subsegs as string}</Text>
            )}
          </View>
        );
      case "Education":
      case "Awards":
      case "Work Experience":
      case "Certifications":
        return (
          <View style={styles.anySection}>
            {introspectSectionTitle(styles, sectionTitle.toUpperCase())}
            {detailedSectionComponent(styles, subsegs as SubSeg[])}
          </View>
        );
      case "Skills":
      case "Hobbies":
        return (
          <View style={styles.anySection}>
            {introspectSectionTitle(styles, sectionTitle.toUpperCase())}
            {(subsegs as SubSeg[]).map((seg, index) => (
              <View style={styles.skillElement} key={index}>
                <View style={styles.skillDot}></View>
                <Text style={styles.sectionContent}>{seg?.title}</Text>
              </View>
            ))}
          </View>
        );

      default:
        break;
    }
  };

  let circularDot = (styles: indexObj, isSecond?: boolean) => {
    return (
      <View style={[styles.circularDotCasing, isSecond ? styles.secondDotMutation : {}]}>
        <View style={styles.circularDot}></View>
      </View>
    );
  };

  return {
    anySection,
    circularDot,
  };
};

export default useDocComponentsD;
