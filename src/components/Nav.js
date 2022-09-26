import React from "react";
import { Outlet, Link } from "react-router-dom";

const Nav = () => {
    return (
      <div>
        <div className="nav-container">
        <nav>
            <p>Logo</p>
            <ul className="nav-links">
            <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/map">Map</Link>
          </li>
          <li>
            <Link to="/table">Table</Link>
            </li>
            </ul>
        </nav>
        </div>
        <Outlet />
        </div>
    )
}

export default Nav;