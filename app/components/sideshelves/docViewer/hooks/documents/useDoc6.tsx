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
import useDocComponents from "./docComponents/useDocComponents";
import useDocComponentsB from "./docComponents/useDocComponentsB";
import { user } from "@/app/hooks/useCvSubSegments";

const useDoc6 = () => {
  const { imgSrc } = usePlaceholderImage();
  const { styles, rectOptions } = useDoc5Styles();
  const { sections, subsegments, theCurrentUser, fontSizeDeterminant } =
    useCvData();
  const {} = useDocComponentsB();
  const returnFontSize = (word: string, size: number) =>
    fontSizeDeterminant(word as string, 8, size).fontSize;

  const Doc6 = () => (
    <Document style={styles.document}>
      <Page size="A4" style={styles.page} wrap>
        {/**The page decorators */}

        {/**The page's actual content */}
        <View style={styles.body}></View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber }) => `${pageNumber}`}
          fixed
        />
        <View fixed style={styles.contactLinkBar}>
          {[
            theCurrentUser?.email,
            theCurrentUser?.telephone,
            theCurrentUser?.personalLink,
          ].map((contact, index) => (
            <View key={index} style={styles.contactLink}>
              <Text style={{ ...styles.basicText, fontSize: "8px" }}>
                {contact}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  return { Doc6, returnFontSize };
};

export default useDoc6;
