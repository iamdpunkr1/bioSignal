import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import * as Unicons from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext'; 
import { useLogout } from '../hooks/useLogout';

const NavBar = () => {
  const { user } = useAuthContext()
  const {logout} = useLogout()

  const handleClick = () =>{
    logout()
  }

    return ( <>
        <Navbar collapseOnSelect expand="lg" className="navcolor bg-warning" variant="light">
        <Container>
          <Link to="/" className='navbar-brand'>BioSignal</Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
  
            <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link to="">
              <Unicons.UilUser/> {user.user.username}
              </Nav.Link>
              <Link to="/about"  className='nav-link '>About us</Link>
              <Link to="/contact" className='nav-link'>Contact us</Link>
              <Link to="/" className='nav-link'>  <button onClick={handleClick} className="logout">
              Logout
            </button>
            </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
       );
}
 
export default NavBar;