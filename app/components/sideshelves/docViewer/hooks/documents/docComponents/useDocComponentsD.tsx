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
      <View
        style={[
          styles.circularDotCasing,
          isSecond ? styles.secondDotMutation : {},
        ]}
      >
        <View style={styles.circularDot}></View>
      </View>
    );
  };

  let justABar = (styles: indexObj, subseg: SubSeg) => {
    return (
      <View break style={styles.loadingBar}>
        <View style={styles.outerBar}>
          <View
            style={[
              styles.innerBar,
              { width: `${(subseg?.order! / 10) * 100}%` },
            ]}
          />
        </View>
      </View>
    );
  };

  let justASkill = (
    styles: indexObj,
    stylesBeta: indexObj,
    seg: SubSeg,
    index: number
  ) => {
    return (
      <View style={stylesBeta.skillElement} key={index}>
        <View style={stylesBeta.skillUpper}>
          <Text style={styles.sectionContent}>{seg?.title}</Text>
          <Text style={styles.sectionContent}>{seg?.order}</Text>
        </View>
        <View style={stylesBeta.skillLower}>{justABar(stylesBeta, seg)}</View>
      </View>
    );
  };

  let justOneMerit = (
    styles: indexObj,
    stylesBeta: indexObj,
    seg: SubSeg,
    index: number,
    parentSection?: string
  ) => {
    let isAwards = parentSection === "Awards";

    return (
      <View style={stylesBeta.meritContainer} key={index}>
        <View style={stylesBeta.meritLeft}></View>
        <View style={stylesBeta.meritRight}>
          <Text style={[styles.sectionTitle]}>{seg?.title}</Text>
          <Text style={styles.sectionSubtitle}>
            {`${seg?.subTitle}`}
            {!isAwards &&
              `${
                " | " +
                rfDate(seg.dateFrom as string) +
                " - " +
                rfDate(seg.dateTo!)
              }`}
          </Text>
          {seg?.content?.map((line, index) => (
            <Text style={[styles.sectionContent]} key={index}>
              {line}
            </Text>
          ))}
        </View>
      </View>
    );
  };

  let justOneJob = (
    styles: indexObj,
    stylesBeta: indexObj,
    seg: SubSeg,
    index: number,
    isLast?: boolean
  ) => {
    return (
      <View
        style={[
          stylesBeta.meritContainer,
          stylesBeta.jobSection,
          isLast === true ? stylesBeta.forIsLast : {},
        ]}
        key={index}
      >
        <View style={stylesBeta.meritLeft}></View>
        <View style={[stylesBeta.jobPartition, stylesBeta.jobParticulars]}>
          <Text style={styles.sectionTitle}>{`${seg?.title}`}</Text>
          <Text style={[styles.sectionSubtitle]}>{seg?.subTitle}</Text>
          <Text style={[styles.sectionContent]}>
            {"From " +
              rfDate(seg.dateFrom as string) +
              " - " +
              rfDate(seg.dateTo as string)}
          </Text>
        </View>
        <View style={[stylesBeta.jobPartition, stylesBeta.jobDescription]}>
          {seg?.content?.map((line, i) => (
            <Text style={[styles.sectionContent]} key={i}>
              {line}
            </Text>
          ))}
        </View>
      </View>
    );
  };

  let anySectionBeta = (
    styles: indexObj,
    stylesBeta: indexObj,
    subsegs: string | SubSeg[],
    sectionTitle: string
  ) => {
    let isLast = subsegs.length - 1;

    switch (sectionTitle) {
      case "Languages":
        return (
          <View style={styles.anySection}>
            {introspectSectionTitle(styles, sectionTitle.toUpperCase())}
            <View style={stylesBeta.languageMap}>
              {(subsegs as SubSeg[])?.map((seg, index) => (
                <View style={stylesBeta.oneLang} key={index}>
                  <View style={stylesBeta.meritLeft}></View>
                  <View style={stylesBeta.langWording}>
                    <Text style={[styles.sectionContent]}>{seg?.title}</Text>
                    <Text
                      style={[styles.sectionContent, { fontWeight: "normal" }]}
                    >
                      {mapLanguageAbilityToCEFR(seg.order!).split(" ")[0]}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        );

      case "Skills":
        return (
          <View style={[styles.anySection, { alignSelf: "center" }]}>
            {introspectSectionTitle(styles, sectionTitle.toUpperCase())}
            {(subsegs as SubSeg[]).map((seg, index) =>
              justASkill(styles, stylesBeta, seg, index)
            )}
          </View>
        );
      case "Education":
      case "Awards":
      case "Certifications":
        return (
          <View style={[styles.anySection, { alignSelf: "center" }]}>
            {introspectSectionTitle(styles, sectionTitle.toUpperCase())}
            {(subsegs as SubSeg[]).map((seg, index) =>
              justOneMerit(styles, stylesBeta, seg, index, seg.parentSection)
            )}
          </View>
        );
      case "Hobbies":
        return (
          <View style={[styles.anySection, { alignSelf: "center" }]}>
            {introspectSectionTitle(styles, sectionTitle.toUpperCase())}

            <View style={stylesBeta.meritContainer}>
              <View style={stylesBeta.meritLeft}></View>
              <View style={stylesBeta.meritRight}>
                {(subsegs as SubSeg[]).map((seg, i) => (
                  <Text style={[styles.sectionContent]} key={i}>
                    {seg?.title}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        );

      case "Work Experience":
        return (
          <View style={styles.anySection}>
            {introspectSectionTitle(styles, sectionTitle.toUpperCase())}
            {(subsegs as SubSeg[]).map((seg, index) =>
              justOneJob(
                styles,
                stylesBeta,
                seg,
                index,
                index === isLast && true
              )
            )}
          </View>
        );

      default:
        break;
    }
  };

  return {
    anySection,
    circularDot,
    anySectionBeta,
  };
};

export default useDocComponentsD;
