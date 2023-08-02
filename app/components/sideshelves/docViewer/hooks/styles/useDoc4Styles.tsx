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
  darkBlue: "rgba(0, 80, 103, 0.8)",
  teal: "rgba(4, 131, 153, 1)",
  lightPink: "rgba(254, 185, 198, 1)",
  mauve: "rgba(185, 107, 133, 1)",

  titleText: "#222",
  subtitleText: "#333",
  contentText: "#444",
  dateText: "#555",
};

const flexRow: {} = {
  display: "flex",
  flexDirection: "row",
};
const flexCol: {} = {
  display: "flex",
  flexDirection: "column",
};

const useDoc4Styles = () => {
  const rectOptions = (color?: string, isSquare?: boolean) => {
    return {
      width: "100%",
      height: "100%",
      rx: isSquare ? "0" : "15",
      ry: isSquare ? "0" : "15",
      fill: color ? colorPalette[color] : colorPalette.salmon,
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
      padding: "15 15 65 15",
    },
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey",
    },

    //Body////////////////////////////////////////
    body: {
      ...flexRow,
      gap: "20px",
    },
    column: {
      ...flexCol,
    },
    leftColumn: {
      ...flexCol,
      flexGrow: 1,
      width: "30%",
      maxWidth: "30%",
      backgroundColor: colorPalette.darkBlue,
    },
    rightColumn: {
      flexGrow: 2,
      maxWidth: "65%",
      padding: "5px 0 5px 15px",
    },
    //Left Body////////////////////////////////////////
    leftColumnLinkBox: {
      backgroundColor: colorPalette.lightPink,
      width: "90%",
      height: 25,
    },

    //Left Body Name////////////////////////////////////////
    upperNameSection: {
      position: "relative",
      width: "100%",
      maxWidth: "100%",
      ...flexCol,
      alignItems: "flex-start",
      justifyContent: "center",
      padding: "0 0 0 10px",
    },
    upperNameText: {
      fontFamily: "Roboto",
      fontWeight: "heavy",
      lineHeight: 1.1,
      padding: 0,
      color: colorPalette.lightPink,
    },
    upperJobTitleTextContainer: {
      marginTop: "5px",
      paddingRight: "10px",
      color: "white",
      fontWeight: "normal",
      fontFamily: "Roboto",
    },
    //left column image////////////////////////////////////////
    imageSection: {
      aspectRatio: "1/1",
      width: "150px",
      height: "150px",
      ...flexCol,
      alignItems: "center",
      borderTop: `2px solid ${colorPalette.lightPink}`,
      margin: "0 0 0 10px",
    },
    imageItself: {
      objectFit: "cover",
      height: "100%",
      aspectRatio: "1/1",
    },

    //left column edu////////////////////////////////////////
    leftColumnEduSection: {
      ...flexCol,
      gap: "5px",
      margin: "0 0 0 10px",
    },
    sectionHeaderTitle: {
      color: colorPalette.lightPink,
      fontWeight: "normal",
      fontFamily: "Roboto",
      fontSize: "15px",
    },

    //Right Body////////////////////////////////////////
  });

  return { styles, rectOptions };
};

export default useDoc4Styles;
