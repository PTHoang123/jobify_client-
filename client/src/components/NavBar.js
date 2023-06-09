import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import Logo from "./Logo";
import { useState } from "react";

function NavBar() {
  const {user, toggleSidebar, logoutUser } = useAppContext();
  const [showLogout, setShowLogout] = useState(false)
  return (
    <Wrapper>
      {/* <FaAlignLeft/>
    <FaCaretDown/>
    <FaUserCircle/> */}
      <div className="nav-center">
        <button className="toggle-btn" type="button" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button className="btn" type="button" onClick={() => setShowLogout(logout =>  !logout)}>
            <FaUserCircle />
            {user.name}
            
            <FaCaretDown />
          </button>
          <div className={ showLogout ?  "dropdown show-dropdown" : "dropdown"}>
            <button className="dropdown-btn" type="button" onClick={logoutUser} >
              Logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default NavBar;
