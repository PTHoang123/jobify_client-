import React from "react";
import { Outlet, Link } from "react-router-dom";

import Wapper from "../../assets/wrappers/SharedLayout";
import { BigSideBar, SmallSideBar, NavBar } from "../../components";
function ShareLayout() {
  return (
    <Wapper>
      <main className="dashboard">
        <SmallSideBar />
        <BigSideBar />
        <div>
          <NavBar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wapper>
  );
}

export default ShareLayout;
