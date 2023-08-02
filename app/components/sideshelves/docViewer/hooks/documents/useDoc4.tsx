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
import useDoc4Styles from "../styles/useDoc4Styles";
import usePlaceholderImage from "../styles/usePlaceholderImage";
import useCvData from "../useCvData";
import useDocComponents, {
  rectOptionsExtension,
  userExtension,
} from "./useDocComponents";

const useDoc4 = () => {
  const { imgSrc, PhoneIcon, LocationIcon, EmailIcon } = usePlaceholderImage();
  const { styles } = useDoc4Styles();
  const { sections, subsegments, theCurrentUser, fontSizeDeterminant } =
    useCvData();
  const { doc4Edu } = useDocComponents();

  const returnFontSize = (word: string, size: number) =>
    fontSizeDeterminant(word as string, 8, size).fontSize;

  const Doc4 = () => (
    <Document style={styles.document}>
      <Page size="A4" style={styles.page}>
        <View style={styles.body}>
          <View style={{ ...styles.body, ...styles.leftColumn }}>
            <View style={styles.leftColumnLinkBox}>
              {"theCurrentUser.linkedIn"}
            </View>
            <View style={styles.upperNameSection}>
              <Text
                style={{
                  ...styles.upperNameText,
                  fontSize: returnFontSize(
                    theCurrentUser?.firstname as string,
                    25
                  ),
                }}
              >
                {theCurrentUser?.firstname?.toUpperCase()}{" "}
              </Text>
              <Text
                style={{
                  ...styles.upperNameText,
                  fontSize: returnFontSize(
                    theCurrentUser?.lastname as string,
                    25
                  ),
                }}
              >
                {theCurrentUser?.lastname?.toUpperCase()}
              </Text>
              <Text
                style={{
                  ...styles.upperJobTitleTextContainer,
                  fontSize: returnFontSize(
                    theCurrentUser?.prospectiveTitle as string,
                    15
                  ),
                }}
              >
                {theCurrentUser?.prospectiveTitle?.toUpperCase()}
              </Text>
            </View>{" "}
            <View style={styles.imageSection}>
              <Image
                src={
                  theCurrentUser?.image
                    ? (theCurrentUser?.image as string)
                    : imgSrc
                }
                style={styles.imageItself}
              />
            </View>
            {doc4Edu(styles, sections, "Education")}
          </View>
          <View style={{ ...styles.body, ...styles.rightColumn }}></View>
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

  return { Doc4 };
};

export default useDoc4;
