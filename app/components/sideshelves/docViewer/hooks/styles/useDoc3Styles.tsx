"use client";
import { Font, StyleSheet } from "@react-pdf/renderer";

Font.register({
  family: "Poppins",
  fonts: [
    {
      src: `/fonts/doc3/Poppins-Regular.ttf`,
    },
    {
      src: `/fonts/doc3/Poppins-Bold.ttf`,
      fontWeight: "bold",
    },
    {
      src: `/fonts/doc3/Poppins-ExtraBold.ttf`,
      fontWeight: "heavy",
    },
    {
      src: `/fonts/doc3/Poppins-Medium.ttf`,
      fontWeight: "normal",
    },
    {
      src: `/fonts/doc3/Poppins-Thin.ttf`,
      fontWeight: "thin",
    },
    {
      src: `/fonts/doc3/Poppins-Light.ttf`,
      fontWeight: "light",
    },
  ],
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
      paddingTop: 15,
      paddingBottom: 65,
    },
    letterHead: {
      position: "absolute",
      height: "100%",
      width: "100%",
    },
    letterHeadUpperRightRect: {
      position: "absolute",
      left: "40%",
      top: "-15",
    },
    letterHeadLowerLeftRect: {
      position: "absolute",
      top: "95%",
    },
    letterHeadLowerRightRect: {
      position: "absolute",
      right: "-15%",
      top: "100%",
    },

    //header////////////////////////////////////////
    header: {
      ...flexRow,
      width: "100%",
      height: "30%",
      padding: "15px 40px 0",
    },
    //header name////////////////////////////////////////
    nameSection: {
      width: "60%",
      height: "100%",
    },
    upperNameSection: {
      position: "relative",
      width: "100%",
      maxWidth: "100%",
      ...flexCol,
      alignItems: "flex-start",
      justifyContent: "center",
    },
    lowerNameSection: {
      position: "relative",
      width: "100%",
      maxWidth: "100%",
      ...flexCol,
      alignItems: "flex-start",
      justifyContent: "center",
    },
    upperNameText: {
      fontFamily: "Poppins",
      fontWeight: "heavy",
      lineHeight: 1.1,
      padding: 0,
    },
    upperJobTitleTextContainer: {
      marginTop: "10px",
      paddingRight: "10px",
      color: colorPalette.subtitleText,
      fontWeight: "thin",
      fontFamily: "Poppins",
    },
    lowerContactTextContainer: {
      ...flexRow,
      alignItems: "center",
      gap: "5px",
      maxHeight: "15px",
      minHeight: "15px",
      marginTop: "5px",
    },
    lowerContactText: {
      paddingRight: "10px",
      color: colorPalette.contentText,
      lineHeight: 1,
      fontWeight: "normal",
      fontFamily: "Poppins",
    },
    lowerContactTextIcon: {
      height: "90%",
      aspectRatio: "1/1",
      objectFit: "contain",
    },
    //header image////////////////////////////////////////
    imageSection: {
      height: "100%",
      width: "40%",
      ...flexCol,
      alignItems: "center",
    },
    imageItself: {
      borderRadius: "15",
      objectFit: "cover",
      height: "100%",
      aspectRatio: "1/1",
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
      padding: "0 40px",
    },
    column: {
      padding: "5px 0px",
      ...flexCol,
    },
    leftColumn: {
      flexGrow: 1,
      maxWidth: "30%",
    },
    rightColumn: {
      flexGrow: 2,
      maxWidth: "65%",
      borderLeft: `1px solid ${colorPalette.mistyRose}`,
      padding: "5px 0 5px 15px",
    },
    //Left Body////////////////////////////////////////
    leftColSection: {
      ...flexCol,
      alignItems: "flex-start",
      gap: "7.5px",
      marginBottom: "10px",
    },
    sectionText: {
      fontSize: "12px",
      color: colorPalette.contentText,
      fontFamily: "Poppins",
    },
    augmentedSectionText: {
      marginTop: "5px",
      fontSize: "10px",
      color: colorPalette.contentText,
      fontFamily: "Poppins",
      lineHeight: 1,
      fontWeight: "normal",
    },
    sectionHeaderTitle: {
      fontFamily: "Poppins",
      fontWeight: "bold",
      lineHeight: 1,
      letterSpacing: "2px",
      color: colorPalette.titleText,
    },
    //Loading Bar////////////////////////////////////////
    forLoadingBar: {
      gap: "3px",
      marginTop: "5px",
    },
    loadingBar: {
      ...flexRow,
      alignItems: "center",
      maxWidth: "100%",
    },
    outerBar: {
      width: "95%",
      height: 2,
      backgroundColor: `${colorPalette.celadonGreen}`,
    },
    innerBar: {
      height: "100%",
      backgroundColor: colorPalette.lightBeige,
    },
    //Right Body////////////////////////////////////////
    eduSection: {
      ...flexRow,
      gap: "10px",
      flexWrap: "wrap",
      maxWidth: "95%",
    },
    awardsAndCertifications: {
      ...flexRow,
      gap: "25px",
      justifyContent: "flex-start",
    },
    forEdu: {
      maxWidth: "50%",
    },
    titleAndDate: {
      ...flexRow,
      gap: "5px",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    contactSubSegTitle: {
      fontSize: "15px",
      fontFamily: "Poppins",
      fontWeight: "bold",
      lineHeight: 1,
      color: colorPalette.celadonGreen,
    },
    forTitleDate: {
      fontFamily: "Poppins",
      fontSize: "10px",
      lineHeight: 1,
      color: colorPalette.dateText,
    },
  });

  return { styles, rectOptions };
};

export default useDoc3Styles;
