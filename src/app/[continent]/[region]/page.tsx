"use client";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const params = useParams();
  const continent = params ? params.continent : "";
  const region = params ? params.region : "";
  console.log("region", continent, region);
  return <div>page</div>;
};

export default Page;
