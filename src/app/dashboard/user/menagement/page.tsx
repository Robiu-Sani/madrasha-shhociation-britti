import React from "react";
import AllManagement from "./AllManagement";
import axios from "axios";

export default async function page() {
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_V1}/management`
  );
  return (
    <div>
      <AllManagement data={result.data.data} />
    </div>
  );
}
