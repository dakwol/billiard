import React, { FC } from "react";
import "./styles.scss";

interface iLoading {
  isLoading: boolean;
}

const Loader: FC<iLoading> = (isLoading) => {
  console.log("isLoading", isLoading);

  return (
    <div className={`containerLoader ${isLoading.isLoading && "active"}`}>
      <span className="loader"></span>
    </div>
  );
};

export default Loader;
