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

    //Body////////////////////////////////////////
    body: {
      ...flexCol,
      padding: "0px 20px 20px",
      gap: "20px",
      width: "100%",
    },

   
    column: {
      ...flexCol,
      gap: "20px",
      minHeight: "40px",
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
