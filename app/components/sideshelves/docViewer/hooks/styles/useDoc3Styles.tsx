"use client";
import { Font, StyleSheet } from "@react-pdf/renderer";

Font.register({
  family: "Roboto",
  src: "/fonts/Roboto-Black.ttf",
});
Font.register({
  family: "Unisans",
  src: "/fonts/Uni Sans Thin.otf",
});

const colorPalette: { [key: string]: string } = {
  lightSalmon: "#fae4de",
  salmon: "#f2b3a4",
  lightBeige: "#e5c9b2",
  mistyRose: "#bfb4ae",
  sageGreen: "#9fa9a0",
  celadonGreen: "#8aa192",

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

const useDoc3Styles = () => {
  const rectOptions = (color?: string) => {
    return {
      width: "100%",
      height: "100%",
      rx: "15",
      ry: "15",
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
      paddingTop: 15,
      paddingBottom: 65,
      // backgroundColor: colorPalette.salmon,
    },
    letterHead: {
      position: "absolute",
      height: "100%",
      width: "100%",
    },
    letterHeadUpperRightRect: {
      left: "40%",
      top: " -15"
    },
    letterHeadLowerLeftRect: {
      // left: "20%",
      // bottom: "100%"
      top: "65%"
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
  });

  return { styles, rectOptions };
};

export default useDoc3Styles;
