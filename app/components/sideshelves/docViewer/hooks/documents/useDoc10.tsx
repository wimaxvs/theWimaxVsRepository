"use client";

import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import React from "react";
import useDoc10Styles from "../styles/useDoc10Styles";
import usePlaceholderImage from "../styles/usePlaceholderImage";
import useCvData from "../useCvData";
import useDocComponentsD from "./docComponents/useDocComponentsD";
import useDocComponentsC from "./docComponents/useDocComponentsC";
import useDoc8Styles from "../styles/useDoc8Styles";
import useDoc7Styles from "../styles/useDoc7Styles";

const useDoc10 = () => {
  const { imgSrc } = usePlaceholderImage();
  const { styles } = useDoc10Styles();
  const { styles: stylesFrom8 } = useDoc8Styles();
  const { styles: stylesFrom7 } = useDoc7Styles();
  const { sections, subsegments, theCurrentUser, fontSizeDeterminant } =
    useCvData();
  const { anySection, anySectionBeta, circularDot } = useDocComponentsD();
  const { loadingBarLangAndProfile } = useDocComponentsC();

  const Doc10 = () => (
    <Document style={styles.document}>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.letterHead}></View>
        <View style={styles.body}>
          <View style={[styles.bodyPartition, styles.upperBody]}>
            <View style={styles.leftUpperBody}>
              <View style={styles.nameAndTitleBox}>
                <Text
                  style={[
                    stylesFrom8.userName,
                    {
                      fontWeight: "bold",
                      marginTop: "50px",
                      ...fontSizeDeterminant(
                        theCurrentUser!.firstname!.toUpperCase(),
                        8,
                        60
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
                      ...fontSizeDeterminant(
                        theCurrentUser!.firstname!.toUpperCase(),
                        8,
                        60
                      ),
                    },
                  ]}
                >
                  {theCurrentUser?.lastname?.toUpperCase()}
                </Text>
                <Text
                  style={[stylesFrom8.sectionContent, { marginTop: "5px" }]}
                >
                  {theCurrentUser?.prospectiveTitle?.toUpperCase()}
                </Text>
              </View>
            </View>
            <View style={styles.rightUpperBody}>
              <Text style={styles.sectionContent}>
                {theCurrentUser?.location}
              </Text>
              <Text style={styles.sectionContent}>
                {theCurrentUser?.telephone}
              </Text>
              <Text style={styles.sectionContent}>{theCurrentUser?.email}</Text>
              <Text style={styles.sectionContent}>
                {theCurrentUser?.personalLink}
              </Text>
            </View>
          </View>
          <View style={[styles.bodyPartition, styles.profileDemarcation]}>
            <View style={styles.leftProfileDemarcation}></View>
            <View style={styles.rightProfileDemarcation}>
              {anySection(
                stylesFrom8,
                theCurrentUser?.bio as string,
                "Profile"
              )}
            </View>
          </View>
          <View style={[styles.bodyPartition, styles.lowerBody]}>
            <View style={[styles.column, styles.leftLowerBody]}>
              {["Education", "Skills", "Awards", "Hobbies"].map(
                (sect, index) => (
                  <React.Fragment key={index}>
                    {sections.includes(sect) &&
                      anySectionBeta(
                        stylesFrom8,
                        styles,
                        subsegments.filter((seg) => seg.parentSection === sect),
                        sect
                      )}
                  </React.Fragment>
                )
              )}
            </View>
            <View style={[styles.column, styles.rightLowerBody]}>
              {["Work Experience", "Certifications", "Languages"].map(
                (sect, index) => (
                  <React.Fragment key={index}>
                    {sections.includes(sect) &&
                      anySectionBeta(
                        stylesFrom8,
                        styles,
                        subsegments.filter((seg) => seg.parentSection === sect),
                        sect
                      )}
                  </React.Fragment>
                )
              )}
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

  return { Doc10 };
};

export default useDoc10;
