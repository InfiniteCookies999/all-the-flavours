import { Col, Container, Row } from "react-bootstrap";
import theme from "../../theme";

const ErrorInfo = ({ infoColumn }) => {
  return (
    <Container style={{
      backgroundColor: theme.colors.backgroundLight,
      borderRadius: '5px',
      padding: '0 0 2rem 2rem'
    }}>
      <Row>
        <Col md={6}>
          {infoColumn}
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

export default ErrorInfo;