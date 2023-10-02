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
  fontFamily: "Roboto",
  fontWeight: "light",
  letterSpacing: "1.5px",
  lineHeight: 1.2,
};

const useDoc7Styles = () => {
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
      alignItems: "flex-end",
      gap: "20px",
      width: "50%",
      maxWidth: "50%",
      minHeight: "40px",
    },
    sectionTitle: {
      fontSize: "12px",
      color: "#444",
      fontFamily: "Roboto",
      fontWeight: "normal",
    },
    sectionSubtitle: {
      fontWeight: "normal",
      fontSize: "10px",
      fontFamily: "Roboto",
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

    //upper name section
    nameSectionBlock: {
      width: "100%",
      ...flexCol,
      alignItems: "center",
      gap: "10px",
    },
    theNameBox: {
      padding: "10px 20px",
      ...flexRow,
      alignItems: "center",
      justifyContent: "center",
      border: "1px solid #999",
    },
    theNameItself: {
      fontSize: "18px",
      color: "#000",
      letterSpacing: "2px",
      fontWeight: "light",
      fontFamily: "Roboto",
    },
    theJobPosition: {
      fontSize: "10px",
      color: "#333",
    },
    //upper image section
    imageSegment: {
      ...flexCol,
      alignItems: "center",
      justifyContent: "center",
      height: "80px",
      width: "80px",
    },
    imageItself: {
      objectFit: "cover",
      width: "80px",
      height: "80px",
      aspectRatio: "1/1",
      overflow: "hidden",
      borderRadius: "50%",
    },

    //lower body
    parentSection: {
      width: "100%",
      ...flexCol,
      alignItems: "flex-end",
      gap: "10px",
    },

    //lower left body
    lowerBody: {
      ...flexRow,
      gap: "10px",
      maxWidth: "100%",
    },
    sectionTitleDetails: {
      fontFamily: "Roboto",
      fontWeight: "heavy",
      lineHeight: 1.1,
      padding: 0,
      letterSpacing: "3px",
    },

    //divider
    divider: {
      height: "100%",
      border: "1px solid #999",
      margin: "0px 10px",
      backgroundColor: "#999",
    },

    sectionCol: {
      ...flexCol,
      gap: "3px",
      padding: "5px",
      maxWidth: "95%",
    },
    leftColSection: {
      alignItems: "flex-end",
    },
    rightColSection: {
      alignItems: "flex-start",
      padding: "0px 5px",
      paddingLeft: 0,
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
      flexDirection: "row-reverse",
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
    hobbyBox: {
      width: "100%",
      ...flexRow,
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    actHobby: {
      width: "50%",
      ...flexRow,
      justifyContent: "flex-start",
      marginBottom: "3px",
      padding: "2px",
      boxSizing: "border-box",
      textAlign: "left",
    },
  });

  return { styles, rectOptions };
};

export default useDoc7Styles;
