import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/not-found.svg";
import Wapper from "../assets/wrappers/ErrorPage";
function Error() {
  return (
    <Wapper className="full-page">
      <div>
        <img src={logo} alt="Not Found" />
        <h3>Oh! Page not found</h3>
        <p>we can't seem to find the page you're looking for</p>
        <Link to="/">Get back home</Link>
      </div>
    </Wapper>
  );
}

export default Error;
