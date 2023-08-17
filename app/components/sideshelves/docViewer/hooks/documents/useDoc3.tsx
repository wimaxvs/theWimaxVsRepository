"use client";

import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import React from "react";
import useDoc3Styles from "../styles/useDoc3Styles";
import usePlaceholderImage from "../styles/usePlaceholderImage";
import useCvData from "../useCvData";
import useDocComponents from "./docComponents/useDocComponents";

const useDoc3 = () => {
  const { imgSrc, PhoneIcon, LocationIcon, EmailIcon } = usePlaceholderImage();
  const { styles, rectOptions } = useDoc3Styles();
  const { sections, subsegments, theCurrentUser, fontSizes } = useCvData();
  const { miniSectionHeader, contactSubSeg, sl, rectSvg } = useDocComponents();

  const slMap = (
    array: string[],
    obj?: { isSl?: boolean; isAac?: boolean; header?: string }
  ) =>
    array.map((section, index) => (
      <React.Fragment key={index}>
        {sl(
          obj?.isSl as boolean,
          sections,
          styles,
          rectOptions(),
          subsegments,
          section,
          obj?.isAac,
          obj?.header
        )}
      </React.Fragment>
    ));

  const Doc3 = () => (
    <Document style={styles.document}>
      <Page size="A4" style={styles.page}>
        <View fixed style={styles.letterHead}>
          {rectSvg(200, 200, styles, "lightSalmon")}
          {rectSvg(200, 200, styles, "lightSalmon", "letterHeadLowerLeftRect")}
          {rectSvg(
            200,
            20,
            styles,
            "sageGreen",
            "letterHeadLowerRightRect",
            true
          )}
        </View>
        <View style={styles.header}>
          <View style={styles.nameSection}>
            <View style={styles.upperNameSection}>
              <Text
                style={{
                  ...styles.upperNameText,
                  fontSize: fontSizes.fnSizeB as unknown as string,
                }}
              >
                {theCurrentUser?.firstname}{" "}
              </Text>
              <Text
                style={{
                  ...styles.upperNameText,
                  fontSize: fontSizes.lnSizeB as unknown as string,
                }}
              >
                {theCurrentUser?.lastname}
              </Text>
              <Text
                style={{
                  ...styles.upperJobTitleTextContainer,
                  fontSize: fontSizes.ptSize as unknown as string,
                }}
              >
                {theCurrentUser?.prospectiveTitle}
              </Text>
            </View>
            <View style={styles.lowerNameSection}>
              {[
                { content: theCurrentUser?.telephone, icon: PhoneIcon },
                { content: theCurrentUser?.email, icon: EmailIcon },
                { content: theCurrentUser?.location, icon: LocationIcon },
              ].map((stuff, index) => {
                if (stuff.content) {
                  return (
                    <View key={index} style={styles.lowerContactTextContainer}>
                      <Image
                        style={styles.lowerContactTextIcon}
                        src={stuff.icon}
                      />
                      <Text
                        style={{
                          ...styles.lowerContactText,
                          fontSize: fontSizes.lesserPtSize as unknown as string,
                        }}
                      >
                        {stuff.content}
                      </Text>
                    </View>
                  );
                }
                return;
              })}
            </View>
          </View>

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
        </View>
        <View style={styles.body}>
          <View style={{ ...styles.leftColumn, ...styles.column }}>
            {/* profile summary  */}
            {theCurrentUser?.bio && (
              <View style={styles.leftColSection}>
                {miniSectionHeader("Profile", styles)}
                <Text
                  style={{
                    ...styles.lowerContactText,
                    fontSize: "10px",
                  }}
                >
                  {theCurrentUser?.bio}
                </Text>
              </View>
            )}

            {/* skills and Languages */}
            {slMap(["Skills", "Languages"], {
              isSl: true,
              isAac: false,
              header: "noHeader",
            })}

            {/* Hobbies */}
            {sections.indexOf("Hobbies") >= 0 && (
              <View style={styles.leftColSection}>
                {miniSectionHeader("Hobbies", styles)}
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
          <View style={{ ...styles.column, ...styles.rightColumn }}>
            {/**Work Experience and Education */}
            {slMap(["Work Experience", "Education"], {
              isSl: false,
              isAac: false,
              header: "noHeader",
            })}

            {/* certification and Awards */}
            <View break style={styles.awardsAndCertifications}>
              {slMap(["Certifications", "Awards"], {
                isSl: false,
                isAac: true,
                header: "noHeader",
              })}
            </View>
          </View>{" "}
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

  return { Doc3 };
};

export default useDoc3;
