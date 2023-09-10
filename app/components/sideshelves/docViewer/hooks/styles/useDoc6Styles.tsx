"use client";
import { Font, StyleSheet } from "@react-pdf/renderer";

Font.register({
  family: "Montserrat",
  fonts: [
    {
      src: `/fonts/doc5/Montserrat-Regular.ttf`,
    },
    {
      src: `/fonts/doc5/Montserrat-Bold.ttf`,
      fontWeight: "bold",
    },
    {
      src: `/fonts/doc5/Montserrat-Black.ttf`,
      fontWeight: "heavy",
    },
    {
      src: `/fonts/doc5/Montserrat-SemiBold.ttf`,
      fontWeight: "semibold",
    },
    {
      src: `/fonts/doc5/Montserrat-Medium.ttf`,
      fontWeight: "normal",
    },
    {
      src: `/fonts/doc5/Montserrat-Thin.ttf`,
      fontWeight: "thin",
    },
    {
      src: `/fonts/doc5/Montserrat-Light.ttf`,
      fontWeight: "light",
    },
  ],
});

const colorPalette: { [key: string]: string } = {};

const flexRow: {} = {
  display: "flex",
  flexDirection: "row",
};
const flexCol: {} = {
  display: "flex",
  flexDirection: "column",
};
const fontSettings: {} = {
  fontFamily: "Montserrat",
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
      padding: "0 0 30px 0",
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

    imageSection: {
      position: "relative",
      width: "100%",
      height: "30%",
      ...flexCol,
      alignItems: "center",
      transform: "skew(0, -10deg)",
      top: "-3%",
    },
    imageItself: {
      objectFit: "cover",
      width: "100%",
      height: "100%",
      aspectRatio: "1/1",
      transform: "skew(0, 10deg)",
      overflow: "hidden",
    },

    //Body////////////////////////////////////////
    body: {
      ...flexRow,
      gap: "20px",
      position: "absolute",
      width: "100%",
      marginTop: "36.5%",
    },
    column: {
      ...flexCol,
      gap: "20px",
    },
    leftColumn: {
      width: "40%",
    },
    rightColumn: {
      width: "50%",
    },
  });

  return { styles, rectOptions };
};

export default useDoc5Styles;
