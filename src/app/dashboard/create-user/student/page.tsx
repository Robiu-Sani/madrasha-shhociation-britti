import axios from "axios";
import React from "react";
import CreateStudent from "./CreateStudent";

export default async function page() {
  const institution = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_V1}/institution`
  );
  const group = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_V1}/group`);
  const branch = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_V1}/branch`);
  const classes = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_V1}/class`);

  return (
    <div>
      <CreateStudent
        institution={institution.data.data}
        branch={branch.data.data}
        classes={classes.data.data.classes}
        group={group.data.data.groups}
      />
    </div>
  );
}
