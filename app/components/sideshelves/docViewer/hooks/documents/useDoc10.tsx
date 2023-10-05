"use client";

import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import React from "react";
import useDoc10Styles from "../styles/useDoc10Styles";
import usePlaceholderImage from "../styles/usePlaceholderImage";
import useCvData from "../useCvData";
import useDocComponentsD from "./docComponents/useDocComponentsD";
import useDocComponentsC from "./docComponents/useDocComponentsC";
import useDoc8Styles from "../styles/useDoc8Styles";
import useDoc7Styles from "../styles/useDoc7Styles";

const useDoc10 = () => {
  const { imgSrc } = usePlaceholderImage();
  const { styles } = useDoc10Styles();
  const { styles: stylesFrom8 } = useDoc8Styles();
  const { styles: stylesFrom7 } = useDoc7Styles();
  const { sections, subsegments, theCurrentUser, fontSizeDeterminant } =
    useCvData();
  const { anySection, circularDot } = useDocComponentsD();
  const { loadingBarLangAndProfile } = useDocComponentsC();

  const Doc10 = () => (
    <Document style={styles.document}>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.body}>
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber }) => `${pageNumber}`}
          fixed
        />
        
      </Page>
    </Document>
  );

  return { Doc10 };
};

export default useDoc10;
