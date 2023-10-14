/* eslint-disable jsx-a11y/alt-text */
"use client";

import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import React from "react";
import useDoc9Styles from "../styles/useDoc9Styles";
import usePlaceholderImage from "../styles/usePlaceholderImage";
import useCvData from "../useCvData";
import useDocComponentsD from "./docComponents/useDocComponentsD";
import useDocComponentsC from "./docComponents/useDocComponentsC";
import useDoc8Styles from "../styles/useDoc8Styles";
import useDoc7Styles from "../styles/useDoc7Styles";

const useDoc9 = () => {
  const { imgSrc } = usePlaceholderImage();
  const { styles } = useDoc9Styles();
  const { styles: stylesFrom8 } = useDoc8Styles();
  const { styles: stylesFrom7 } = useDoc7Styles();
  const { sections, subsegments, theCurrentUser, fontSizeDeterminant } =
    useCvData();
  const { anySection } = useDocComponentsD();
  const { loadingBarLangAndProfile } = useDocComponentsC();

  const Doc9 = () => (
    <Document style={styles.document}>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.body}>
          <View style={styles.upperBody}>
            <View style={styles.leftUpperBody}>
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
            <View style={styles.rightUpperBody}>
              <View style={[styles.firstNameWrapper]}>
                <Text
                  style={[
                    stylesFrom8.userName,
                    {
                      marginTop: "50px",
                      color: "white",
                      fontWeight: "bold",
                      ...fontSizeDeterminant(
                        theCurrentUser!.firstname!.toUpperCase(),
                        8,
                        50
                      ),
                    },
                  ]}
                >
                  {theCurrentUser?.firstname?.toUpperCase()}
                </Text>
              </View>
              <Text
                style={[
                  stylesFrom8.userName,
                  {
                    ...fontSizeDeterminant(
                      theCurrentUser!.firstname!.toUpperCase(),
                      8,
                      50
                    ),
                  },
                ]}
              >
                {theCurrentUser?.lastname?.toUpperCase()}
              </Text>
              <Text style={[stylesFrom8.sectionContent]}>
                {theCurrentUser?.prospectiveTitle?.toUpperCase()}
              </Text>
            </View>
          </View>
          <View
            style={[styles.body, styles.bodyModification, styles.lowerBody]}
          >
            <View style={[styles.body, styles.upperLowerBody]}>
              {anySection(styles, theCurrentUser?.bio as string, "Profile")}
            </View>
            <View style={[styles.body, styles.lowerLowerBody]}>
              <View style={[styles.column, styles.leftLowerLowerBody]}>
                {["Education", "Skills", "Awards", "Hobbies"].map(
                  (sect, index) => (
                    <React.Fragment key={index}>
                      {sections.includes(sect) &&
                        anySection(
                          stylesFrom8,
                          subsegments.filter(
                            (seg) => seg.parentSection === sect
                          ),
                          sect
                        )}
                    </React.Fragment>
                  )
                )}
              </View>
              <View style={[styles.column, styles.rightLowerLowerBody]}>
                {["Work Experience", "Certifications"].map((sect, index) => (
                  <React.Fragment key={index}>
                    {sections.includes(sect) &&
                      anySection(
                        stylesFrom8,
                        subsegments.filter((seg) => seg.parentSection === sect),
                        sect
                      )}
                  </React.Fragment>
                ))}
                {sections.includes("Languages") &&
                  loadingBarLangAndProfile(
                    stylesFrom8,
                    subsegments.filter(
                      (subseg) => subseg.parentSection === "Languages"
                    ),
                    "LANGUAGES",
                    true
                  )}
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
        <View fixed style={stylesFrom7.contactLinkBar}>
          {[
            theCurrentUser?.email,
            theCurrentUser?.telephone,
            theCurrentUser?.personalLink,
          ].map((contact, index) => (
            <View key={index} style={stylesFrom7.contactLink}>
              <Text style={{ ...stylesFrom7.basicText, fontSize: "8px" }}>
                {contact}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  return { Doc9 };
};

export default useDoc9;
