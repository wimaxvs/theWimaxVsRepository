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
    introspectDetailedSection,
    loadingBarLangAndProfile,
    hobbySection
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
          <View style={styles.nameSectionBlock}>
            <View style={styles.theNameBox}>
              <Text style={styles.theNameItself}>
                {`${theCurrentUser?.firstname?.toUpperCase()} ${theCurrentUser?.lastname?.toUpperCase()}`}
              </Text>
            </View>
            <Text style={[styles.theNameItself, styles.theJobPosition]}>
              {`${theCurrentUser?.prospectiveTitle}`}
            </Text>
            {theCurrentUser?.image && (
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
            )}
          </View>

          {/**The page's lower section content */}
          <View style={styles.lowerBody}>
            {/**The page's left body */}
            <View style={[styles.column]}>
              {theCurrentUser?.bio &&
                loadingBarLangAndProfile(styles, theCurrentUser.bio, "PROFILE")}

              {sections.includes("Work Experience") &&
                introspectDetailedSection(
                  styles,
                  subsegments.filter(
                    (subseg) => subseg.parentSection === "Work Experience"
                  ),
                  "WORK EXPERIENCE"
                )}

              {sections.includes("Languages") &&
                loadingBarLangAndProfile(
                  styles,
                  subsegments.filter(
                    (subseg) => subseg.parentSection === "Languages"
                  ),
                  "LANGUAGES"
                )}
            </View>
            {/**The page's body divider */}
            <View style={styles.divider}></View>
            {/**The page's right body */}
            <View style={[styles.column]}>
              {["Education", "Certifications", "Awards"].map(
                (string, index) => {
                  return (
                    <View key={index} style={{ width: "100%" }}>
                      {sections.includes(string) &&
                        introspectDetailedSection(
                          styles,
                          subsegments.filter(
                            (subseg) => subseg.parentSection === string
                          ),
                          string.toUpperCase()
                        )}
                    </View>
                  );
                }
              )}

              {sections.includes("Skills") &&
                loadingBarLangAndProfile(
                  styles,
                  subsegments.filter(
                    (subseg) => subseg.parentSection === "Skills"
                  ),
                  "SKILLS"
                )}
              {sections.includes("Hobbies") &&
                hobbySection(
                  styles,
                  subsegments.filter(
                    (subseg) => subseg.parentSection === "Hobbies"
                  ),
                  "HOBBIES"
                )}
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

  return { Doc7, returnFontSize };
};

export default useDoc7;
