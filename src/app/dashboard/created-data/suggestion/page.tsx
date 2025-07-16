import axios from "axios";
import React from "react";
import AllSuggestion from "./AllSuggestion";

export default async function page() {
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_V1}/suggestion`
  );
  return (
    <div>
      <AllSuggestion data={result.data.data.data} />
    </div>
  );
}
