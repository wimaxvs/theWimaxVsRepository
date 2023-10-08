"use client";
import { Font, StyleSheet } from "@react-pdf/renderer";
import { indexObj } from "../documents/docComponents/useDocComponents";

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
      src: `/fonts/doc3/Poppins-Medium.ttf`,
      fontWeight: "normal",
    },
    {
      src: `/fonts/doc3/Poppins-Thin.ttf`,
      fontWeight: "thin",
    },
    {
      src: `/fonts/doc4/Roboto-Light.ttf`,
      fontWeight: "light",
    },
    {
      src: `/fonts/doc3/Poppins-MediumItalic.ttf`,
      fontStyle: "italic",
      fontWeight: "normal",
    },
  ],
});

const colorPalette: { [key: string]: string } = {
  powderyYellow: "#eec055",
  navyBlue: "#20205e",
};

const flexRow: {} = {
  display: "flex",
  flexDirection: "row",
};
const flexCol: {} = {
  display: "flex",
  flexDirection: "column",
};

const useDoc10Styles = () => {
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
      padding: "10px 10px 30px 10px",
      backgroundColor: "white",
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
      padding: "0px 20px 20px",
      gap: "20px",
      width: "100%",
    },

    //letterhead/////////////////////////////////
    letterHead: {
      width: "60px",
      height: "60px",
      left: "15px",
      position: "absolute",
      backgroundColor: `${colorPalette.navyBlue}`,
    },

    //body breakdown
    bodyPartition: {
      ...flexRow,
      width: "100%",
    },

    //upper body
    upperBody: {},
    leftUpperBody: {
      ...flexRow,
      gap: "10px",
      justifyContent: "space-evenly",
      alignItems: "center",
      backgroundColor: `${colorPalette.powderyYellow}`,
      padding: "10px",
      width: "70%",
      maxWidth: "70%",
    },
    leftUpperBodyBox: {
      ...flexCol,
      gap: "7.5px",
      paddingTop: "15px",
      textAlign: "right",
      width: "45%",
      maxWidth: "50%",
      justifyContent: "center",
    },
    nameBox: {
      alignItems: "flex-end",
    },
    offsetDivider: {
      border: "1px solid black",
      height: "100%",
      position: "relative",
      top: "30px",
    },
    contactsBox: {
      alignItems: "flex-start",
    },

    rightUpperBody: {
      width: "30%",
      borderRight: `10px solid ${colorPalette.navyBlue}`,
      position: "relative",
      left:"30px",
    },

    //Lower body
    lowerBody: {
      top: "30px",
    },
    column: {
      ...flexCol,
      gap: "20px",
      minHeight: "40px",
    },
    lowerLeftColumn: {
      maxWidth: "34.85%",
      width: "34.85%",
      paddingRight: "25px",
    },
    lowerRightColumn: {
      maxWidth: "60%",
      height: "100%",
    },
    skillDot: {
      height: "4.5px",
      width: "4.5px",
      borderRadius: "50%",
      border: "1px solid #333",
      backgroundColor: "#333",
      marginRight: "15px",
    },

    //modifications to anySection for template 11
    forTemplate11Profile: {
      paddingLeft: "20px",
      borderLeft: `3px solid ${colorPalette.navyBlue}`,
    },
    anySectionEncasement: {
      paddingLeft: "20px",
      borderLeft: `1px solid ${colorPalette.navyBlue}`,
    },
    template11TitleDot: {
      height: "3px",
      width: "3px",
      backgroundColor: `${colorPalette.powderyYellow}`,
      marginRight: "-3px",
      left: "-20px",
    },
    meritLeft: {
      borderLeft: `1px solid ${colorPalette.navyBlue}`,
      marginRight: "17px",
      height: "100%",
      width: "3px",
    },

    //for loading bar
    loadingBar: {
      ...flexRow,
      alignItems: "center",
      maxWidth: "95%",
    },
    outerBar: {
      width: "95%",
      height: 2.5,
      backgroundColor: `#999`,
    },
    innerBar: {
      height: "100%",
      backgroundColor: "black",
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
      fontFamily: "Gabarito",
      fontSize: "9px",
      fontWeight: "thin",
      lineHeight: 1.1,
      color: "black",
      maxWidth: "100%",
    },

    //upper image section
    imageSegment: {
      ...flexCol,
      alignItems: "center",
      justifyContent: "center",
      width: "132px",
      height: "165px",
    },
    imageItself: {
      objectFit: "cover",
      width: "132px",
      height: "165px",
      aspectRatio: "1/1",
      overflow: "hidden",
    },
  });

  return { styles };
};

export default useDoc10Styles;
