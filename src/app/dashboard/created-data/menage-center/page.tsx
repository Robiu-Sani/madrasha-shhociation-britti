import React from "react";
import AllMenageCenter from "./AllMenageCenter";
import axios from "axios";

export default async function page() {
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_V1}/manage-center`
  );
  return (
    <div>
      <AllMenageCenter data={result.data.data} />
    </div>
  );
}
