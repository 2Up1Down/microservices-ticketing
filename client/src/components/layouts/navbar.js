import React from "react";
import Header from "../header";

function Navbar({ children }) {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
}

export default Navbar;
