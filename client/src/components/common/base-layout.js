import React from "react";
import Header from "./header";

function BaseLayout({ children }) {
  return (
    <div className="">
      <Header />
      <div className="container">{children}</div>
    </div>
  );
}

export default BaseLayout;
