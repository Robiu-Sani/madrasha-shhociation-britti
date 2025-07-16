import React from "react";
import AllClass from "./AllClass";
import axios from "axios";

export default async function page() {
  const result = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_V1}/class`);
  return (
    <div>
      <AllClass data={result.data.data.classes} />{" "}
    </div>
  );
}
