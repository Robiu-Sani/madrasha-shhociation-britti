import React from "react";
import axios from "axios";
import CheckInstitutionsClient from "./CheckInstitutions";

export default async function Page() {
  try {
    const [group, branch, classes] = await Promise.all([
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
        <CheckInstitutionsClient
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
