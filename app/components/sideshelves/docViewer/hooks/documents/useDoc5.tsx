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

const useDoc5 = () => {
  const { imgSrc } = usePlaceholderImage();
  const { styles, rectOptions } = useDoc5Styles();
  const { sections, subsegments, theCurrentUser, fontSizeDeterminant } =
    useCvData();
  const {
    bioData,
    profileSummary,
    doc5TotemPole,
    doc5skills,
    doc5languages,
    doc5Certifications,
  } = useDocComponentsB();
  const returnFontSize = (word: string, size: number) =>
    fontSizeDeterminant(word as string, 8, size).fontSize;

  const Doc5 = () => (
    <Document style={styles.document}>
      <Page size="A4" style={styles.page} wrap>
        {/**The page decorators */}
        <View style={[styles.header, ]}></View>
        {/**Apparently in Header */}
        <View style={styles.nameInHeader}>
          <Text
            style={{
              ...styles.upperNameText,
              fontSize: returnFontSize(theCurrentUser?.firstname as string, 35),
            }}
          >
            {theCurrentUser?.firstname?.toUpperCase()}{" "}
          </Text>
          <Text
            style={{
              ...styles.upperNameText,
              fontSize: returnFontSize(theCurrentUser?.lastname as string, 35),
            }}
          >
            {theCurrentUser?.lastname?.toUpperCase()}
          </Text>
          <Text
            style={{
              ...styles.upperJobTitleTextContainer,
              fontSize: returnFontSize(
                theCurrentUser?.prospectiveTitle as string,
                20
              ),
            }}
          >
            {theCurrentUser?.prospectiveTitle?.toUpperCase()}
          </Text>
        </View>
        <View fixed style={styles.colBehindLeftCol}></View>
        <View style={styles.leftCol}>
          {/**User Image view */}
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
          <View style={styles.blinderDiv}></View>
        </View>

        {/**The page's actual content */}
        <View style={styles.body}>
          <View style={{ ...styles.column, ...styles.leftColumn }}>
            {bioData(styles, theCurrentUser as user)}

            {/**The profile summary */}
            {profileSummary(styles, theCurrentUser as user)}

            {/* *The user education  */}
            {doc5TotemPole(subsegments, styles, "Education", sections)}

            {/* *The user awards  */}

            {/* *The user hobbies  */}
            {sections.indexOf("Hobbies") >= 0 &&
              doc5Certifications(subsegments, styles, "Hobbies", false)}

          </View>
          <View style={{ ...styles.column, ...styles.rightColumn }}>
            {/* *The user education  */}
            {doc5TotemPole(
              subsegments,
              styles,
              "Work Experience",
              sections,
              true
            )}

            {/* *The user skills  */}
            {doc5skills(subsegments, styles, "Skills", true)}

            {/* *The user languages and certificates */}
            <View style={styles.doc5LangAndCert}>
              {sections.indexOf("Languages") >= 0 && (
                <View style={{ width: "50%" }}>
                  {doc5languages(subsegments, styles, "Languages", true)}
                </View>
              )}
              {sections.indexOf("Certifications") >= 0 && (
                <View style={{ width: "50%" }}>
                  {doc5Certifications(
                    subsegments,
                    styles,
                    "Certifications",
                    true
                  )}
                </View>
              )}
            </View>
          </View>
        </View>
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

  return { Doc5, returnFontSize };
};

export default useDoc5;
