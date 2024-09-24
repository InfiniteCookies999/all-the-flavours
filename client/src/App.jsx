import { Container } from "react-bootstrap";
import SiteNavbar from "./components/SiteNavbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Recipe from "./components/recipe/Recipe";
import './App.css';
import SiteFooter from "./components/SiteFooter";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RecipeListing from "./components/RecipeListing";

const App = () => {

  const indexRouter = createBrowserRouter([
    {
      path: '/recipes',
      element: <RecipeListing />
    },
    {
      path: '/recipe/:id',
      element: <Recipe />
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