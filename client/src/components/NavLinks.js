import React from 'react'
import  links from '../Utils/links'
import { NavLink} from 'react-router-dom'

function NavLinks({toggleSidebar}) {

  return (
    <div>
        <div className="nav-links">
            {links.map((link) => {
              return (
                <NavLink to={link.path}  key={link.id} onClick={toggleSidebar} className={({isActive}) =>isActive ? 'nav-link active': 'nav-link'}>
                  <span className="icon">{link.icon}</span>
                  {link.text}
                   
                </NavLink>
              )
            })}
          </div>
    </div>
  )
}

export default NavLinks