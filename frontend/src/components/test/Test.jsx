import React from "react";
import { toast } from "react-toastify";

const Test = () => {
  const click = () => {
    console.log("hai");

    toast.error("hello");
  };
  return (
    <>
      <button onClick={click}>click</button>
    </>
  );
};

export default Test;
