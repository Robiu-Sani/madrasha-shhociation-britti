import React from "react";
import AllBranch from "./AllBranch";
import axios from "axios";

export default async function page() {
  const result = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_V1}/branch`);
  return (
    <div>
      <AllBranch data={result.data.data} />
    </div>
  );
}
