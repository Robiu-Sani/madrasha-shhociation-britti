import axios from "axios";
import React from "react";
import CreateStudent from "./CreateStudent";

export default async function page() {
  try {
    const [institution, group, branch, classes] = await Promise.all([
      axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_V1}/institution`)
        .catch(() => ({ data: { data: [] } })),
      axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_V1}/group`)
        .catch(() => ({ data: { data: { groups: [] } } })),
      axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_V1}/branch`)
        .catch(() => ({ data: { data: [] } })),
      axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_V1}/class`)
        .catch(() => ({ data: { data: { classes: [] } } })),
    ]);

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
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading data. Please try again later.</div>;
  }
}
