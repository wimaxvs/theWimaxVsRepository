"use client";
import React from "react";

import { SubSeg, user } from "@/app/hooks/useCvSubSegments";
import { Line, Svg, View, Text, Rect } from "@react-pdf/renderer";
import useDoc3Styles from "../styles/useDoc3Styles";

type striNum = string | number;

export interface indexObj {
  [key: string]: { [key: string]: striNum };
}

export type rectOptionsExtension = {
  width: striNum;
  height: striNum;
  fill: string;
};

export type userExtension = user & { [key: string]: striNum | null };

const useDocComponents = () => {
  const { rectOptions } = useDoc3Styles();

  const contactSubSeg = (
    section: string,
    index: number,
    user: userExtension,
    styles: indexObj
  ) => (
    <View key={index} style={styles.contactSubSeg}>
      <Text style={styles.contactSubSegTitle}>{section}</Text>
      <Text style={styles.sectionText}>{user?.[section.toLowerCase()]}</Text>
    </View>
  );

  const sectionHeader = (
    title: string,
    styles: indexObj,
    rectOptions: rectOptionsExtension,
    isAac?: boolean
  ) => (
    <View break style={styles.sectionHeader}>
      <Svg width="89" height="21" style={styles.upperNameRect}>
        <Rect {...rectOptions} />
      </Svg>
      <Text
        style={
          isAac
            ? {
                ...styles.sectionHeaderTitle,
                ...styles.narrowSectionHeaderTitle,
              }
            : styles.sectionHeaderTitle
        }
      >
        {title.toUpperCase()}
      </Text>
    </View>
  );

  const miniSectionHeader = (title: string, styles: indexObj) => (
    <Text break style={styles.sectionHeaderTitle}>
      {title}
    </Text>
  );

  const loadingBar = (index: number, subseg: SubSeg, styles: indexObj) => (
    <View
      key={index}
      style={{ ...styles.leftColSection, ...styles.forLoadingBar }}
    >
      <Text style={styles.sectionText}>{subseg.title}</Text>
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
    </View>
  );

  const workAndEdu = (
    index: number,
    subseg: SubSeg,
    styles: indexObj,
    isEdu?: boolean
  ) => (
    <View
      key={index}
      style={
        isEdu
          ? {
              ...styles.leftColSection,
              ...styles.forLoadingBar,
              ...styles.forEdu,
            }
          : { ...styles.leftColSection, ...styles.forLoadingBar }
      }
    >
      <View style={styles.titleAndDate}>
        <Text style={styles.contactSubSegTitle}>{subseg.title}</Text>
      </View>
      {(subseg.dateFrom || subseg.dateTo) && (
        <Text style={{ ...styles.sectionText, ...styles.forTitleDate }}>
          {`/ ${new Date(subseg.dateFrom as string).getFullYear()} - ${new Date(
            subseg.dateTo as string
          ).getFullYear()}`}
        </Text>
      )}
      <Text style={{ ...styles.sectionText }}>
        {subseg.subTitle?.toUpperCase()}
      </Text>
      {subseg.content && (
        <View style={styles.sectionContent}>
          {subseg.content?.map((line, index) => (
            <Text key={index} style={styles.augmentedSectionText}>
              {line}
            </Text>
          ))}
        </View>
      )}
    </View>
  );

  const sl = (
    isSl: boolean,
    sections: string[],
    styles: indexObj,
    rectOptions: rectOptionsExtension,
    subsegments: SubSeg[],
    desiredSection: string,
    isAac?: boolean,
    header?: string
  ) => {
    const isEduOrCert = desiredSection === "Education";
    const noToHeader = header === "noHeader";

    return (
      sections.indexOf(desiredSection) >= 0 && (
        <View
          key={desiredSection}
          style={
            isAac
              ? { ...styles.leftColSection, ...styles.narrowLeftColSection }
              : styles.leftColSection
          }
        >
          {/**Section Header */}
          {!noToHeader &&
            sectionHeader(
              desiredSection,
              styles,
              rectOptions as unknown as rectOptionsExtension,
              isAac ? isAac : undefined
            )}
          {noToHeader && miniSectionHeader(desiredSection, styles)}

          {/**Section Content */}
          <View style={isEduOrCert ? styles.eduSection : undefined}>
            {subsegments
              ?.filter((subseg) => subseg.parentSection === desiredSection)
              .sort((a, b) => b?.order! - a?.order!)
              .map((subseg, index) =>
                isSl
                  ? loadingBar(index, subseg, styles)
                  : isEduOrCert
                  ? workAndEdu(index, subseg, styles, true)
                  : workAndEdu(index, subseg, styles)
              )}
          </View>
        </View>
      )
    );
  };

  const rectSvg = (
    width: striNum,
    height: striNum,
    styles: indexObj,
    color: string,
    whichClassName?: string,
    isSquare?: boolean
  ) => (
    <Svg
      width={width}
      height={height}
      style={
        whichClassName
          ? styles[whichClassName]
          : styles.letterHeadUpperRightRect
      }
    >
      <Rect {...rectOptions(color, isSquare)} />
    </Svg>
  );

  const doc4Edu = (
    styles: indexObj,
    sections: string[],
    desiredSection: string
  ) => {
    const titleText = desiredSection.toUpperCase()
    return (
      sections.indexOf(desiredSection) >= 0 && (
        <View style={styles.leftColumnEduSection}>
          {miniSectionHeader(titleText, styles)}{" "}
        </View>
      )
    );
  };
  const doc4ContactSection = () => {};

  return {
    sectionHeader,
    contactSubSeg,
    loadingBar,
    sl,
    rectSvg,
    miniSectionHeader,
    doc4ContactSection,
    doc4Edu,
  };
};

export default useDocComponents;
