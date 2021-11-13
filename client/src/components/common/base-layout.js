import React from "react";
import Header from "./header";

function BaseLayout({ children, user }) {
  return (
    <div className="">
      <Header user={user} />
      <div className="container">{children}</div>
    </div>
  );
}

export default BaseLayout;
