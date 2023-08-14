"use client";

import {
  Page,
  Text,
  View,
  Document,
  Image,
  Svg,
  Rect,
} from "@react-pdf/renderer";
import React from "react";
import useDoc5Styles from "../styles/useDoc5Styles";
import usePlaceholderImage from "../styles/usePlaceholderImage";
import useCvData from "../useCvData";
import useDocComponents from "./useDocComponents";
import { user } from "@/app/hooks/useCvSubSegments";

const useDoc5 = () => {
  const { imgSrc } = usePlaceholderImage();
  const { styles, rectOptions } = useDoc5Styles();
  const { sections, subsegments, theCurrentUser, fontSizeDeterminant } =
    useCvData();
  const { slBeta } =
    useDocComponents();

  const returnFontSize = (word: string, size: number) =>
    fontSizeDeterminant(word as string, 8, size).fontSize;

  const slBetaMap = (array: string[]) =>
    array.map((section, index) => (
      <React.Fragment key={index}>
        {slBeta(
          {
            sections,
            styles,
            rectOptions: rectOptions("lightPink", true),
            subsegments,
            desiredSection: section,
          },
          { titleStyle: "rightBodyProfileSectionTitleItself" }
        )}
      </React.Fragment>
    ));

  const Doc5 = () => (
    <Document style={styles.document}>
      <Page size="A4" style={styles.page}>
        
        <View style={styles.header}>
          <View style={styles.pictureAndNameInHeader}></View>
          
        </View>
        <View style={styles.body}>
          
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );

  return { Doc5 };
};

export default useDoc5;
