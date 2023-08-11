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
  midnightBlue: "#021E20",

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
      width: "40%",
      minHeight: "100%",
      backgroundColor: colorPalette.darkBlue,
    },
    rightColumn: {
      width: "65%",
    },
    //Left Body////////////////////////////////////////
    leftColumnLinkBox: {
      backgroundColor: colorPalette.lightPink,
      width: "90%",
      height: 25,
      ...flexCol,
      alignItems: "center",
      justifyContent: "center"
    },
    leftColumnLinkBoxText: {
textDecoration: "none"    },

    //Left Body Name////////////////////////////////////////
    upperNameSection: {
      position: "relative",
      width: "80%",
      maxWidth: "100%",
      ...flexCol,
      alignItems: "flex-start",
      justifyContent: "center",
      margin: "0 auto 0 auto",
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
      width: "80%",
      height: "150px",
      ...flexCol,
      alignItems: "center",
      borderTop: `2px solid ${colorPalette.lightPink}`,
      margin: "0 auto 0 auto",
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
      width: "80%",
      margin: "0 auto 0 auto",
    },
    sectionHeaderTitle: {
      color: colorPalette.lightPink,
      fontWeight: "normal",
      fontFamily: "Roboto",
      fontSize: "15px",
    },
    leftColSection: {
      ...flexCol,
      alignItems: "flex-start",
      gap: "3px",
    },
    subSegTitle: {
      color: "white",
      fontWeight: "normal",
      fontFamily: "Roboto",
      fontSize: "14px",
      lineHeight: 1,
    },
    dateText: {
      fontWeight: "thin",
      fontSize: "12px",
    },
    subSegSubTitle: {
      fontWeight: "light",
    },

    //Right Body////////////////////////////////////////
    //Right Body Contact Box////////////////////////////////////////
    rightColContactBox: {
      width: "100%",
      margin: "0 auto 0 auto",
      ...flexCol,
      border: `2px solid ${colorPalette.midnightBlue}`,
    },
    contactBoxLabelAndAddress: {
      ...flexRow,
    },
    contactBoxNotice: {
      backgroundColor: colorPalette.lightPink,
    },
    contactBoxNoticeText: {
      lineHeight: 1,
      fontFamily: "Roboto",
      fontWeight: "normal",
      fontSize: "10px",
      color: "white",
      padding: "7.5px 10px",
    },
    contactBoxPrefixText: {
      color: colorPalette.darkBlue,
      padding: "5px 0px",
    },
    contactBoxContentText: {
      color: colorPalette.midnightBlue,
      padding: "7.5px 0px",
    },
    contactBoxAddress: {
      ...flexRow,
      justifyContent: "center",
      alignItems: "center",
      gap: "3px",
      margin: "0 auto 0 auto",
      borderBottom: `2px solid ${colorPalette.midnightBlue}`,
    },
    justWidth: {
      width: "70%",      
    },
    contactBoxTelephone: {
      flexGrow: 1,
      borderBottom: `0`,
    },
    contactBoxEmail: {
      flexGrow: 2,
      borderBottom: `0`,
      borderLeft: `2px solid ${colorPalette.midnightBlue}`,
    },
    //Right Body Profile////////////////////////////////////////
    rightBodyProfileSection: {
      ...flexCol,
      gap: "10px",
      width: "100%",
      margin: "0 auto 0 auto",
    },
    rightBodyProfileSectionTitle: {
      ...flexRow,
      alignItems: "center",
      justifyContent: "space-around",
    },
    rightBodyProfileSectionTitleItself: {
      fontWeight: "normal",
      fontFamily: "Roboto",
      fontSize: "15px",
      lineHeight: 1,
      color: `${colorPalette.midnightBlue}`,
    },
    rightBodyProfileSectionContent: {
      fontWeight: "light",
      fontFamily: "Roboto",
      fontSize: "10px",
      lineHeight: 1.1,
      color: `${colorPalette.midnightBlue}`,
    },
    //Right Body Profile////////////////////////////////////////
    doc4RightColumnWEContainer: {
      ...flexCol,
      gap: "15px",
    },
    doc4RightColumnWE: {
      ...flexRow,
      gap: "15px",
    },
    doc4RightColumnWEHalf: {
      ...flexCol,
      gap: "10px",
    },
    doc4RightColumnWEFirstHalf: {
      maxWidth: "30%",
    },
    forRightColumnTitle: {
      color: colorPalette.darkBlue,
      lineHeight: 1,
    },
    doc4RightColumnWESecondHalf: {
      gap: "5px",
    },
    forRightColumnSubTitle: {
      color: colorPalette.contentText,
      lineHeight: 1,
      fontSize: "10px",
      fontWeight: "light",
      marginBottom: "3px",
    },
    doc4RightColumnWESecondHalfContent: {
      gap: "3px",
    },

    //Doc 4 Lang Section /////////////////////////
    //for loading bar
    loadingBar: {
      transform: "rotate(-90)",
      position: "relative",
    },
    forSkillLevel: {
      position: "absolute",
      top: "45%",
      left: "35%",
      transform: "rotate(90)",
    },

    //Lang section itself
    doc4LangSection: {
      ...flexRow,
      alignItems: "center",
      gap: "20px",
      flexWrap: "wrap",
      justifyContent: "space-around",
      width: "100%",
    },
    doc4Lang: {
      ...flexCol,
      gap: "7.5px",
      alignItems: "center",
    },
  });

  return { styles, rectOptions };
};

export default useDoc4Styles;
