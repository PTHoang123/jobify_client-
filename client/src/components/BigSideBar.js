import React from "react";
import NavLinks from "./NavLinks";
import Wrapper from "../assets/wrappers/BigSidebar";
import Logo from './Logo'

import { useAppContext } from "../context/appContext";

function BigSideBar() {
  const {showSidebar} = useAppContext()
  return (
    <Wrapper>
      <div className={showSidebar ? 'sidebar-container ' : 'sidebar-container show-sidebar' }>
        <div className="content">
           <header>
            <Logo/>
           </header>
           <NavLinks/>
        </div>
      </div>
    </Wrapper>
  );
}

export default BigSideBar;
