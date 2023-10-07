"use client";
import { Font, StyleSheet } from "@react-pdf/renderer";

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
      padding: "10px 0 30px 0",
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

    //Letterhead content /////////////////////////
    letterHead: {
      width: "37.3%",
      height: "30%",
      left: "20px",
      top: "5%",
      position: "absolute",
      backgroundColor: "#ebecf0",
    },

    //Body////////////////////////////////////////
    body: {
      ...flexCol,
      padding: "0px 20px 20px",
      gap: "20px",
      width: "100%",
    },
    bodyPartition: {
      ...flexRow,
      width: "100%",
    },

    //upper body ( name and contact )
    upperBody: {
      position: "relative",
      gap: "20px",
    },
    leftUpperBody: {
      width: "65%",
      ...flexCol,
      alignItems: "baseline",
      justifyContent: "center",
    },
    nameAndTitleBox: {
      ...flexCol,
      alignItems: "flex-start",
      left: "10%",
      maxWidth: "100%",
    },
    rightUpperBody: {
      minHeight: "40px",
      flexGrow: 1.3,
      borderLeft: "1px solid black",
      ...flexCol,
      gap: "5px",
      justifyContent: "flex-end",
      paddingLeft: "20px",
    },

    //mid body ( user profile )
    profileDemarcation: {
      top: "20px",
      width: "100%",
      minHeight: "40px",
      justifyContent: "space-between",
      position: "relative",
    },
    leftProfileDemarcation: {
      width: "35.5%",
      position: "relative",
      left: "-20px",
      borderTop: "1px solid black",
      height: "100%",
    },
    rightProfileDemarcation: {
      width: "55%",
      ...flexCol,
      gap: "10px",
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },

    //lower body ( remaining sections )
    lowerBody: {
      position: "relative",
      top: "20px",
      justifyContent: "space-between",
    },
    column: {
      ...flexCol,
      gap: "20px",
      minHeight: "40px",
      // alignItems: "center",
    },
    leftLowerBody: {
      width: "40%",
    },
    rightLowerBody: {
      width: "55%",
    },

    //the skills element
    skillElement: {
      width: "100%",
      ...flexCol,
      gap: "7.5px",
    },
    skillUpper: {
      ...flexRow,
      justifyContent: "space-between",
      width: "100%",
    },
    skillLower: {
      width: "100%",
      ...flexRow,
      justifyContent: "center",
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

    //for merits
    meritContainer: {
      width: "95%",
      ...flexRow,
    },
    meritLeft: {
      width: "10px",
      backgroundColor: "#ebecf0",
      marginRight: "30px",
      height:"100%"
    },
    meritRight: {
      ...flexCol,
      gap: "5px",
      maxWidth:"80%",
    },

    //for jobs
    jobSection: {
      borderBottom: "1px solid black",
      paddingBottom: "15px",
    },
    forIsLast: {
      border: "none"
    },
    jobPartition: {
      ...flexCol,
      gap: "5px",
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
    jobParticulars: {
      maxWidth: "25%",
    },
    jobDescription: {
      paddingLeft: "30px",
      maxWidth: "50%",
    },

    //languages
    languageMap: {
      ...flexRow,
      flexWrap: "wrap",
      justifyContent: "space-between",
      maxWidth: "100%",
      gap: "5px",
    },
    oneLang: {
      ...flexRow,
      justifyContent: "flex-start",
      alignItems: "center",
      minHeight: "20px",
      gap:"5px",
      width: "40%",
      maxWidth: "40%",
      margin: "5px 0",
    },
    langWording: {
      ...flexCol,
      maxWidth: "70%",
      gap: "5px"
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
