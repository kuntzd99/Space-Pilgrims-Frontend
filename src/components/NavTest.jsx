import { Link, NavLink } from "react-router-dom"
import Logo from '../assets/SpacePilgrim.jpg'

const Nav = ({authenticated, pilgrim, handleLogout}) => {
  let authenticatedOptions
  if (pilgrim) {
    authenticatedOptions= (
      <nav className="navbar-text nav-body">
        <div className="welcome" > Welcome {pilgrim.username}!</div>
        <div className="icon icon-container">
          <input type='checkbox' id="hamburger_icon" />
          {/* <label htmlFor='hamburger_icon' className="hamburger">&#9776;</label> */}
          <div className="nav-menu" >

            <div className="icon icon-fill">
              <NavLink to='/home' className={isActive => "i fa fa-home" + (!isActive ? "unselected" : "")}>Home</NavLink>
            </div>

            <div className="icon icon-enter">
              <NavLink to="/profile" className={isActive => "i fa fa-user" + (!isActive ? "unselected" : "")}>My Profile</NavLink>
            </div>

            <div className="icon icon-collapse">
              <NavLink className={isActive => "i fa fa-sign-in" + (!isActive ? "unselected" : "")} onClick={handleLogout} to='/'>Sign Out</NavLink>
            </div>
            
          </div>
        </div>
      </nav>
    )
  }
  let adminOptions
   if (pilgrim) {
    adminOptions = (
      <nav className="navbar-text nav-body">
        <div className="welcome" > Welcome {pilgrim.username}!</div>
        <ul className="icon icon-container">
          <input type='checkbox' id="hamburger_icon" />
          <label htmlFor='hamburger_icon' className="hamburger">&#9776;</label>
          <div className="nav-menu" >

            <li className="icon icon-fill">
                <div className="i fa fa-home"><Link to='/home'>Home</Link></div>
              </li>

              <li className="icon icon-expand">
                <div className="i fa fa-bars"><Link to='/faq'></Link>FAQ</div>
              </li>

              <li className="icon icon-enter">
                <div className="i fa fa-user"><Link to="/profile">My Profile</Link></div>
              </li>

              <li>
                <div><Link to="/admin">Admin Access</Link></div>
              </li>

              <li className="icon icon-rotate">
                <div className="i fa fa-phone"><Link to={`/messages`}>Messages</Link></div>
              </li>

              <li className="icon icon-collapse">
                <div className="i fa fa-sign-in"><Link onClick={handleLogout} to='/'>Sign Out</Link></div>
              </li>
            
          </div>
        </ul>
      </nav>
    )
   }

  const publicOptions = (
    <nav className="publicOption nav-body">
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Sign In</Link>
    </nav>
  )

  return (
    <header className="navbar container" >
      <div className="nav-left content">
      <Link to='/' >
        <div className="logo-container" alt='logo' >
          <img className="logo" src={Logo} alt="space-pilgrim-logo" />
        </div>
      </Link>
      </div>
      {authenticated && pilgrim ? (pilgrim.admin === true ? adminOptions: authenticatedOptions) : publicOptions}
    </header>
  )
  }

export default Nav