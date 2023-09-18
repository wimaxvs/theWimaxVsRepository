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
import useDoc6Styles from "../styles/useDoc6Styles";
import usePlaceholderImage from "../styles/usePlaceholderImage";
import useCvData from "../useCvData";
import useDocComponents from "./docComponents/useDocComponents";
import useDocComponentsB from "./docComponents/useDocComponentsB";
import { user } from "@/app/hooks/useCvSubSegments";

const useDoc6 = () => {
  const { imgSrc, LocationIcon } = usePlaceholderImage();
  const { styles, rectOptions } = useDoc6Styles();
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
        <View style={styles.body}>
          {/**The page's upper section content */}
          <View style={styles.imageAndNameSection}>
            <View style={styles.nameAndTitleSegment}>
              <Text
                style={{
                  ...styles.upperJobTitleTextContainer,
                  fontSize: returnFontSize(
                    theCurrentUser?.prospectiveTitle as string,
                    40
                  ),
                }}
              >
                {theCurrentUser?.prospectiveTitle}
              </Text>
              <View style={styles.fullName}>
                <Text
                  style={{
                    ...styles.upperNameText,
                    fontSize: returnFontSize(
                      theCurrentUser?.lastname as string,
                      35
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
                      35
                    ),
                  }}
                >
                  {theCurrentUser?.lastname?.toUpperCase()}
                </Text>
              </View>
              <View style={styles.locationIconText}>
                <Image style={styles.lowerContactTextIcon} src={LocationIcon} />
                <Text
                  style={{
                    ...styles.upperJobTitleTextContainer,
                    fontSize: returnFontSize(
                      theCurrentUser?.prospectiveTitle as string,
                      40
                    ),
                  }}
                >
                  {theCurrentUser?.location}
                </Text>
              </View>
            </View>
            <View style={styles.imageSegment}>
              <Image
                src={
                  theCurrentUser?.image
                    ? (theCurrentUser?.image as string)
                    : imgSrc
                }
                style={styles.imageItself}
              />
            </View>
          </View>
          <View style={styles.lowerBody}>
            <View
              style={[styles.column, styles.leftColumn, { height: "100%" }]}
            ></View>
            <View
              style={[styles.column, styles.rightColumn, { height: "100%" }]}
            >
              <View style={[styles.summarySection]}>
                <View style={styles.summarySectionDot}></View>
                <View style={styles.summarySectionContent}>
                  <Text style={[styles.upperNameText, styles.sectionTitle]}>
                    {"PROFILE"}
                  </Text>
                  <Text style={styles.sectionContent}>
                    {theCurrentUser?.bio}
                  </Text>
                  <View style={styles.summarySectionDivider}></View>
                </View>
              </View>
            </View>
          </View>
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

  return { Doc6, returnFontSize };
};

export default useDoc6;
