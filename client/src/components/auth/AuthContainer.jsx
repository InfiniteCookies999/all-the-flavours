import { Col, Container, Row } from "react-bootstrap";

const AuthContainer = ({ children, xs, md, lg }) => {
  return (
    <>
      <Container fluid className="auth-container">
        <Row className="justify-content-center" style={{ marginTop: '18rem' }}>
          <Col xs={xs} md={md} lg={lg}>
            <div className="p-4 shadow-sm rounded bg-white">
              {children}
            </div>
          </Col>
        </Row>
      </Container>
      <style>
        {`
          :root {
            --placeholder-color: #b0b0b0;
          }

          body {
            background-color: #ebebeb;
          }

          /* Styles to help make forms look better */
          .is-invalid {
            outline: none !important;
            box-shadow: none !important;
          }

          .login-input::placeholder {
            color: var(--placeholder-color);
          }
          
          .login-input:focus {
            outline: none;
            box-shadow: none; /* Remove the blue glow */
            border-color: #999; /* Change the border color to a more subtle gray */
          }
        `}
      </style>
    </>
  );
};

export default AuthContainer;