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
    <div className={"mb-2"}>
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
        className={`flex flex-col align-start gap-6 pr-2 mb-6 pb-6 bg-gradient-to-r from-deep-blue to-blue-purple rounded-lg `} //
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
