"use client";

import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
import useCvSubSegments from "@/app/hooks/useCvSubSegments";
import React from "react";
import useFirstDocStyles from "./hooks/useFirstDocStyles";
import useCvData from "./hooks/useCvData";

// Create Document Component
const SampleDoc = () => {
  const styles = useFirstDocStyles().styles;
  const { sections, subsegments } = useCvData();

  const TheDoc = () => (
    <Document style={styles.document}>
      <Page size="A4" style={styles.page}>
        {sections?.map((section, index) => {
          return (
            <React.Fragment key={index}>
              <View style={styles.view}>
                <Text>{section}</Text>
                {subsegments
                  .filter((subseg) => {
                    return subseg.parentSection === section;
                  })
                  .map((subseg, index) => {
                    return (
                      <React.Fragment key={index}>
                        <Text>{subseg.title}</Text>
                      </React.Fragment>
                    );
                  })}
              </View>
            </React.Fragment>
          );
        })}
      </Page>
    </Document>
  );
  
  const DownloadButton = () => (
    <div>
      <PDFDownloadLink style={styles.downloadLink}  document={<TheDoc />} fileName="somename.pdf">
        {({ blob, url, loading, error }) =>
          
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink>
    </div>
  );

  return (
    <>
      <article className={`flex flex-col gap-4 h-full`}>
        {TheDoc()}
        {DownloadButton()}
      </article>
    </>
  );
};

export default SampleDoc;
