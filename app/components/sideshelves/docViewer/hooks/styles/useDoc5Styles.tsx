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

const colorPalette: { [key: string]: string } = {
  jungleGreen: "#619d3d",
  coralPink: "#f06079",
  palePink: "#fdb7c1",
  mistyBlue: "#f5f9fa",
  steelBlue: "#4682B4",
  evenPalerPink: "#ffedf0",

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
const fontSettings: {} = {
  fontFamily: "Montserrat",
  fontWeight: "light",
  letterSpacing: "1.5px",
  lineHeight: 1.2,
};
const totemHead = {
  gap: "2.5px",
  width: "50%",
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
    //Header////////////////////////////////////////
    header: {
      backgroundColor: colorPalette.steelBlue,
      width: "110%",
      height: "30%",
      top: "-10%",
      left: "-5%",
      transform: "rotate(-10deg)",
    },
    //Name in Header////////////////////////////////////////
    nameInHeader: {
      position: "absolute",
      ...flexCol,
      alignItems: "center",
      justifyContent: "space-around",
      width: "50%",
      left: "50%",
      transform: "translate(-30%)",
      top: 20,
    },
    upperNameText: {
      fontFamily: "Montserrat",
      fontWeight: "normal",
      lineHeight: 1.1,
      padding: 0,
      color: "white",
    },
    upperJobTitleTextContainer: {
      paddingRight: "10px",
      color: "white",
      fontWeight: "normal",
      fontFamily: "Montserrat",
    },

    //Left Column////////////////////////////////////////
    colBehindLeftCol: {
      position: "absolute",
      width: "40%",
      height: "100%",
      backgroundColor: colorPalette.evenPalerPink,
    },
    leftCol: {
      ...flexCol,
      position: "absolute",
      height: "100%",
      width: "40%",
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
    blinderDiv: {
      backgroundColor: colorPalette.evenPalerPink,
      height: "5%",
      transform: "skew(0, -10deg)",
      top: "-5.85%",
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
      width: "60%",
    },
    //left col section css////////////////////////////////////////
    biographySection: {
      ...flexCol,
      gap: "5px",
      width: "100%",
      alignItems: "center",
    },
    biographySectionTitle: {
      ...fontSettings,
    },
    bioDataTable: {
      ...flexCol,
      alignItems: "center",
      width: "100%",
      gap: "4px",
      padding: "0 12.5px 0 17.5px",
      margin: "15px 0 0 0",
      outlineStyle: "solid",
    },
    bioDataTableRow: {
      width: "100%",
      ...flexRow,
      justifyContent: "space-between",
      alignItems: "center",
    },
    basicText: {
      fontSize: "8px",
      ...fontSettings,
      color: colorPalette.contentText,
    },
    emboldennedBasics: {
      fontWeight: "normal",
    },
    forSummary: {
      fontSize: "8px",
      padding: "0 12.5px 0 17.5px",
    },

    //Totem
    actualTotem: {
      ...flexCol,
      width: "100%",
    },
    withRightBorder: {
      alignSelf: "flex-start",
      transform: "translateX(5px)",
      ...totemHead,
      padding: "0 5px 0 17.5px",
    },
    withLeftBorder: {
      alignSelf: "flex-end",
      transform: "translateX(-5px)",
      ...totemHead,
      padding: "0 12.5px 0 5px",
    },
    totemTitle: {
      ...fontSettings,
      fontSize: "10px",
      color: colorPalette.steelBlue,
    },
    totemSubtitle: {
      ...fontSettings,
      fontSize: "8px",
      color: colorPalette.titleText,
    },
    totemDate: {
      ...fontSettings,
      fontSize: "6px",
      color: colorPalette.subtitleText,
    },
    totemContentView: {
      ...flexCol,
      gap: "3px",
      marginTop: "5px",
    },
  });

  return { styles, rectOptions };
};

export default useDoc5Styles;
