import axios from "axios";
import React from "react";
import Messages from "./Messages";

export default async function page() {
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_V1}/contact`
  );
  return (
    <div>
      <Messages data={result.data.data} />
    </div>
  );
}
