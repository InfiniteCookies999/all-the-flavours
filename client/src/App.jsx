import { Container } from "react-bootstrap";
import SiteNavbar from "./components/SiteNavbar";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import './App.css';
import Recipe from "./components/recipe/Recipe";
import SiteFooter from "./components/SiteFooter";
import RecipeListing from "./components/RecipeListing";
import Login from "./components/auth/Login";

const App = () => {

  const indexRouter = createBrowserRouter([
    {
      path: '/recipes',
      element: <RecipeListing />
    },
    {
      path: '/recipe/:id',
      element: <Recipe />
    },
    {
      path: '/login',
      element: <Login />
    }
  ]);

  return (
    <div>
      <SiteNavbar />
      {/* Rest of pages */}
      <Container style={{
        // All pages should have more margin between the navbar
        marginTop: '10rem',
        marginBottom: '3rem',
        minHeight: '40rem',
      }}>
        <RouterProvider router={indexRouter} />
      </Container>
      <SiteFooter />
    </div>
  );
}

export default App;