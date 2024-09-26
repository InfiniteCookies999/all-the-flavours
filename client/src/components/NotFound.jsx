import { Col, Container, Row } from "react-bootstrap";
import theme from "../theme";
import { useLocation } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();

  return (
    <Container style={{
      backgroundColor: theme.colors.backgroundLight,
      borderRadius: '5px',
      padding: '0 0 2rem 2rem'
    }}>
      <Row>
        <Col md={6}>
          <span style={{ fontSize: '5rem' }}>404</span>
            <h1>Page not found!</h1>
          <span className="med-responsive-text">Could not find page <code>{location.pathname}</code></span>
        </Col>
        <Col md={6}>
          <img src="/coffee-error-page.svg" style={{
              height: '30rem',
              width: '30rem'
          }} alt="coffee cup"></img>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;