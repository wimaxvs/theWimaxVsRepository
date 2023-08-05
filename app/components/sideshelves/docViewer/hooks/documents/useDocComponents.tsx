"use client";
import React from "react";

import { SubSeg, user } from "@/app/hooks/useCvSubSegments";
import { Line, Svg, View, Text, Rect, Circle } from "@react-pdf/renderer";
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

  const miniSectionHeader = (
    title: string,
    styles: indexObj,
    specificHeaderStyle?: string
  ) => (
    <Text
      break
      style={
        specificHeaderStyle
          ? styles[specificHeaderStyle]
          : styles["sectionHeaderTitle"]
      }
    >
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

  const doc4WorkExp = (
    index: number,
    subseg: SubSeg,
    styles: indexObj,
    rectOptions?: rectOptionsExtension
  ) => {
    return (
      <View key={index} style={styles.doc4RightColumnWE}>
        <View
          style={{
            ...styles.doc4RightColumnWEHalf,
            ...styles.doc4RightColumnWEFirstHalf,
          }}
        >
          {(subseg.dateFrom || subseg.dateTo) && (
            <>
              <Text
                style={{ ...styles.subSegTitle, ...styles.forRightColumnTitle }}
              >
                {`${new Date(
                  subseg.dateFrom as string
                ).getFullYear()} - ${new Date(
                  subseg.dateTo as string
                ).getFullYear()}`}
              </Text>
              {rectOptions &&
                ornamentalRectangle(rectOptions, {
                  width: "75",
                  height: "2.5",
                })}
            </>
          )}
        </View>
        <View
          style={{
            ...styles.doc4RightColumnWEHalf,
            ...styles.doc4RightColumnWESecondHalf,
          }}
        >
          <Text
            style={{ ...styles.subSegTitle, ...styles.forRightColumnTitle }}
          >
            {subseg.title}
          </Text>
          <Text
            style={{ ...styles.subSegTitle, ...styles.forRightColumnSubTitle }}
          >
            {subseg.subTitle}
          </Text>
          {subseg.content && (
            <View style={styles.doc4RightColumnWESecondHalfContent}>
              {subseg.content?.map((line, index) => (
                <Text key={index} style={styles.rightBodyProfileSectionContent}>
                  {line}
                </Text>
              ))}
            </View>
          )}
        </View>
      </View>
    );
  };

  const slBeta = (
    params: {
      sections: string[];
      styles: indexObj;
      rectOptions: rectOptionsExtension;
      subsegments: SubSeg[];
      desiredSection: string;
    },
    specificStyles?: { [key: string]: string }
  ) => {
    const { sections, styles, rectOptions, subsegments, desiredSection } =
      params;
    return (
      sections.indexOf(desiredSection) >= 0 && (
        <View style={styles.rightBodyProfileSection}>
          {/**Section Header */}
          {miniSectionHeader(
            desiredSection.toUpperCase(),
            styles,
            specificStyles?.titleStyle as string
          )}

          {/**Section Content */}
          <View style={styles.doc4RightColumnWEContainer}>
            {subsegments
              ?.filter((subseg) => subseg.parentSection === desiredSection)
              .sort((a, b) => b?.order! - a?.order!)
              .map((subseg, index) =>
                doc4WorkExp(index, subseg, styles, rectOptions)
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

  const doc4LeftSubSeg = (index: number, subseg: SubSeg, styles: indexObj) => {
    const notEdu =
      ["Education", "Certifications"].indexOf(subseg.parentSection!) === -1;
    const subSegSubTitleStyle = {
      ...styles.subSegTitle,
      ...styles.dateText,
      ...styles.subSegSubTitle,
    };
    return (
      <View key={index} style={styles.leftColSection}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "3px",
          }}
        >
          {notEdu && (
            <Text
              style={{ ...styles.subSegTitle, color: "rgba(254, 185, 198, 1)" }}
            >
              {"-"}
            </Text>
          )}
          <Text
            style={
              notEdu
                ? {
                    ...subSegSubTitleStyle,
                  }
                : styles.subSegTitle
            }
          >
            {subseg.title}
          </Text>
        </View>
        <Text
          style={{
            ...subSegSubTitleStyle,
          }}
        >
          {subseg.subTitle?.toUpperCase()}
        </Text>
        {(subseg.dateFrom || subseg.dateTo) && (
          <Text style={{ ...styles.subSegTitle, ...styles.dateText }}>
            {`${new Date(subseg.dateFrom as string).getFullYear()} - ${new Date(
              subseg.dateTo as string
            ).getFullYear()}`}
          </Text>
        )}
      </View>
    );
  };

  const doc4Left = (
    styles: indexObj,
    sections: string[],
    desiredSection: string,
    subsegments: SubSeg[]
  ) => {
    const titleText = desiredSection.toUpperCase();
    return (
      sections.indexOf(desiredSection) >= 0 && (
        <View style={styles.leftColumnEduSection}>
          {miniSectionHeader(titleText, styles)}{" "}
          {subsegments
            ?.filter((subseg) => subseg.parentSection === desiredSection)
            .sort((a, b) => b?.order! - a?.order!)
            .map((subseg, index) => doc4LeftSubSeg(index, subseg, styles))}
        </View>
      )
    );
  };

  const contactBoxText = (
    styles: indexObj,
    prefix: string,
    content: string
  ) => (
    <>
      <Text
        style={{
          ...styles.contactBoxNoticeText,
          ...styles.contactBoxPrefixText,
        }}
      >
        {prefix}
      </Text>
      <Text
        style={{
          ...styles.contactBoxNoticeText,
          ...styles.contactBoxContentText,
        }}
      >
        {content}
      </Text>
    </>
  );

  const doc4ContactSection = (styles: indexObj, theCurrentUser: user) => {
    return (
      <View style={styles.rightColContactBox}>
        <View style={styles.contactBoxLabelAndAddress}>
          <View style={styles.contactBoxNotice}>
            <Text style={styles.contactBoxNoticeText}>{"Contact"}</Text>
          </View>
          <View style={styles.contactBoxAddress}>
            {contactBoxText(styles, "A:", theCurrentUser.location as string)}
          </View>
        </View>
        <View style={styles.contactBoxLabelAndAddress}>
          <View
            style={{
              ...styles.contactBoxAddress,
              ...styles.contactBoxTelephone,
            }}
          >
            {contactBoxText(styles, "T:", theCurrentUser.telephone as string)}
          </View>
          <View
            style={{ ...styles.contactBoxAddress, ...styles.contactBoxEmail }}
          >
            {contactBoxText(styles, "E:", theCurrentUser.email as string)}
          </View>
        </View>
      </View>
    );
  };

  const ornamentalRectangle = (
    rectOptions: rectOptionsExtension,
    outerSvgOptions: { width: string; height: string }
  ) => (
    <Svg {...outerSvgOptions}>
      <Rect {...rectOptions} />
    </Svg>
  );
  const doc4ProfileSection = (
    styles: indexObj,
    theCurrentUser: user,
    rectOptions: rectOptionsExtension
  ) => (
    <View style={styles.rightBodyProfileSection}>
      <View style={styles.rightBodyProfileSectionTitle}>
        <Text style={styles.rightBodyProfileSectionTitleItself}>
          {"Profile".toUpperCase()}
        </Text>
        {ornamentalRectangle(rectOptions, { width: "260", height: "2.5" })}
      </View>
      <Text style={styles.rightBodyProfileSectionContent}>
        {theCurrentUser?.bio}
      </Text>
    </View>
  );

  ///✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
  const CircularLoadingBar = (skillLevel: number, styles: indexObj ) => {
    const radius = 20;
    const numberOfSegments = 10;
    const degreesPerSegment = 360 / numberOfSegments;

    const filledSegments = Math.round((skillLevel / 10) * numberOfSegments);

    const segments = Array.from({ length: numberOfSegments }, (_, index) => (
      <View
        key={index}
        style={[
          styles.segment,
          index < filledSegments ? styles.filledSegment : {},
          { transform: `rotate(${index * degreesPerSegment}deg)` },
        ]}
      />
    ));

    return (
      <View style={styles.loadingBar}>
        <View style={styles.loadingBarContainer}>{segments}</View>
      </View>
    );
  };

  return {
    sectionHeader,
    contactSubSeg,
    loadingBar,
    sl,
    rectSvg,
    miniSectionHeader,
    doc4ContactSection,
    doc4Left,
    doc4ProfileSection,
    slBeta,
    CircularLoadingBar,
  };
};

export default useDocComponents;
