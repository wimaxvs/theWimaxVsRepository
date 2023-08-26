import { SubSeg, user } from "@/app/hooks/useCvSubSegments";
import { indexObj, striNum } from "./useDocComponents";
import { Text, View } from "@react-pdf/renderer";
import useDoc5Styles from "../../styles/useDoc5Styles";
import useDocComponents from "./useDocComponents";
import useCvData from "../../useCvData";
import React from "react";

const useDocComponentsB = () => {
  const { rectOptions: doc5RectOptions } = useDoc5Styles();
  const { ornamentalRectangle } = useDocComponents();
  const { fontSizeDeterminant } = useCvData();

  const returnFontSize = (word: string, size: number) =>
    fontSizeDeterminant(word as string, 10, size).fontSize;

  const returnFormattedDate = (date: Date, trigger: string) => {
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
        return year;
    }
  };

  const tbcp: { [key: string]: string } = {
    lightGray: "#d1e4e3",
    paleBeige: "#e3c6bc",
    dustyRose: "#c8868d",
    mossGreen: "#66976b",
    steelBlue: "#4682B4",
  };

  const rect = (width: striNum, height: striNum, color?: string) => {
    return ornamentalRectangle(doc5RectOptions(color, true), {
      width: width as string,
      height: height as string,
    });
  };

  const doc5SectionTitle = (obj: {
    styles: indexObj;
    sectionTitle: string;
    rectWidth: striNum;
    rectHeight: striNum;
    rectColor: string;
  }) => {
    const { styles, sectionTitle, rectWidth, rectHeight, rectColor } = obj;

    return (
      <View style={styles.headerContainer}>
        <Text style={{ ...styles.biographySectionTitle, fontSize: "12px" }}>
          {sectionTitle}
        </Text>
        {rect(rectWidth, rectHeight, rectColor)}
      </View>
    );
  };

  const bioDataTableRow = (
    keyString: string,
    valueString: string,
    styles: indexObj
  ) => (
    <View style={styles.bioDataTableRow}>
      <Text style={{ ...styles.basicText, ...styles.emboldennedBasics }}>
        {keyString}
      </Text>
      <Text
        style={{
          ...styles.basicText,
          fontSize: returnFontSize(valueString, 8),
        }}
      >
        {valueString}
      </Text>
    </View>
  );

  const bioDataTable = (user: user, styles: indexObj) => {
    let theArr = [
      {
        keyString: "Name",
        valueString: [user.firstname, user.lastname].join(" "),
      },
      {
        keyString: "Date Of Birth",
        valueString: returnFormattedDate(user.dob as Date, "dmy"),
      },
      {
        keyString: "Location",
        valueString: user.location,
      },
    ];

    let rowMap = (
      array: { keyString: string; valueString?: striNum }[],
      styles: indexObj
    ) =>
      array.map((element) => {
        if (element.valueString) {
          return bioDataTableRow(
            element["keyString"],
            element["valueString"] as string,
            styles
          );
        }
        return null;
      });
    return <View style={styles.bioDataTable}>{rowMap(theArr, styles)}</View>;
  };

  const bioData = (styles: indexObj, theCurrentUser: user) => {
    return (
      <View style={styles.biographySection}>
        {doc5SectionTitle({
          styles: styles,
          sectionTitle: "BIOGRAPHY",
          rectWidth: "50",
          rectHeight: "2",
          rectColor: "coralPink",
        })}
        {bioDataTable(theCurrentUser, styles)}
      </View>
    );
  };

  const profileSummary = (styles: indexObj, theCurrentUser: user) => {
    if (theCurrentUser.bio)
      return (
        <View style={styles.biographySection}>
          {doc5SectionTitle({
            styles: styles,
            sectionTitle: "SUMMARY",
            rectWidth: "50",
            rectHeight: "2",
            rectColor: "coralPink",
          })}
          <Text
            style={{
              ...styles.basicText,
              ...styles.forSummary,
            }}
          >
            {theCurrentUser.bio}
          </Text>
        </View>
      );
    return null;
  };

  const theTotem = (subsegments: SubSeg[], styles: indexObj) => {
    let isEducation = (desiredSection: string): boolean =>
      desiredSection === "Education";
    let isWork = (desiredSection: string): boolean =>
      desiredSection === "Work Experience";

    return (
      <View style={styles.actualTotem}>
        {subsegments.map((subseg, index) => {
          const borderCol =
            Object.values(tbcp)[index % Object.keys(tbcp).length];
          if (isEducation(subseg.parentSection!))
            return (
              <>
                <View
                  key={index}
                  style={[
                    styles.actualTotem,
                    index % 2 === 0
                      ? {
                          ...styles.withRightBorder,
                          borderRight: `6px solid ${borderCol}`,
                        }
                      : {
                          ...styles.withLeftBorder,
                          borderLeft: `6px solid ${borderCol}`,
                        },
                  ]}
                >
                  <Text style={styles.totemTitle}>{subseg.title}</Text>
                  <Text style={styles.totemDate}>{`${subseg.dateFrom?.substring(
                    0,
                    4
                  )} - ${subseg.dateTo?.substring(0, 4)}`}</Text>
                  <Text style={styles.totemSubtitle}>{subseg.subTitle}</Text>
                  {subseg.content?.map((line, index) => (
                    <View break style={styles.totemContentView}>
                      <Text key={index} style={styles.totemDate}>
                        {line}
                      </Text>
                    </View>
                  ))}
                </View>
              </>
            );
          if (isWork(subseg.parentSection!))
            return (
              <>
                <View key={index} style={[styles.workTotem]}>
                  <View
                    style={[
                      styles.workTotemDateView,
                      {
                        ...styles.workTotemView,
                        borderRight: `6px solid ${borderCol}`,
                      },
                    ]}
                  >
                    <Text
                      style={{ ...styles.totemDate, ...styles.bolder }}
                    >{`${subseg.dateFrom?.substring(0, 4)}`}</Text>
                    <Text
                      style={{ ...styles.totemDate, ...styles.bolder }}
                    >{`${subseg.dateTo?.substring(0, 4)}`}</Text>
                  </View>
                  <View
                    style={[styles.workTotemDeetsView, styles.workTotemView]}
                  >
                    <Text style={styles.totemTitle}>{subseg.title}</Text>

                    <Text style={styles.totemSubtitle}>{subseg.subTitle}</Text>

                    {subseg.content?.map((line, index) => (
                      <View break style={styles.totemContentView}>
                        <Text key={index} style={styles.totemDate}>
                          {line}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </>
            );
        })}
      </View>
    );
  };

  const doc5TotemPole = (
    subsegments: SubSeg[],
    styles: indexObj,
    desiredSection: string,
    sections: string[],
    panTitleLeft?: boolean
  ) => {
    let neededSubsegs = subsegments.filter(
      (segment) => segment.parentSection === desiredSection
    );
    if (sections.indexOf(desiredSection) >= 0)
      return (
        <View
          style={[
            styles.biographySection,
            panTitleLeft ? styles.alignStart : {},
          ]}
        >
          {doc5SectionTitle({
            styles: styles,
            sectionTitle: desiredSection.toUpperCase(),
            rectWidth: "50",
            rectHeight: "2",
            rectColor: "coralPink",
          })}
          {theTotem(neededSubsegs, styles)}
        </View>
      );
  };

  const doc5SkillsBubble = (
    subseg: SubSeg,
    styles: indexObj,
    index: number
  ) => {
    let width: number = subseg.order! * 10;
    let height: number = width;
    let possibleLeftDisplacement: number = 298 - width;
    let possibleTopDisplacement: number = 150 - height;
    let topPosition: number = Math.random() * possibleTopDisplacement;
    let leftPosition: number = Math.random() * possibleLeftDisplacement;
    let bkgCol = Object.values(tbcp)[index % Object.keys(tbcp).length];

    return (
      <View
        key={index}
        style={[
          styles.doc5SkillsBubble,
          {
            height: `${height}px`,
            width: `${width}px`,
            backgroundColor: bkgCol,
            top: `${topPosition}px`,
            left: `${leftPosition}px`,
            opacity: 0.5,
          },
        ]}
      ></View>
    );
  };

  const doc5SkillsMap = (subseg: SubSeg, styles: indexObj, index: number) => {
    let bkgCol = Object.values(tbcp)[index % Object.keys(tbcp).length];

    return (
      <React.Fragment key={index}>
        <View
          style={[styles.doc5SkillsMapBubble, { backgroundColor: bkgCol }]}
        ></View>
        <Text
          style={{ ...styles.totemDate, ...styles.bolder }}
        >{`${subseg.title}`}</Text>
        3{" "}
        <Text style={{ ...styles.totemDate }}>{`: ${
          subseg.order! * 10
        }%`}</Text>
      </React.Fragment>
    );
  };

  const doc5skills = (
    subsegments: SubSeg[],
    styles: indexObj,
    desiredSection: string,
    panTitleLeft?: boolean
  ) => {
    let desiredSubsegments = subsegments.filter(
      (subseg) => subseg.parentSection === desiredSection
    );
    if (desiredSubsegments.length > 0)
      return (
        <View
          style={[
            styles.biographySection,
            panTitleLeft ? styles.alignStart : {},
          ]}
        >
          {doc5SectionTitle({
            styles: styles,
            sectionTitle: desiredSection.toUpperCase(),
            rectWidth: "50",
            rectHeight: "2",
            rectColor: "coralPink",
          })}
          <View style={styles.doc5SkillsContainer}>
            <View style={styles.doc5SkillsMap}>
              {desiredSubsegments
                .sort((a, b) => b.order! - a.order!)
                .map((subseg, index) => doc5SkillsMap(subseg, styles, index))}
            </View>
            <View style={styles.doc5SkillBubbleContainer}>
              {desiredSubsegments
                .sort((a, b) => b.order! - a.order!)
                .map((subseg, index) =>
                  doc5SkillsBubble(subseg, styles, index)
                )}
            </View>
          </View>
        </View>
      );
    return;
  };

  return { bioData, profileSummary, doc5TotemPole, doc5skills };
};

export default useDocComponentsB;
