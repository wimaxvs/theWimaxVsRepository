"use client";

import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import React from "react";
import useDoc9Styles from "../styles/useDoc9Styles";
import usePlaceholderImage from "../styles/usePlaceholderImage";
import useCvData from "../useCvData";
import useDocComponentsD from "./docComponents/useDocComponentsD";
import useDocComponentsC from "./docComponents/useDocComponentsC";

const useDoc9 = () => {
  const { imgSrc } = usePlaceholderImage();
  const { styles } = useDoc9Styles();
  const { sections, subsegments, theCurrentUser, fontSizeDeterminant } =
    useCvData();
  const { anySection, circularDot } = useDocComponentsD();
  const { loadingBarLangAndProfile } = useDocComponentsC();

  const Doc9 = () => (
    <Document style={styles.document}>
      <Page size="A4" style={styles.page} wrap>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber }) => `${pageNumber}`}
          fixed
        />
      </Page>
    </Document>
  );

  return { Doc9 };
};

export default useDoc9;
