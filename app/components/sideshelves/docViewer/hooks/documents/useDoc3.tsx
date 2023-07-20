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
import useDoc3Styles from "../styles/useDoc3Styles";
import usePlaceholderImage from "../styles/usePlaceholderImage";
import useCvData from "../useCvData";
import useDoc2Components, {
  rectOptionsExtension,
  userExtension,
} from "./useDoc2Components";

const useDoc3 = () => {
  const { imgSrc, PhoneIcon, LocationIcon, EmailIcon } = usePlaceholderImage();
  const { styles } = useDoc3Styles();
  const { sections, subsegments, theCurrentUser, fontSizes } = useCvData();
  const { sectionHeader, contactSubSeg, sl, rectSvg } = useDoc2Components();

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
