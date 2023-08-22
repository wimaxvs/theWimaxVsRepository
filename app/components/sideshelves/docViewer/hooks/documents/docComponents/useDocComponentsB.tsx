import { SubSeg, user } from "@/app/hooks/useCvSubSegments";
import { indexObj, striNum } from "./useDocComponents";
import { Text, View } from "@react-pdf/renderer";
import useDoc5Styles from "../../styles/useDoc5Styles";
import useDocComponents from "./useDocComponents";
import useCvData from "../../useCvData";

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
      <>
        <Text style={{ ...styles.biographySectionTitle, fontSize: "12px" }}>
          {sectionTitle}
        </Text>
        {rect(rectWidth, rectHeight, rectColor)}
      </>
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

  const actualTotem = (subsegments: SubSeg[], styles: indexObj) => (
    <View style={styles.actualTotem}>
      {subsegments.map((subseg, index) => (
        <>
          <View
            key={index}
            style={
              index % 2 === 0 ? {...styles.withRightBorder} : styles.withLeftBorder
            }
          ></View>
        </>
      ))}
    </View>
  );

  const doc5TotemPole = (
    subsegments: SubSeg[],
    styles: indexObj,
    desiredSection: string,
    sections: string[]
  ) => {
    let neededSubsegs = subsegments.filter(
      (segment) => segment.parentSection === desiredSection
    );
    if (sections.indexOf(desiredSection) >= 0)
      return (
        <View style={styles.biographySection}>
          {doc5SectionTitle({
            styles: styles,
            sectionTitle: desiredSection.toUpperCase(),
            rectWidth: "50",
            rectHeight: "2",
            rectColor: "coralPink",
          })}
          {actualTotem(neededSubsegs, styles)}
        </View>
      );
  };

  return { bioData, profileSummary, doc5TotemPole };
};

export default useDocComponentsB;
