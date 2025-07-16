import axios from "axios";
import React from "react";
import AllInstitution from "./AllInstitution";

export default async function page() {
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_V1}/institution`
  );
  return (
    <div>
      <AllInstitution data={result.data.data} />
    </div>
  );
}
