import React from "react";

const Error = ({ message }: any) => {
  return <p className="mt-2 p-0 text-14 text-red-400">{message && message}</p>;
};

export default Error;
