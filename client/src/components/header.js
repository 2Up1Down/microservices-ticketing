import React from "react";
import Link from "next/link";

import { useAuth } from "../stores/authContext";

function Header() {
  const { user, isLoading, isError } = useAuth();

  const links = [
    { label: "Sign Up", href: "/auth/signup" },
    { label: "Sign In", href: "/auth/signin" },
    { label: "Sign Out", href: "/auth/signout" },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href}>
          <Link href={href}>
            <a>{label}</a>
          </Link>
        </li>
      );
    });

  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">GitTix</a>
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
}

export default Header;
