import { Spinner } from "@/components/global/loader/spinner";
import React from "react";

const loading = () => {
  return (
    <div className="size-full flex items-center justify-center">
      <Spinner />
    </div>
  );
};

export default loading;
