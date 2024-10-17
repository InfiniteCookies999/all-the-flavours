import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import SiteLogo from './SiteLogo';
import theme from '../theme';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import RecipeSearchInput from './recipe/RecipeSearchInput';
import useResponsiveValue from '../hooks/useResponsitveValue';
import UserAvatar from "./UserAvatar";

const navbarHoverClass ='navbar-hover';

const SiteNavbar = () => {

  const { isLoggedIn, loading, onLogout } = useContext(AuthContext);

  const collapsedBreakpoints = {
    small: true,
    medium: true,
    large: true,
    other: false
  };
  
  const collapsed = useResponsiveValue(collapsedBreakpoints);

  if (loading) {
    return null;
  }

  //<Nav.Link className='nav-link' onClick={onLogout}>Logout</Nav.Link>

  return (
    <div>
      <Navbar bg='dark' variant='dark' expand='lg' style={{
        backgroundColor: theme.colors.primary,
        borderBottom: `2px solid ${theme.colors.primary}`,
        position: 'fixed',
        top: '0',
        width: '100%',
        zIndex: 999,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)' // Light box shadow for visuals
      }}>
        <Container style={{
          margin: '0 2rem 0 2rem',
          maxWidth: '100%',
          width: '100%'
        }}>
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
          <RecipeSearchInput style={{ 
            width: collapsed ? '50%' : '38%',
            marginLeft: '1rem'
            }} />
          <Navbar.Toggle aria-controls='collapsable-navbar' />
          <Navbar.Collapse id='collapsable-navbar'>
            <Nav className="ms-auto" style={{
              alignItems: collapsed ? "flex-start" : "center"
              
              }}>
              <Nav.Link className='nav-link' href='/'>Home</Nav.Link>
              <Nav.Link className='nav-link' href='/about-us'>About Us</Nav.Link>
              <Nav.Link className='nav-link' href='/recipes'>Search Recipes</Nav.Link>
              {isLoggedIn ? (
                <>
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      as="div"
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        marginLeft: '1rem'
                      }}
                    >
                      <UserAvatar src={"/example-profile.jpg"} style={{
                        width: '2.5rem',
                        height: '2.5rem'
                      }} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item className="nav-dropdown-item-link" href="/profile">Profile</Dropdown.Item>
                      <Dropdown.Item className="nav-dropdown-item-link" href="/create-recipe">Create Recipe</Dropdown.Item>
                      <Dropdown.Item className="nav-dropdown-item-link" onClick={onLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <Nav.Link className='nav-link' href='/login'>Login</Nav.Link>
              )}
              
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

                .nav-dropdown-item-link:hover {
                  background-color: ${theme.colors.primary} !important;
                }
              `}
            </style>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default SiteNavbar;