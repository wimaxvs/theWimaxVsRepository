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
import useDocComponentsC from "./docComponents/useDocComponentsC";
import { user } from "@/app/hooks/useCvSubSegments";

const useDoc6 = () => {
  const { imgSrc, LocationIcon } = usePlaceholderImage();
  const { styles } = useDoc6Styles();
  const { sections, subsegments, theCurrentUser, fontSizeDeterminant } =
    useCvData();
  const {
    theLineBelowASection,
    theContentInWorkSection,
    mapLanguageAbilityToCEFR,
  } = useDocComponentsC();
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
            >
              {/* The current user's Merits */}
              {["Education", "Certifications", "Awards"].map(
                (title, index) =>
                  sections.indexOf(title) >= 0 && (
                    <View
                      key={index}
                      style={[styles.summarySectionContent, styles.workSection]}
                    >
                      <Text style={[styles.upperNameText, styles.sectionTitle]}>
                        {title.toUpperCase()}
                      </Text>
                      {theContentInWorkSection(
                        styles,
                        subsegments.filter(
                          (subseg) => subseg.parentSection === title
                        ),
                        title
                      )}
                      {theLineBelowASection(styles)}
                    </View>
                  )
              )}
              {/* The current user's Skills */}
              {sections.indexOf("Skills") >= 0 && (
                <View
                  style={[styles.summarySectionContent, styles.workSection]}
                >
                  <Text style={[styles.upperNameText, styles.sectionTitle]}>
                    {"Skills"}
                  </Text>
                  {subsegments.filter(
                    (subseg) => subseg.parentSection === "Skills"
                  ) &&
                    subsegments
                      .filter((subseg) => subseg.parentSection === "Skills")
                      ?.map((line, index) => (
                        <View
                          key={index}
                          style={[styles.titleWithDot, styles.workContent]}
                        >
                          <Text style={styles.sectionContent}>
                            {line?.title}
                          </Text>
                        </View>
                      ))}
                  {theLineBelowASection(styles)}
                </View>
              )}
            </View>

            <View
              style={[styles.column, styles.rightColumn, { height: "100%" }]}
            >
              {/* The current user's bio/profile summary */}
              {theCurrentUser?.bio && (
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
              )}

              {/* The current user's work experience */}
              {sections.indexOf("Work Experience") >= 0 && (
                <View
                  style={[styles.summarySectionContent, styles.workSection]}
                >
                  <Text style={[styles.upperNameText, styles.sectionTitle]}>
                    {"WORK EXPERIENCE"}
                  </Text>
                  {theContentInWorkSection(
                    styles,
                    subsegments.filter(
                      (subseg) => subseg.parentSection === "Work Experience"
                    )
                  )}
                  {theLineBelowASection(styles)}
                </View>
              )}

              {/* The current user's spoken languages */}
              {sections.indexOf("Languages") >= 0 && (
                <View
                  style={[styles.summarySectionContent, styles.workSection]}
                >
                  <Text style={[styles.upperNameText, styles.sectionTitle]}>
                    {"LANGUAGES"}
                  </Text>
                  <View style={styles.langs}>
                    {subsegments
                      .filter((subseg) => subseg.parentSection === "Languages")
                      .sort((a, b) => a?.order! - b?.order!)
                      .map((language, index) => (
                        <View key={index} style={styles.lang}>
                          <Text
                            style={[
                              styles.innerWorkSectionTitle,
                              { left: "0" },
                            ]}
                          >
                            {language.title}
                          </Text>
                          <Text
                            style={[
                              styles.innerWorkSectionTitle,
                              styles.sectionSubtitle,
                              { left: "0" },
                            ]}
                          >
                            {mapLanguageAbilityToCEFR(language.order as number)}
                          </Text>
                        </View>
                      ))}
                  </View>
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
