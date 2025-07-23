import React from "react";
import AllUser from "./AllUser";
import DownloadPdfWrapper from "../../components/DownloadPdfWraper";

export default function page() {
  return (
    <div>
      <DownloadPdfWrapper>
        <AllUser />
      </DownloadPdfWrapper>
    </div>
  );
}
