import { Link } from "react-router-dom"
import Logo from '../assets/SolarSystemIcon.jpeg'

const Nav = ({authenticated, pilgrim, handleLogout}) => {
  let authenticatedOptions
  if (pilgrim) {
    authenticatedOptions= (
      <nav>
        <h3> Welcome {pilgrim.username}!</h3>
          <Link to='/planetpage'>Planets</Link>
          <Link onClick={handleLogout} to='/'>Sign Out</Link>
      </nav>
    )
  }

  const publicOptions = (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/signin">Sign In</Link>
    </nav>
  )

  return (
    <header>
      <Link to='/' >
        <div className="logo-container" alt='logo' >
          <img className="logo" src={Logo} alt="solar-system" />
        </div>
      </Link>
      {authenticated && pilgrim ? authenticatedOptions : publicOptions}
    </header>
  )
}

export default Nav