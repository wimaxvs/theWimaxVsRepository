import React from "react";
import { Font, StyleSheet } from "@react-pdf/renderer";

Font.register({
  family: "Roboto",
  src: "/fonts/Roboto-Black.ttf",
});

const colorPalette = {
  darkBrown: "#66473d",
  brown: "#9d8678",
  beige: "#cbc2b6",
  grey: "#d8d8d8",
  limestone: "#e6eaed",

  titleText: "#333",
  subtitleText: "#8c8270",
  contentText: "#444",
  dateText: "#555",
};

const useDoc2Styles = () => {
  const dividerOptions = {
    x1: "0",
    y1: "0",
    x2: "20",
    y2: "0",
    strokeWidth: 2,
    stroke: colorPalette.brown,
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
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "10px",
    },
    page: {
      backgroundColor: "white",
      width: "100%",
      height: "100%",
      minWidth: "375px",
      minHeight: "530.324px",
      maxWidth: "500px",
      maxHeight: "707.1px",
      position: "relative",
    },
  });

  return {styles, dividerOptions};
};

export default useDoc2Styles;
