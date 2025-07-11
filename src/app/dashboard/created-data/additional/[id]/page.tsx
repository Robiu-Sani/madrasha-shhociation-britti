import axios from "axios";
import React from "react";
import EditInfoData from "./EditInfoData";

export default async function page() {
  const result = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_V1}/info`);
  return (
    <div>
      <EditInfoData data={result.data.data} />
    </div>
  );
}
