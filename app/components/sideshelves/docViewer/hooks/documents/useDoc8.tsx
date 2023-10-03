"use client";

import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import React from "react";
import useDoc8Styles from "../styles/useDoc8Styles";
import usePlaceholderImage from "../styles/usePlaceholderImage";
import useCvData from "../useCvData";
import useDocComponentsC from "./docComponents/useDocComponentsC";

const useDoc8 = () => {
  const { imgSrc } = usePlaceholderImage();
  const { styles } = useDoc8Styles();
  const { sections, subsegments, theCurrentUser, fontSizeDeterminant } =
    useCvData();
  const {} = useDocComponentsC();

  const Doc8 = () => (
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

  return { Doc8 };
};

export default useDoc8;
