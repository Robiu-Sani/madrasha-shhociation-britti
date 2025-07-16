import React from "react";
import CreateMenagement from "./CreateMenagement";
import axios from "axios";

export default async function page() {
  const result = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_V1}/branch`);
  return (
    <div>
      <CreateMenagement branch={result.data.data} />
    </div>
  );
}
