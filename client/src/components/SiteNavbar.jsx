import { Container, Nav, Navbar } from 'react-bootstrap';
import SiteLogo from './SiteLogo';
import theme from '../theme';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const navbarHoverClass ='navbar-hover';

const SiteNavbar = () => {

  const { isLoggedIn, loading, onLogout } = useContext(AuthContext);

  if (loading) {
    return;
  }

  return (
    <div>
      <Navbar bg='dark' variant='dark' expand='lg' style={{
        backgroundColor: theme.colors.primary,
        borderBottom: `2px solid ${theme.colors.primary}`,
        position: 'fixed',
        top: '0',
        width: '100%',
        zIndex: 999,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' // Light box shadow for visuals
      }}>
        <Container>
          <Navbar.Brand href='/' className={navbarHoverClass} style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '1.5rem'
          }}>
            <SiteLogo navbarHoverClass={navbarHoverClass} />
            <span className="d-none d-lg-inline" style={{ marginLeft: '0rem' }}>All The Flavours</span>
            <style>
              {`
                .${navbarHoverClass}:hover span {
                  text-shadow: 0 0 2px orange;
                }
              `}
            </style>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='collapsable-navbar' />
          <Navbar.Collapse id='collapsable-navbar'>
            <Nav className="ms-auto">
              <Nav.Link className='nav-link' href='/'>Home</Nav.Link>
              <Nav.Link className='nav-link' href='/about-us'>About Us</Nav.Link>
              <Nav.Link className='nav-link' href='/recipes'>Search Recipes</Nav.Link>
              {isLoggedIn ? <Nav.Link className='nav-link' onClick={onLogout}>Logout</Nav.Link>
                          : <Nav.Link className='nav-link' href='/login'>Login</Nav.Link>}
              
            </Nav>
            <style>
              {`
                .nav-link {
                  margin-left: 1.5rem;
                }

                /* Make as pure white so it pops! */
                .nav-link:hover {
                  color: white !important;
                }

                /* Dont show hamburger border when clicked */
                .navbar-toggler:focus {
                  outline: none;
                  box-shadow: none;
                }

                /* By default bootstrap hamburgers come with borders. Getting rid of that */
                .navbar-toggler {
                  border: none;
                }

                /* Changing the color of the svg to the light orange */
                .navbar-toggler-icon:hover {
                  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='${encodeURIComponent(theme.colors.primaryLight)}' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
                }
              `}
            </style>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default SiteNavbar;