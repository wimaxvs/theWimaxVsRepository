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
import useDoc7Styles from "../styles/useDoc7Styles";
import usePlaceholderImage from "../styles/usePlaceholderImage";
import useCvData from "../useCvData";
import useDocComponents from "./docComponents/useDocComponents";
import useDocComponentsC from "./docComponents/useDocComponentsC";
import { user } from "@/app/hooks/useCvSubSegments";

const useDoc7 = () => {
  const { imgSrc, LocationIcon } = usePlaceholderImage();
  const { styles, rectOptions } = useDoc7Styles();
  const { sections, subsegments, theCurrentUser, fontSizeDeterminant } =
    useCvData();
  const {
    mapLanguageAbilityToCEFR,
  } = useDocComponentsC();
  const returnFontSize = (word: string, size: number) =>
    fontSizeDeterminant(word as string, 8, size).fontSize;

  const Doc7 = () => (
    <Document style={styles.document}>
      <Page size="A4" style={styles.page} wrap>
        {/**The page decorators */}

        {/**The page's actual content */}
        <View style={styles.body}>
          {/**The page's upper section content */}
          
          
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber }) => `${pageNumber}`}
          fixed
        />
        {/**The contact content at the bottom of the page */}
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

  return { Doc7, returnFontSize };
};

export default useDoc7;
