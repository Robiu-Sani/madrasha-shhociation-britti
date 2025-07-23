"use client";
import { useParams } from "next/navigation";
import React from "react";

export default function StudentDetails() {
  const { id } = useParams();
  return <div>StudentDetails = {id}</div>;
}
