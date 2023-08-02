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

const colorPalette = {
  lightYellow: "#FEF4C0",
  orangeYellow: "#FDB10B",
  lightGrey:"#d3d3d3",

  titleText: "#222",
  subtitleText: "#333",
  contentText: "#444",
  dateText: "#555",
};

const flexRow: {} = {
  display: "flex",
  flexDirection: "row"
}
const flexCol: {} = {
  display: "flex",
  flexDirection: "column"
}

const useDoc2Styles = () => {
  const rectOptions = {
    width: "100%",
    height: "100%",
    fill: colorPalette.lightYellow,
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
    header: {
      ...flexRow,
      width: "100%",
      height: "25%",
    },
    imageSection: {
      height: "100%",
      width: "40%",
      ...flexCol,
      alignItems: "center",
      justifyContent: "center",
    },
    imageItself: {
      borderRadius: "50%",
      objectFit: "cover",
      height: "185px",
      width: "185px",
    },
    nameSection: {
      width: "60%",
      height: "100%",
    },
    upperNameSection: {
      position: "relative",
      ...flexCol,
      justifyContent: "flex-start",
      alignItems: "flex-start",
      height: "100%",
    },
    upperNameRect: {
      position: "absolute",
      top: "0",
    },
    upperNameTextContainer: {
      top: "20px",
      left: "20px",
      width: "100%",
      maxWidth: "100%",
      ...flexCol,
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
    upperNameText: {
      fontFamily: "Unisans",
      fontSize: "60px",
      padding: 0,
    },
    upperJobTitleTextContainer: {
      marginTop: "15px",
      marginLeft: "20px",
      paddingRight: "10px",
      color: colorPalette.contentText,
      fontWeight: 500,
      fontFamily: "Roboto",
    },

    body: {
      ...flexRow,
      gap: "20px",
      padding: "0 15px",
    },
    column: {
      padding: "15px 0px",
      ...flexCol,
    },
    leftColumn: {
      flexGrow: 1,
      maxWidth: "30%",
    },
    rightColumn: {
      flexGrow: 2,
      maxWidth: "65%",
    },
    leftColSection: {
      ...flexCol,
      alignItems: "flex-start",
      gap: "7.5px",
      marginBottom: "25px",
    },
    narrowLeftColSection: {
      maxWidth: "45%",
    },
    eduSection: {
      ...flexRow,
      gap: "10px",
      flexWrap: "wrap",
      maxWidth: "95%"
    },
    forEdu: {
      maxWidth: "50%",
    },
    forLoadingBar: {
      gap: "3px",
      marginBottom: "10px",
    },
    sectionHeader: {
      position: "relative",
      height: "30px",
      width: "100%",
      ...flexRow,
      alignItems: "flex-end",
      padding: "0 0 0 10px",
    },
    sectionHeaderTitle: {
      fontFamily: "Roboto",
      letterSpacing: "2px",
      color: colorPalette.titleText,
    },
    narrowSectionHeaderTitle: {
      fontSize: "14px"
    },
    sectionText: {
      fontSize: "12px",
      color: colorPalette.contentText,
      padding: "0 0 0 10px",
    },
    augmentedSectionText: {
      fontSize: "12px",
      color: colorPalette.contentText,
      padding: "0 0 0 10px",
    },
    forTitleDate: {
      fontSize: "10px",
    },
    contactSubSeg: {
      ...flexCol,
      alignItems: "flex-start",
      gap: "5px",
    },
    contactSubSegTitle: {
      fontSize: "15px",
      fontFamily: "Roboto",
      color: colorPalette.subtitleText,
      padding: "0 0 0 10px",
    },
    loadingBar: {
      ...flexRow,
      alignItems: "center",
      padding: "0 0 0 10px",
    },
    outerBar: {
      width: "80%",
      height: 10,
      backgroundColor: `${colorPalette.lightGrey}`,
    },
    innerBar: {
      height: "100%",
      backgroundColor: colorPalette.lightYellow,
    },
    titleAndDate: {
      ...flexRow,
      gap: "5px",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    sectionContent: {
      ...flexCol,
      gap: "5px",
      alignItems: "flex-start",
      padding: "10px 0 0 5px",
    },
    awardsAndCertifications: {
      ...flexRow,
      gap: "25px",
      justifyContent: "flex-start",
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

export default useDoc2Styles;
