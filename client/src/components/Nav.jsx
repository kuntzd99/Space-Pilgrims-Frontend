import { Link } from "react-router-dom"
import Logo from '../assets/SpacePilgrim.jpg'

const Nav = ({authenticated, pilgrim, handleLogout}) => {
  let authenticatedOptions
  if (pilgrim) {
    authenticatedOptions= (
      <nav className="navbar-text">
        <div className="welcome" > Welcome {pilgrim.username}!</div>
        <ul>
          <input type='checkbox' id="hamburger_icon" />
          <label htmlFor='hamburger_icon' className="hamburger">&#9776;</label>
          <div className="nav-menu" >
            <li><Link to='/home'>Home</Link></li>
            {/* <li><Link to='/faq'></Link>FAQ</li> */}
            {/* <li><Link to='/forum'>Forum</Link></li> */}
            <li><Link to="/admin">Admin Access</Link></li>
            <li><Link to={`/profile`}>My Profile</Link></li>
            <li><Link to={`/messages`}>Messages</Link></li>
            <li><Link onClick={handleLogout} to='/'>Sign Out</Link></li>
          </div>
        </ul>
      </nav>
    )
  }

  const publicOptions = (
    <nav className="publicOption">
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Sign In</Link>
    </nav>
  )

  return (
    <header className="navbar" >
      <div className="nav-left">
      <Link to='/' >
        <div className="logo-container" alt='logo' >
          <img className="logo" src={Logo} alt="space-pilgrim-logo" />
        </div>
      </Link>
      </div>
      {authenticated && pilgrim ? authenticatedOptions : publicOptions}
    </header>
  )
}

export default Nav