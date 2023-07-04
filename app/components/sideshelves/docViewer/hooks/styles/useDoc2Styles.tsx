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
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "10px",
    },
    page: {
      paddingBottom: 65,
    },
    header: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: "25%",
    },
    imageSection: {
      height: "100%",
      width: "40%",
      display: "flex",
      flexDirection: "column",
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
      display: "flex",
      flexDirection: "column",
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
      display: "flex",
      flexDirection: "column",
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
      display: "flex",
      flexDirection: "row",
      gap: "20px",
      padding: "0 15px",
    },
    column: {
      padding: "15px 0px",
      display: "flex",
      flexDirection: "column",
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
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "7.5px",
      marginBottom: "25px",
    },
    forLoadingBar: {
      gap: "3px",
      marginBottom: "0px",
    },
    sectionHeader: {
      position: "relative",
      height: "30px",
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-end",
      padding: "0 0 0 10px",
    },
    sectionHeaderTitle: {
      fontFamily: "Roboto",
      letterSpacing: "2px",
      color: colorPalette.titleText,
    },
    sectionText: {
      fontSize: "12px",
      color: colorPalette.contentText,
      padding: "0 0 0 10px",
    },
    forTitleDate: {
      padding: "0 0 0 0px",
    },
    contactSubSeg: {
      display: "flex",
      flexDirection: "column",
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
      display: "flex",
      flexDirection: "row",
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
      display: "flex",
      flexDirection: "row",
      gap: "5px",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    sectionContent: {
      display: "flex",
      flexDirection: "column",
      gap: "5px",
      alignItems: "flex-start",
      padding: "10px 0 0 5px",
      
    },
  });

  return { styles, rectOptions };
};

export default useDoc2Styles;
