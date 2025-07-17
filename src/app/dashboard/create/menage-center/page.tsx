import axios from "axios";
import React from "react";
import CreateMenageCenter from "./CreateMenageCenter";

export default async function page() {
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_V1}/institution/filter`
  );
  return (
    <div>
      <CreateMenageCenter institutions={result.data.data} />
    </div>
  );
}
