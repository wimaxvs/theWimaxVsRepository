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
import useDoc2Styles from "../styles/useDoc2Styles";
import usePlaceholderImage from "../styles/usePlaceholderImage";
import useCvData from "../useCvData";

const useDoc2 = () => {
    const imgSrc = usePlaceholderImage().imgSrc;
    const styles = useDoc2Styles().styles;
    const dividerOptions = useDoc2Styles().dividerOptions;
    const { sections, subsegments, theCurrentUser } = useCvData();


  const Doc2 = () => (
    <Document style={[]}>
      <Page size="A4" style={[]}>
        
      </Page>
    </Document>
  );

  return { Doc2 };
};

export default useDoc2;
