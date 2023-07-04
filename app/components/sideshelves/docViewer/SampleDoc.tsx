"use client";

import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import useFirstDocStyles from "./hooks/styles/useDoc1Styles";
import useCvData from "./hooks/useCvData";
import { useEffect } from "react";
import useAllDocs from "./hooks/documents/useAllDocs";

const SampleDoc = () => {
  const styles = useFirstDocStyles().styles;
  let forUe = useAllDocs();
  const TheDoc = useAllDocs().TheDocs.Doc2;
  const { theCurrentUser } = useCvData();

  useEffect(() => {
    console.log(typeof forUe);
  }, []);

  const DownloadButton = () => (
    <div>
      <PDFDownloadLink
        style={styles.downloadLink}
        document={<TheDoc />}
        fileName={`Me-CV: ${
          theCurrentUser?.firstname! + theCurrentUser?.lastname
        } CV`}
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink>
    </div>
  );

  return (
    <>
      <article
        className={`flex flex-col gap-4 h-full bg-gradient-to-r from-deep-blue to-blue-purple rounded-lg`}
      >
        <PDFViewer showToolbar={false} style={styles.pdfViewer}>
          {TheDoc()}
        </PDFViewer>

        {DownloadButton()}
      </article>
    </>
  );
};

export default SampleDoc;
