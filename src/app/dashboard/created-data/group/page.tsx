import axios from "axios";
import React from "react";
import AllGroup from "./AllGroup";

export default async function page() {
  const result = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_V1}/group`);
  return (
    <div>
      <AllGroup data={result.data.data.groups} />
    </div>
  );
}
