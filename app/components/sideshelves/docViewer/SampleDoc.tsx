"use client";

import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import useFirstDocStyles from "./hooks/styles/useDoc1Styles";
import useCvData from "./hooks/useCvData";
import useAllDocs from "./hooks/documents/useAllDocs";
import useCurrentTemplate from "@/app/hooks/useCurrentTemplate";

const SampleDoc = () => {
  const styles = useFirstDocStyles().styles;
  const { currentTemplate } = useCurrentTemplate();
  const TheDoc = useAllDocs()?.theDocs?.find(doc => doc.name === currentTemplate);
  const ActDoc = TheDoc!.doc
  const { theCurrentUser } = useCvData();


  const DownloadButton = () => (
    <div>
      <PDFDownloadLink
        style={styles.downloadLink}
        document={<ActDoc />}
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
        className={`flex flex-col align-start justify-center gap-4 p-4 pb-6 bg-gradient-to-r from-deep-blue to-blue-purple rounded-lg `}
      >
        <PDFViewer showToolbar={false} style={styles.pdfViewer}>
          {ActDoc()}
        </PDFViewer>

        {DownloadButton()}
      </article>
    </>
  );
};

export default SampleDoc;
