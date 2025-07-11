import React from "react";
import ContactDataData from "./ContactDataData";
import axios from "axios";

export default async function page() {
  const result = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_V1}/info`);

  return (
    <div className="w-full">
      <ContactDataData data={result.data.data} />
    </div>
  );
}
