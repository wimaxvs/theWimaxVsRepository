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

const useDoc8Styles = () => {
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
      ...flexCol,
      padding: "40px 20px 20px 20px",
      gap: "20px",
      width: "100%",
    },
    column: {
      ...flexCol,
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

 
  });

  return { styles, rectOptions };
};

export default useDoc8Styles;
