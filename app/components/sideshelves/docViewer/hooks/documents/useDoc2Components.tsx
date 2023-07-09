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

const useDoc2Components = () => {
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
    <View style={styles.sectionHeader}>
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

  const workAndEdu = (index: number, subseg: SubSeg, styles: indexObj) => (
    <View
      key={index}
      style={{ ...styles.leftColSection, ...styles.forLoadingBar }}
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
      <Text style={styles.sectionText}>{subseg.subTitle?.toUpperCase()}</Text>
      {subseg.content && (
        <View style={styles.sectionContent}>
          {subseg.content?.map((line, index) => (
            <Text key={index} style={styles.sectionText}>
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
    isAac?: boolean
  ) =>
    sections.indexOf(desiredSection) >= 0 && (
      <View
        style={
          isAac
            ? { ...styles.leftColSection, ...styles.narrowLeftColSection }
            : styles.leftColSection
        }
      >
        {sectionHeader(
          desiredSection,
          styles,
          rectOptions as unknown as rectOptionsExtension,
          isAac ? isAac : undefined
        )}
        {subsegments
          ?.filter((subseg) => subseg.parentSection === desiredSection)
          .map((subseg, index) =>
            isSl
              ? loadingBar(index, subseg, styles)
              : workAndEdu(index, subseg, styles)
          )}
      </View>
    );

  const rectSvg = (
    width: striNum,
    height: striNum,
    styles: indexObj,
    rectOptionsParam: string,
    whichClassName?: string
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
      <Rect {...rectOptions(rectOptionsParam)} />
    </Svg>
  );

  return { sectionHeader, contactSubSeg, loadingBar, sl, rectSvg };
};

export default useDoc2Components;
