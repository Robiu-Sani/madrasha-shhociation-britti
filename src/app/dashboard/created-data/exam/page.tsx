import axios from "axios";
import React from "react";
import AllExam from "./AllExam";

export default async function page() {
  const result = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_V1}/exam`);
  return (
    <div>
      <AllExam data={result.data.data.exams} />
    </div>
  );
}
