"use client";
import { Font, StyleSheet } from "@react-pdf/renderer";

Font.register({
  family: "Gabarito",
  fonts: [
    {
      src: `/fonts/doc8/Gabarito-Regular.ttf`,
    },
    {
      src: `/fonts/doc8/Gabarito-Bold.ttf`,
      fontWeight: "bold",
    },
    {
      src: `/fonts/doc8/Gabarito-SemiBold.ttf`,
      fontWeight: "semibold",
    },
    {
      src: `/fonts/doc8/Gabarito-Black.ttf`,
      fontWeight: "heavy",
    },
    {
      src: `/fonts/doc8/Gabarito-Medium.ttf`,
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
    {
      src: `/fonts/doc4/Roboto-MediumItalic.ttf`,
      fontStyle: "italic",
      fontWeight: "normal",
    },
  ],
});

const colorPalette: { [key: string]: string } = {
  black: "#151513",
  darkGrey: "#474945",
  grey: "#6e716c",
  darkBlue: "#012745",
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
  fontFamily: "Gabarito",
  fontWeight: "light",
  letterSpacing: "1.5px",
  lineHeight: 1.2,
};

const useDoc9Styles = () => {
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

    //Body////////////////////////////////////////
    body: {
      ...flexRow,
      padding: "40px 20px 20px 20px",
      gap: "5px",
      width: "100%",
    },
    column: {
      ...flexCol,
      gap: "20px",
      minHeight: "40px",
    },
    divider: {
      height: "100%",
      border: "1px solid #999",
      margin: "0px 10px",
      backgroundColor: "#999",
    },
    circularDotCasing: {
      height: "60px",
      width: "20px",
      ...flexCol,
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: "140px",
      left: "55%",
      transform: "translateX(-10px)",
      backgroundColor: "white",
    },
    circularDot: {
      height: "7.5px",
      width: "7.5px",
      border: "2px solid #333",
      borderRadius: "50%",
    },
    secondDotMutation: {
      height: "20px",
      top: 0,
      left: "0%",
      transform: "translateX(-11px)",
      justifyContent: "flex-start"
    },

    //left side of body
    leftBody: {
      width: "57.5%",
      maxWidth: "60%",
      ...flexCol,
      marginRight: "5px",
    },
    upperLeftBody: {
      width: "100%",
      position: "relative",
      top: "-50px",
      ...flexRow,
      gap: "15px",
    },
    leftUpperLeftBody: {
      width: "55%",
      ...flexCol,
      gap: "7.5px",
      alignItems: "flex-end",
      textAlign: "right",
      paddingRight: "15px",
      borderRight: "1px solid #333",
    },
    userName: {
      fontFamily: "Gabarito",
      fontWeight: "normal",
      lineHeight: 1.1,
    },
    rightUpperLeftBody: {
      width: "40%",
      ...flexCol,
      alignItems: "flex-start",
      textAlign: "left",
      gap: "15px",
    },
    contacts: {
      ...flexCol,
      gap: "3px",
      alignItems: "flex-start",
      width: "100%",
    },
    lowerLeftBody: {
      width: "100%",
      top: "-40px",
    },
    negativeTopMargin: {
      marginTop: "-7px",
    },
    parentSection: {
      width: "100%",
      ...flexCol,
      alignItems: "flex-end",
      gap: "10px",
    },
    leftColSection: {
      alignItems: "flex-end",
    },
    leftColContentSection: {
      maxWidth: "95%",
      ...flexCol,
      gap: "2px",
      marginTop: "5px",
    },
    //for loading bar
    loadingBarElement: {
      maxWidth: "95%",
      ...flexRow,
      alignItems: "center",
      justifyContent: "space-between",
    },
    reverseLoadingBarElement: {
      // flexDirection: "row-reverse",
      marginRight: 0,
    },
    loadingBar: {
      ...flexRow,
      alignItems: "center",
      maxWidth: "50%",
    },
    outerBar: {
      width: "95%",
      height: 2.5,
      backgroundColor: `${colorPalette.grey}`,
    },
    innerBar: {
      height: "100%",
      backgroundColor: colorPalette.black,
    },

    //right body
    rightBody: {
      maxWidth: "40%",
      width: "40%",
      marginTop: "100px",
      borderLeft: "1px solid #333",
      paddingLeft: "10px",
    },
    anySection: {
      ...flexCol,
      gap: "10px",
      width: "95%",
    },
    skillElement: {
      ...flexRow,
      justifyContent: "flex-start",
      alignItems: "center",
      gap: "3px",
      width: "100%",
    },
    skillDot: {
      height: "4.5px",
      width: "4.5px",
      borderRadius: "50%",
      border: "1px solid #333",
    },

    //text settings
    sectionTitleDetails: {
      fontFamily: "Gabarito",
      fontWeight: "bold",
      lineHeight: 1.1,
      padding: 0,
      letterSpacing: "3px",
    },
    sectionTitle: {
      fontSize: "12px",
      color: "#444",
      fontFamily: "Gabarito",
      fontWeight: "normal",
    },
    sectionSubtitle: {
      fontWeight: "normal",
      fontSize: "10px",
      fontFamily: "Gabarito",
      color: "#666",
      fontStyle: "italic",
    },
    sectionContent: {
      fontSize: "9px",
      fontWeight: "thin",
      lineHeight: 1.1,
      color: "#777",
      maxWidth: "100%",
    },

    //upper image section
    imageSegment: {
      ...flexCol,
      alignItems: "center",
      justifyContent: "center",
      width: "120px",
      height: "150px",
    },
    imageItself: {
      objectFit: "cover",
      width: "120px",
      height: "150px",
      aspectRatio: "1/1",
      overflow: "hidden",
      filter: "grayscale(100%)",
    },
  });

  return { styles, rectOptions };
};

export default useDoc9Styles;
