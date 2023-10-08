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
import useDoc2Styles from "../styles/useDoc2Styles";
import usePlaceholderImage from "../styles/usePlaceholderImage";
import useCvData from "../useCvData";
import useDocComponents, {
  rectOptionsExtension,
  userExtension,
} from "./docComponents/useDocComponents";

const useDoc2 = () => {
  const { imgSrc } = usePlaceholderImage();
  const { styles, rectOptions } = useDoc2Styles();
  const { sections, subsegments, theCurrentUser, fontSizes } = useCvData();
  const { sectionHeader, contactSubSeg, sl } = useDocComponents();

  const Doc2 = () => (
    <Document style={styles.document}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
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
          <View style={styles.nameSection}>
            <View style={styles.upperNameSection}>
              <Svg width="60" height="150" style={styles.upperNameRect}>
                <Rect {...rectOptions} />
              </Svg>
              <View style={styles.upperNameTextContainer}>
                <Text
                  style={{
                    ...styles.upperNameText,
                    fontSize: fontSizes.fnSize as unknown as string,
                  }}
                >
                  {theCurrentUser?.firstname?.toUpperCase()}{" "}
                </Text>
                <Text
                  style={{
                    ...styles.upperNameText,
                    fontSize: fontSizes.lnSize as unknown as string,
                  }}
                >
                  {theCurrentUser?.lastname?.toUpperCase()}
                </Text>
              </View>
              <Text
                style={{
                  ...styles.upperJobTitleTextContainer,
                  fontSize: fontSizes.ptSize as unknown as string,
                }}
              >
                {theCurrentUser?.prospectiveTitle}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.body}>
          <View style={{ ...styles.leftColumn, ...styles.column }}>
            {/* contacts */}
            <View style={styles.leftColSection}>
              {sectionHeader(
                "Contact",
                styles,
                rectOptions as unknown as rectOptionsExtension
              )}
              {["Telephone", "Email", "Location"].map(
                (section: string, index: number) =>
                  contactSubSeg(
                    section,
                    index,
                    theCurrentUser as userExtension,
                    styles
                  )
              )}
            </View>

            {/* profile summary  */}
            {theCurrentUser?.bio && (
              <View style={styles.leftColSection}>
                {sectionHeader(
                  "Summary",
                  styles,
                  rectOptions as unknown as rectOptionsExtension
                )}
                <Text style={styles.sectionText}>{theCurrentUser?.bio}</Text>
              </View>
            )}

            {/* skills */}
            {sl(true, sections, styles, rectOptions, subsegments, "Skills")}

            {/* Languages */}
            {sl(true, sections, styles, rectOptions, subsegments, "Languages")}

            {/* Hobbies */}
            {sections.indexOf("Hobbies") >= 0 && (
              <View style={styles.leftColSection}>
                {sectionHeader(
                  "Hobbies",
                  styles,
                  rectOptions as unknown as rectOptionsExtension
                )}
                {subsegments
                  ?.filter((subseg) => subseg.parentSection === "Hobbies")
                  .map((subseg, index) => (
                    <Text key={index} style={styles.sectionText}>
                      {subseg.title}
                    </Text>
                  ))}
              </View>
            )}
          </View>
          <View style={{ ...styles.rightColumn, ...styles.column }}>
            {/**Work Experience */}
            {sl(
              false,
              sections,
              styles,
              rectOptions,
              subsegments,
              "Work Experience"
            )}

            {/**Education */}
            {sl(false, sections, styles, rectOptions, subsegments, "Education")}

            <View  style={styles.awardsAndCertifications}>
              {/* certification  */}
              {sl(
                false,
                sections,
                styles,
                rectOptions,
                subsegments,
                "Certifications",
                true
              )}
              {/* Awards  */}
              {sl(
                false,
                sections,
                styles,
                rectOptions,
                subsegments,
                "Awards",
                true
              )}
            </View>
          </View>
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

  return { Doc2 };
};

export default useDoc2;
