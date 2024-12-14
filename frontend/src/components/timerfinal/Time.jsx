import React from "react";
import Timer from "../timer/Timer";

export const Time = () => {
  const createdTime = "2024-12-12T12:00:00Z";
  return (
    <>
      <Timer createdTime={createdTime} />
    </>
  );
};
