import { Container } from "react-bootstrap";
import SiteNavbar from "./components/SiteNavbar";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import './App.css';
import Recipe from "./components/recipe/Recipe";
import SiteFooter from "./components/SiteFooter";
import Login from "./components/auth/Login";
import NotFound from "./components/error/NotFound";
import { ErrorProvider } from "./contexts/ErrorContext";
import SignUp from "./components/auth/SignUp";
import { AuthProvider } from "./contexts/AuthContext";
import RecipeListing from "./components/recipe/RecipeListing";
import CreateRecipe from "./components/recipe/CreateRecipe";
import AboutUs from "./components/AboutUs";
import ReviewsForRecipe from "./components/recipe/ReviewsForRecipe";
import HomePage from "./components/HomePage";
import Profile from "./components/profile/Profile";
import UserPage from "./components/UserPage";

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
    },
    {
      path: '/sign-up',
      element: <SignUp />
    },
    {
      path: '/create-recipe',
      element: <CreateRecipe />
    },
    {
      path: '/about-us',
      element: <AboutUs />
    },
    {
      path: '/recipe/reviews/:id',
      element: <ReviewsForRecipe />
    },
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/profile',
      element: <Profile />
    },
    {
      path: '/user/:username',
      element: <UserPage />
    },
    {
      path: '*',
      element: <NotFound />,
    }
  ]);

  document.title = "";

  return (
    <AuthProvider>
      <SiteNavbar />
      {/* Rest of page */}

      <Container style={{
        // All pages should have more margin between the navbar
        marginTop: '10rem',
        marginBottom: '3rem',
        minHeight: '40rem',
      }}>
        <ErrorProvider>
          <RouterProvider 
            render={() =>{
              document.title = "Test";
            }} 
            router={indexRouter} />
        </ErrorProvider>
      </Container>
      <SiteFooter />
    </AuthProvider>
  );
}

export default App;