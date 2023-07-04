"use client";

import {
  Page,
  Text,
  View,
  Document,
  Image,
  Svg,
  Line,
} from "@react-pdf/renderer";
import React from "react";
import useDoc1Styles from "../styles/useDoc1Styles";
import useCvData from "../useCvData";
import usePlaceholderImage from "../styles/usePlaceholderImage";

const useDoc1 = () => {
  const {imgSrc} = usePlaceholderImage();
  const {styles} = useDoc1Styles();
  const {dividerOptions} = useDoc1Styles();
  const { sections, subsegments, theCurrentUser } = useCvData();

  const Doc1 = () => (
    <Document style={styles.document}>
      <Page size="A4" style={styles.page}>
        {/*Template Styling*/}
        <View style={styles.upperSection}>
          <Image
            src={
              theCurrentUser?.image ? (theCurrentUser?.image as string) : imgSrc
            }
            style={styles.imageSection}
          ></Image>

          <View style={styles.boxInBetween}>
            <Text style={styles.textInBoxInBetween}>
              {theCurrentUser?.firstname?.[0]! + theCurrentUser?.lastname?.[0]}
            </Text>
          </View>
        </View>
        <View style={styles.leftSection}></View>
        {/*Template Styling*/}
        {/*Text Layering*/}
        <View style={styles.textContainer}>
          <View style={styles.innerUpperSection}>
            <View style={styles.innerUpperSectionText}>
              <Text style={styles.nameText}>
                {theCurrentUser?.firstname?.toUpperCase()}{" "}
                {theCurrentUser?.lastname?.toUpperCase()}
              </Text>
              <Text style={styles.contentText}>{theCurrentUser?.bio}</Text>
            </View>
          </View>
          <View style={styles.innerLowerSection}>
            <View style={styles.cesiContainer}>
              <View style={styles.cesiSection}>
                <Text style={styles.titleText}>{"Contact"}</Text>
                <Svg height="2" width="50">
                  <Line {...dividerOptions} />
                </Svg>
                {theCurrentUser?.telephone && (
                  <Text style={styles.contentText}>
                    {theCurrentUser?.telephone}
                  </Text>
                )}
                {theCurrentUser?.email && (
                  <Text style={styles.contentText}>
                    {theCurrentUser?.email}
                  </Text>
                )}
                {theCurrentUser?.location && (
                  <Text style={styles.contentText}>
                    {theCurrentUser?.location}
                  </Text>
                )}
              </View>
              {sections?.indexOf("Education") >= 0 && (
                <View style={styles.cesiSection}>
                  <Text style={styles.titleText}>{"Education"}</Text>
                  <Svg height="2" width="50">
                    <Line {...dividerOptions} />
                  </Svg>
                  {subsegments
                    ?.filter(
                      (element) => element?.parentSection === "Education"
                    )
                    .map((element, index) => {
                      return (
                        <View style={styles.eduSegment} key={index}>
                          <Text style={styles.biggerContentText}>
                            {element.title}
                          </Text>
                          <Text style={styles.contentText}>
                            {element.subTitle}
                          </Text>
                          <View style={styles.dateToFromView}>
                            <Text style={styles.dateText}>
                              {element.dateFrom}
                            </Text>
                            <Text style={styles.dateText}>{" - "}</Text>
                            <Text style={styles.dateText}>
                              {element.dateTo}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                </View>
              )}
              {sections?.indexOf("Skills") >= 0 && (
                <View style={styles.cesiSection}>
                  <Text style={styles.titleText}>{"Skills"}</Text>
                  <Svg height="2" width="50">
                    <Line {...dividerOptions} />
                  </Svg>
                  {subsegments
                    ?.filter((element) => element?.parentSection === "Skills")
                    .map((element, index) => {
                      return (
                        <React.Fragment key={index}>
                          <Text style={styles.contentText}>
                            {element.title}
                          </Text>
                        </React.Fragment>
                      );
                    })}
                </View>
              )}
              {sections?.indexOf("Hobbies") >= 0 && (
                <View style={styles.cesiSection}>
                  <Text style={styles.titleText}>{"Interests"}</Text>
                  <Svg height="2" width="50">
                    <Line {...dividerOptions} />
                  </Svg>
                  {subsegments
                    ?.filter((element) => element?.parentSection === "Hobbies")
                    .map((element, index) => {
                      return (
                        <React.Fragment key={index}>
                          <Text style={styles.contentText}>
                            {element.title}
                          </Text>
                        </React.Fragment>
                      );
                    })}
                </View>
              )}
            </View>
            <View style={styles.clawContainer}>
              <View style={styles.langAwardsCertSection}>
                {sections?.indexOf("Certifications") >= 0 && (
                  <View style={styles.clawSection}>
                    <Text style={styles.subtitleText}>{"Certificates"}</Text>
                    <Svg height="2" width="50">
                      <Line {...dividerOptions} />
                    </Svg>
                    {subsegments
                      ?.filter(
                        (element) => element?.parentSection === "Certifications"
                      )
                      .map((element, index) => {
                        return (
                          <View
                            style={{
                              ...styles.eduSegment,
                              ...styles.smallerEduSegment,
                            }}
                            key={index}
                          >
                            <Text
                              style={{
                                ...styles.contentText,
                                ...styles.coloredContentText,
                              }}
                            >
                              {element.title}
                            </Text>
                            <Text
                              style={{
                                ...styles.contentText,
                                ...styles.smallerContentText,
                              }}
                            >
                              {element.subTitle}
                            </Text>
                            {element.dateFrom && element.dateTo && (
                              <View style={styles.dateToFromView}>
                                <Text
                                  style={{
                                    ...styles.dateText,
                                    ...styles.smallerDateText,
                                  }}
                                >
                                  {element.dateFrom}
                                </Text>
                                <Text
                                  style={{
                                    ...styles.dateText,
                                    ...styles.smallerDateText,
                                  }}
                                >
                                  {" - "}
                                </Text>
                                <Text
                                  style={{
                                    ...styles.dateText,
                                    ...styles.smallerDateText,
                                  }}
                                >
                                  {element.dateTo}
                                </Text>
                              </View>
                            )}
                          </View>
                        );
                      })}
                  </View>
                )}
                {sections?.indexOf("Languages") >= 0 && (
                  <View style={styles.clawSection}>
                    <Text style={styles.subtitleText}>{"Languages"}</Text>
                    <Svg height="2" width="50">
                      <Line {...dividerOptions} />
                    </Svg>
                    {subsegments
                      ?.filter(
                        (element) => element?.parentSection === "Languages"
                      )
                      .map((element, index) => {
                        return (
                          <View
                            style={{
                              ...styles.eduSegment,
                              ...styles.smallestEduSegment,
                            }}
                            key={index}
                          >
                            <Text
                              style={{
                                ...styles.contentText,
                                ...styles.coloredContentText,
                              }}
                            >
                              {element.title}
                            </Text>
                            <Text
                              style={{
                                ...styles.contentText,
                                ...styles.smallerContentText,
                              }}
                            >
                              {element.subTitle}
                            </Text>
                            {element.dateFrom && element.dateTo && (
                              <View style={styles.dateToFromView}>
                                <Text
                                  style={{
                                    ...styles.dateText,
                                    ...styles.smallerDateText,
                                  }}
                                >
                                  {element.dateFrom}
                                </Text>
                                <Text
                                  style={{
                                    ...styles.dateText,
                                    ...styles.smallerDateText,
                                  }}
                                >
                                  {" - "}
                                </Text>
                                <Text
                                  style={{
                                    ...styles.dateText,
                                    ...styles.smallerDateText,
                                  }}
                                >
                                  {element.dateTo}
                                </Text>
                              </View>
                            )}
                          </View>
                        );
                      })}
                  </View>
                )}
                {sections?.indexOf("Awards") >= 0 && (
                  <View style={styles.clawSection}>
                    <Text style={styles.subtitleText}>{"Awards"}</Text>
                    <Svg height="2" width="50">
                      <Line {...dividerOptions} />
                    </Svg>
                    {subsegments
                      ?.filter((element) => element?.parentSection === "Awards")
                      .map((element, index) => {
                        return (
                          <View
                            style={{
                              ...styles.eduSegment,
                              ...styles.smallestEduSegment,
                            }}
                            key={index}
                          >
                            <Text
                              style={{
                                ...styles.contentText,
                                ...styles.coloredContentText,
                              }}
                            >
                              {element.title}
                            </Text>
                            <Text
                              style={{
                                ...styles.contentText,
                                ...styles.smallerContentText,
                              }}
                            >
                              {element.subTitle}
                            </Text>
                            {element.dateFrom && element.dateTo && (
                              <View style={styles.dateToFromView}>
                                <Text
                                  style={{
                                    ...styles.dateText,
                                    ...styles.smallerDateText,
                                  }}
                                >
                                  {element.dateFrom}
                                </Text>
                                <Text
                                  style={{
                                    ...styles.dateText,
                                    ...styles.smallerDateText,
                                  }}
                                >
                                  {" - "}
                                </Text>
                                <Text
                                  style={{
                                    ...styles.dateText,
                                    ...styles.smallerDateText,
                                  }}
                                >
                                  {element.dateTo}
                                </Text>
                              </View>
                            )}
                          </View>
                        );
                      })}
                  </View>
                )}
              </View>
              <View style={styles.workContainer}>
                {sections?.indexOf("Work Experience") >= 0 && (
                  <View style={styles.workSection}>
                    <Text style={styles.subtitleText}>{"Work Experience"}</Text>
                    <Svg height="2" width="50">
                      <Line {...dividerOptions} />
                    </Svg>
                    {subsegments
                      ?.filter(
                        (element) =>
                          element?.parentSection === "Work Experience"
                      )
                      .map((element, index) => {
                        return (
                          <View
                            style={{
                              ...styles.eduSegment,
                              ...styles.smallestEduSegment,
                            }}
                            key={index}
                          >
                            <Text
                              style={{
                                ...styles.contentText,
                                ...styles.coloredContentText,
                              }}
                            >
                              {element.title}
                            </Text>
                            <Text
                              style={{
                                ...styles.contentText,
                              }}
                            >
                              {element.subTitle}
                            </Text>
                            {element.dateFrom && element.dateTo && (
                              <View style={styles.dateToFromView}>
                                <Text
                                  style={{
                                    ...styles.dateText,
                                    ...styles.smallerDateText,
                                  }}
                                >
                                  {element.dateFrom}
                                </Text>
                                <Text
                                  style={{
                                    ...styles.dateText,
                                    ...styles.smallerDateText,
                                  }}
                                >
                                  {" - "}
                                </Text>
                                <Text
                                  style={{
                                    ...styles.dateText,
                                    ...styles.smallerDateText,
                                  }}
                                >
                                  {element.dateTo}
                                </Text>
                              </View>
                            )}
                          </View>
                        );
                      })}
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );

  return { Doc1 };
};

export default useDoc1;
