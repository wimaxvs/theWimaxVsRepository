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
import useDoc3Styles from "../styles/useDoc3Styles";
import usePlaceholderImage from "../styles/usePlaceholderImage";
import useCvData from "../useCvData";
import useDoc2Components, {
  rectOptionsExtension,
  userExtension,
} from "./useDoc2Components";

const useDoc3 = () => {
  const { imgSrc } = usePlaceholderImage();
  const { styles, rectOptions } = useDoc3Styles();
  const { sections, subsegments, theCurrentUser, fontSizes } = useCvData();
  const { sectionHeader, contactSubSeg, sl, rectSvg } = useDoc2Components();

  const Doc3 = () => (
    <Document style={styles.document}>
      <Page size="A4" style={styles.page}>
        <View fixed style={styles.letterHead}>
          {rectSvg(200, 200, styles, "lightSalmon")}
          {rectSvg(200, 200, styles, "lightSalmon", "letterHeadLowerLeftRect")}
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

  return { Doc3 };
};

export default useDoc3;
