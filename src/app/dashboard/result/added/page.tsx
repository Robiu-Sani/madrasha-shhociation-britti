import React from "react";
import AllResult from "./AllResult";
import DownloadPdfWrapper from "../../components/DownloadPdfWraper";

export default function page() {
  return (
    <DownloadPdfWrapper filename="Results">
      <AllResult />
    </DownloadPdfWrapper>
  );
}
