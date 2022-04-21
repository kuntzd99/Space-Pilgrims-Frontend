import { Link } from "react-router-dom"
import Logo from '../assets/SpacePilgrim.jpg'

const Nav = ({authenticated, pilgrim, handleLogout}) => {
  let authenticatedOptions
  if (pilgrim) {
    authenticatedOptions= (
      <nav className="navbar-text nav-body">
        <div className="welcome" >
          <h1 className="username">
            Welcome {pilgrim.username}!
          </h1>
          <ul className="icon icon-container">
          <input type='checkbox' id="hamburger_icon" />
          <label htmlFor='hamburger_icon' className="hamburger">&#9776;</label>
          <div className="nav-menu" >

            <div className="icon icon-fill">
              <li className="i fa fa-home"><Link to='/home'>Home</Link></li>
            </div>

            <div className="icon icon-enter">
              <li className="fa fa-user"><Link to="/profile">My Profile</Link></li>
            </div>

            <div className="icon icon-collapse">
              <li className="i fa fa-sign-in"><Link onClick={handleLogout} to='/'>Sign Out</Link></li>
            </div>
            
          </div>
        </ul>
      </div>
        
      </nav>
    )
  }
  let adminOptions
   if (pilgrim) {
    adminOptions = (
      <nav className="navbar-text nav-body">
        <div className="welcome" > 
          <h1 className="username">
          Welcome {pilgrim.username}!
          </h1>

          <ul className="icon icon-container">
          <input type='checkbox' id="hamburger_icon" />
          <label htmlFor='hamburger_icon' className="hamburger">&#9776;</label>
          <div className="nav-menu" >
            <div className="icon icon-fill">
                <li className="i fa fa-home"><Link to='/home'>Home</Link></li>
              </div>

              <div className="icon icon-expand">
                <li className="i fa fa-bars"><Link to='/faq'></Link>FAQ</li>
              </div>

              <div>
                <li><Link to="/admin">Admin Access</Link></li>
              </div>

              <div className="icon icon-rotate">
                <li className="i fa fa-phone"><Link to={`/messages`}>Messages</Link></li>
              </div>

              <div className="icon icon-collapse">
                <li className="i fa fa-sign-in"><Link onClick={handleLogout} to='/'>Sign Out</Link></li>
              </div>
            
          </div>
        </ul>

          
        </div>
        
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