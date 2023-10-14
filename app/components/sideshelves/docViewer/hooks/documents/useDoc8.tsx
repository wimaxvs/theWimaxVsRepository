/* eslint-disable jsx-a11y/alt-text */
"use client";

import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import React from "react";
import useDoc8Styles from "../styles/useDoc8Styles";
import usePlaceholderImage from "../styles/usePlaceholderImage";
import useCvData from "../useCvData";
import useDocComponentsD from "./docComponents/useDocComponentsD";
import useDocComponentsC from "./docComponents/useDocComponentsC";

const useDoc8 = () => {
  const { imgSrc } = usePlaceholderImage();
  const { styles } = useDoc8Styles();
  const { sections, subsegments, theCurrentUser, fontSizeDeterminant } =
    useCvData();
  const { anySection, circularDot } = useDocComponentsD();
  const { loadingBarLangAndProfile, introspectSectionTitle } = useDocComponentsC();

  const Doc8 = () => (
    <Document style={styles.document}>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.body}>
          <View style={[styles.column, styles.leftBody]}>
            <View style={styles.upperLeftBody}>
              <View style={styles.leftUpperLeftBody}>
                <Text
                  style={[
                    styles.userName,
                    {
                      marginTop: "50px",
                      ...fontSizeDeterminant(
                        theCurrentUser!.firstname!.toUpperCase(),
                        8,
                        30
                      ),
                    },
                  ]}
                >
                  {theCurrentUser?.firstname?.toUpperCase()}
                </Text>
                <Text
                  style={[
                    styles.userName,
                    {
                      ...fontSizeDeterminant(
                        theCurrentUser!.firstname!.toUpperCase(),
                        8,
                        30
                      ),
                    },
                  ]}
                >
                  {theCurrentUser?.lastname?.toUpperCase()}
                </Text>
                <Text style={[styles.sectionContent]}>
                  {theCurrentUser?.prospectiveTitle?.toUpperCase()}
                </Text>
              </View>
              {circularDot(styles)}
              <View style={styles.rightUpperLeftBody}>
                {theCurrentUser?.image && (
                  <View
                    style={[
                      styles.imageSegment,
                      {
                        marginTop: "50px",
                      },
                    ]}
                  >
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
                <View style={styles.contacts}>
                  {introspectSectionTitle(styles, "CONTACT INFO")}
                  <Text style={[styles.sectionContent, {marginTop: "10px"}]}>
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
            </View>
            <View style={[styles.column, styles.lowerLeftBody]}>
              {["Work Experience", "Certifications"].map((sect, index) => (
                <React.Fragment key={index}>
                  {sections.includes(sect) &&
                    anySection(
                      styles,
                      subsegments.filter((seg) => seg.parentSection === sect),
                      sect
                    )}
                </React.Fragment>
              ))}
              {sections.includes("Languages") &&
                loadingBarLangAndProfile(
                  styles,
                  subsegments.filter(
                    (subseg) => subseg.parentSection === "Languages"
                  ),
                  "LANGUAGES",
                  true
                )}
            </View>
          </View>
          <View style={[styles.column, styles.rightBody]}>
            {circularDot(styles, true)}
            {anySection(styles, theCurrentUser?.bio as string, "Profile")}
            {["Education", "Skills", "Awards", "Hobbies"].map((sect, index) => (
              <React.Fragment key={index}>
                {sections.includes(sect) &&
                  anySection(
                    styles,
                    subsegments.filter((seg) => seg.parentSection === sect),
                    sect
                  )}
              </React.Fragment>
            ))}
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

  return { Doc8 };
};

export default useDoc8;
