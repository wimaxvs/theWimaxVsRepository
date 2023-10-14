/* eslint-disable jsx-a11y/alt-text */
"use client";

import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import React from "react";
import useDoc11Styles from "../styles/useDoc11Styles";
import usePlaceholderImage from "../styles/usePlaceholderImage";
import useCvData from "../useCvData";
import useDocComponentsD from "./docComponents/useDocComponentsD";
import useDocComponentsC from "./docComponents/useDocComponentsC";
import useDoc8Styles from "../styles/useDoc8Styles";
import useDoc7Styles from "../styles/useDoc7Styles";
import useDoc10Styles from "../styles/useDoc10Styles";

const useDoc11 = () => {
  const { imgSrc } = usePlaceholderImage();
  const { styles } = useDoc11Styles();
  const { styles: stylesFrom10 } = useDoc10Styles();
  const { styles: stylesFrom8 } = useDoc8Styles();
  const { styles: stylesFrom7 } = useDoc7Styles();
  const { sections, subsegments, theCurrentUser, fontSizeDeterminant } =
    useCvData();
  const { anySection, anySectionBeta, circularDot } = useDocComponentsD();
  const { loadingBarLangAndProfile } = useDocComponentsC();

  const Doc11 = () => (
    <Document style={styles.document}>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.letterHead}></View>
        <View style={styles.body}>
          <View style={[styles.bodyPartition, styles.upperBody]}>
            <View style={styles.leftUpperBody}>
              <View
                style={[styles.leftUpperBodyBox, styles.nameBox, { gap: 0 }]}
              >
                <Text
                  style={[
                    stylesFrom8.userName,
                    {
                      fontWeight: "light",
                      color: "white",
                      ...fontSizeDeterminant(
                        theCurrentUser!.firstname!.toUpperCase(),
                        8,
                        35
                      ),
                    },
                  ]}
                >
                  {theCurrentUser?.firstname?.toUpperCase()}
                </Text>
                <Text
                  style={[
                    stylesFrom8.userName,
                    {
                      fontWeight: "bold",
                      color: "white",
                      ...fontSizeDeterminant(
                        theCurrentUser!.firstname!.toUpperCase(),
                        8,
                        35
                      ),
                    },
                  ]}
                >
                  {theCurrentUser?.lastname?.toUpperCase()}
                </Text>
                <Text
                  style={[
                    stylesFrom8.sectionContent,
                    { marginTop: "5px", fontWeight: "normal", color: "black" },
                  ]}
                >
                  {theCurrentUser?.prospectiveTitle?.toUpperCase()}
                </Text>
              </View>
              <View style={styles.offsetDivider}></View>
              <View style={[styles.leftUpperBodyBox, styles.contactsBox]}>
                <Text
                  style={[
                    styles.sectionContent,
                    {
                      marginBottom: "3px",
                      fontWeight: "semibold",
                      color: "white",
                    },
                  ]}
                >
                  {"CONTACT"}
                </Text>
                <Text style={styles.sectionContent}>
                  {theCurrentUser?.location}
                </Text>
                <Text style={styles.sectionContent}>
                  {theCurrentUser?.telephone}
                </Text>
                <Text style={styles.sectionContent}>
                  {theCurrentUser?.email}
                </Text>
                <Text style={styles.sectionContent}>
                  {theCurrentUser?.personalLink}
                </Text>
              </View>
            </View>
            <View style={styles.rightUpperBody}>
              <View style={[styles.imageSegment]}>
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
          </View>
          <View style={[styles.bodyPartition, styles.lowerBody]}>
            <View style={[styles.column, styles.lowerLeftColumn]}>
              {sections.includes("Skills") &&
                anySection(
                  stylesFrom8,
                  subsegments.filter((seg) => seg.parentSection === "Skills"),
                  "Skills",
                  styles,
                  true
                )}
              {["Education", "Awards"].map((sect, index) => (
                <React.Fragment key={index}>
                  {sections.includes(sect) &&
                    anySectionBeta(
                      stylesFrom8,
                      styles,
                      subsegments.filter((seg) => seg.parentSection === sect),
                      sect,
                      true
                    )}
                </React.Fragment>
              ))}
              {sections.includes("Hobbies") &&
                anySection(
                  stylesFrom8,
                  subsegments.filter((seg) => seg.parentSection === "Hobbies"),
                  "Hobbies",
                  styles,
                  true
                )}
            </View>
            <View style={[styles.column, styles.lowerRightColumn]}>
              {anySection(
                stylesFrom8,
                theCurrentUser?.bio as string,
                "Profile",
                styles,
                true
              )}
              {["Work Experience", "Certifications"].map((sect, index) => (
                <React.Fragment key={index}>
                  {sections.includes(sect) &&
                    anySection(
                      stylesFrom8,
                      subsegments.filter((seg) => seg.parentSection === sect),
                      sect,
                      styles,
                      true
                    )}
                </React.Fragment>
              ))}
              {["Languages"].map((sect, index) => (
                <React.Fragment key={index}>
                  {sections.includes(sect) &&
                    anySectionBeta(
                      stylesFrom8,
                      stylesFrom10,
                      subsegments.filter((seg) => seg.parentSection === sect),
                      sect,
                      true,
                      styles
                    )}
                </React.Fragment>
              ))}
            </View>
          </View>
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber }) => `${pageNumber}`}
          fixed
        />
      </Page>
    </Document>
  );

  return { Doc11 };
};

export default useDoc11;
