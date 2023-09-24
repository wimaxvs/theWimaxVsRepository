"use client";
import { Font, StyleSheet } from "@react-pdf/renderer";

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: `/fonts/doc4/Roboto-Regular.ttf`,
    },
    {
      src: `/fonts/doc4/Roboto-Bold.ttf`,
      fontWeight: "bold",
    },
    {
      src: `/fonts/doc4/Roboto-Black.ttf`,
      fontWeight: "heavy",
    },
    {
      src: `/fonts/doc4/Roboto-Medium.ttf`,
      fontWeight: "normal",
    },
    {
      src: `/fonts/doc4/Roboto-Thin.ttf`,
      fontWeight: "thin",
    },
    {
      src: `/fonts/doc4/Roboto-Light.ttf`,
      fontWeight: "light",
    },
  ],
});

const colorPalette: { [key: string]: string } = {
  black : "#151513",
  darkGrey : "#474945",
  grey : "#6e716c",
  darkBlue : "#012745",
};

const flexRow: {} = {
  display: "flex",
  flexDirection: "row",
};
const flexCol: {} = {
  display: "flex",
  flexDirection: "column",
};
const fontSettings: {} = {
  fontFamily: "Roboto",
  fontWeight: "light",
  letterSpacing: "1.5px",
  lineHeight: 1.2,
};

const useDoc5Styles = () => {
  const rectOptions = (color?: string, isSquare?: boolean) => {
    return {
      width: "100%",
      height: "100%",
      rx: isSquare ? "0" : "15",
      ry: isSquare ? "0" : "15",
      fill: color ? colorPalette[color] : colorPalette.mistyBlue,
    };
  };

  const styles = StyleSheet.create({
    pdfViewer: {
      width: "70%",
      aspectRatio: "1/1.41",
      minWidth: "385px",
      maxWidth: "510px",
      maxHeight: "717.1px",
      marginLeft: "10px",
      marginTop: "10px",
    },
    document: {
      width: "100%",
      height: "100%",
      marginRight: 0,
      marginTop: "10px",
      border: "none",
      borderRadius: "12px",
      ...flexCol,
      alignItems: "center",
      justifyContent: "center",
      padding: "10px",
    },
    page: {
      position: "relative",
      padding: "10px 0 30px 0",
      backgroundColor: colorPalette.mistyBlue,
    },
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 10,
      right: 30,
      textAlign: "center",
      color: "grey",
    },
    contactLinkBar: {
      ...flexRow,
      width: "80%",
      left: 30,
      justifyContent: "space-between",
      position: "absolute",
      bottom: 10,
    },
    contactLink: {
      ...flexRow,
      justifyContent: "space-between",
    },
    basicText: {
      fontSize: "8px",
      ...fontSettings,
      color: colorPalette.contentText,
    },

    //Body////////////////////////////////////////
    body: {
      ...flexCol,
      padding: "40px 20px 20px 20px",
      gap: "20px",
      width: "100%",
    },
    column: {
      ...flexCol,
      gap: "20px",
    },
    leftColumn: {
      width: "40%",
    },
    rightColumn: {
      width: "60%",
      borderLeft: `1px solid #999`,
    },
    sectionTitle: {
      fontSize: "14px",
      fontWeight: "normal",
      letterSpacing: "2.5px",
      color: "#444",
    },
    sectionContent: {
      fontSize: "10px",
      fontWeight: "thin",
      lineHeight: 1.1,
      color: "#777",
      maxWidth: "100%",
    },

    //upper image and name section
    imageAndNameSection: {
      ...flexRow,
      justifyContent: "space-between",
      height: "150px",
      width: "100%",
      paddingBottom: "15px",
      borderBottom: `1px solid #999`,
    },

    //upper name section
    nameAndTitleSegment: {
      ...flexCol,
      alignItems: "flex-start",
      justifyContent: "center",
      height: "100%",
      width: "60%",
    },
    fullName: {
      ...flexRow,
      flexWrap: "wrap",
    },
    upperNameText: {
      fontFamily: "Roboto",
      fontWeight: "heavy",
      lineHeight: 1.1,
      padding: 0,
      letterSpacing: "5px",
    },
    upperJobTitleTextContainer: {
      paddingRight: "10px",
      fontWeight: "light",
      fontFamily: "Roboto",
      lineHeight: 1.1,
      color: "#555",
    },
    locationIconText: {
      ...flexRow,
      gap: "5px",
      alignItems: "center",
    },
    lowerContactTextIcon: {
      height: "10px",
      aspectRatio: "1/1",
      objectFit: "contain",
    },

    //upper image section
    imageSegment: {
      ...flexCol,
      alignItems: "center",
      justifyContent: "flex-start",
      height: "100%",
      width: "35%",
    },
    imageItself: {
      objectFit: "cover",
      width: "125px",
      height: "125px",
      aspectRatio: "1/1",
      overflow: "hidden",
      borderRadius: "50%",
    },

    //lower body css
    lowerBody: {
      ...flexRow,
      justifyContent: "space-around",
      width: "100%",
    },

    //summary section
    summarySection: {
      ...flexRow,
      width: "100%",
    },
    summarySectionDot: {
      height: "10px",
      width: "10px",
      backgroundColor: "#444",
      borderRadius: "50%",
      marginTop: "20px",
      position: "relative",
      transform: "translateX(-5px)",
    },
    summarySectionContent: {
      ...flexCol,
      gap: "7.5px",
      textAlign: "left",
      alignItems: "flex-start",
      padding: "0px 10px 0 15px",
    },
    summarySectionDivider: {
      marginTop: "20px",
      width: "100%",
      borderBottom: "1px solid #999",
    },

    //work experience sections
    workSection: {
      ...flexCol,
      gap: "10px",
      padding: "0px 10px 0 22.5px",
      maxWidth: "100%",
    },
    innerWorkSection: {
      ...flexCol,
      alignItems: "flex-start",
      gap: "3px",
      maxWidth: "100%",
    },
    titleWithDot: {
      ...flexRow,
      alignItems: "center",
    },
    innerWorkSectionTitle: {
      left: "-7.5px",
      fontSize: "14px",
      lineHeight: 1.1,
      fontFamily: "Roboto",
      fontWeight: "light",
      color: "#444",
      letterSpacing: "1px",
    },
    sectionSubtitle: {
      fontSize: "12px",
      fontFamily: "Roboto",
      fontWeight: "light",
      color: "#666",
    },
    actualContent: {
      gap: "2.5px",
    },
    workContent: {
      alignItems: "center",
      left: "3.75px",
      gap: "3px",
      marginBottom: "1.5px",
      maxWidth: "95%",
      whiteSpace: "pre-wrap",
    },

    //languages
    langs: {
      ...flexRow,
      justifyContent: "flex-start",
      flexWrap: "wrap",
      maxWidth: "95%",
      // gap: "10px"
    },
    lang: {
      ...flexCol,
      gap: "3px",
      margin: "3px 0px 5px 0px",
      alignItems: "flex-start",
      flexGrow: 1
    }
  });

  return { styles, rectOptions };
};

export default useDoc5Styles;
