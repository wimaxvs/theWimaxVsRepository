import { StyleSheet, Font } from "@react-pdf/renderer";

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

const useDoc1Styles = () => {
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
      // width: "70%",
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
    upperSection: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: colorPalette.grey,
      height: "22.5%",
      position: "relative",
    },
    imageSection: {
      width: "30%",
      height: "100%",
      marginLeft: "25px",
      backgroundColor: colorPalette.beige,
    },
    boxInBetween: {
      position: "absolute",
      width: "25px",
      height: "25px",
      aspectRatio: "1/1",
      backgroundColor: colorPalette.brown,
      top: "50%",
      left: "32.5%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    textInBoxInBetween: {
      fontSize: "12px",
      color: colorPalette.contentText,
    },
    innerUpperSection: {
      left: "37.5%",
      width: "60%",
      height: "18.33%",
      display: "flex",
      flexDirection: "column",
    },
    innerUpperSectionText: {
      display: "flex",
      flexDirection: "column",
      paddingLeft: "10px",
      paddingRight: "10px",
      paddingTop: "20px",
      paddingBottom: "10px",
      gap: "10px",
    },
    nameText: {
      fontWeight: 700,
      fontFamily: "Roboto",
      color: colorPalette.titleText,
    },
    titleText: {
      fontWeight: 500,
      fontFamily: "Roboto",
      color: colorPalette.subtitleText,
    },
    subtitleText: {
      fontWeight: 300,
      fontSize: "13px",
      fontFamily: "Roboto",
      color: colorPalette.subtitleText,
    },
    contentText: {
      fontWeight: 100,
      fontSize: "10px",
      color: colorPalette.contentText,
    },
    coloredContentText: {
      color: colorPalette.subtitleText,
    },
    smallerContentText: {
      fontSize: "8px",
    },
    biggerContentText: {
      fontWeight: 100,
      fontSize: "12px",
      color: colorPalette.subtitleText,
    },
    dateText: {
      fontWeight: 100,
      fontSize: "8px",
      color: colorPalette.dateText,
    },
    smallerDateText: {
      fontSize: "6px",
    },
    leftSection: {
      height: "80%",
      marginLeft: "25px",
      width: "30%",
      backgroundColor: colorPalette.grey,
    },
    downloadLink: {
      width: "50%",
      borderRadius: "12px",
      backgroundColor: "#4283ad",
      padding: "12px",
      color: "white",
      fontWeight: 500,
      marginLeft: "10px",
      marginBottom: "10px"
    },

    textContainer: {
      height: "100%",
      width: "100%",
      position: "absolute",
    },

    innerLowerSection: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
    },

    cesiContainer: {
      width: "30%",
      height: "77.5%",
      marginLeft: "25px",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      paddingTop: "15px",
    },
    cesiSection: {
      width: "100%",
      paddingLeft: "10px",
      paddingRight: "10px",
      display: "flex",
      flexDirection: "column",
      gap: "5px",
    },
    eduSegment: {
      gap: "8px",
      marginBottom: "5px",
    },
    smallerEduSegment: {
      gap: "3px",
      marginBottom: "5px",
    },
    smallestEduSegment: {
      gap: 0,
      marginBottom: "5px",
    },
    dateToFromView: {
      display: "flex",
      flexDirection: "row",
    },

    clawContainer: {
      width: "60%",
      height: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      top: 17.5,
      // paddingTop: "15px",

      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    langAwardsCertSection: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
    },
    clawSection: {
      paddingLeft: "10px",
      paddingRight: "10px",
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      gap: "5px",
      maxWidth: "33%",
    },
    workContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
    },
    workSection: {
      paddingLeft: "10px",
      gap: "5px",
    },

  });

  return { styles, dividerOptions };
};

export default useDoc1Styles;
