import React from "react";
import Link from "next/link";

const Header = ({ user }) => {
  const links = [
    !user && { label: "Sign Up", href: "/auth/signup" },
    !user && { label: "Sign In", href: "/auth/signin" },
    user && { label: "Sign Out", href: "/auth/signout" },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link href={href}>
            <a className="nav-link">{label}</a>
          </Link>
        </li>
      );
    });

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link href="/">
          <a className="navbar-brand">GitTix</a>
        </Link>
        <div className="d-flex justify-content-end">
          <ul className="nav d-flex align-items-center">{links}</ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
