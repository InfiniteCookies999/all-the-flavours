import { Button, Col, Container, Form, Row } from "react-bootstrap";
import theme from "../../theme";
import { useState } from "react";

const placeholderColor = '#b0b0b0';

const formIconClass = {
  top: '50%',
  left: '10px',
  transform: 'translateY(-50%)',
  color: placeholderColor
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div>
        <Container>
          <Row className="justify-content-center" style={{ marginTop: '20rem' }}>
            <Col xs={12} md={6} lg={4}>
              <div className="bg-white p-4 shadow-sm rounded">
                <h2 className="text-center mb-4">Login</h2>
                <Form>
                  <Form.Group controlId="forEmail" className="position-relative">
                    <Form.Control type="email" placeholder="ramen123@gmail.com" />
                    <i className="fas fa-envelope position-absolute" style={formIconClass}></i>
                  </Form.Group>
                  
                  <Form.Group controlId="formBasicPassword" className="mt-3 position-relative">
                    <Form.Control type={showPassword ? "text" : "password"}  placeholder="Password" />
                    <i className="fas fa-lock position-absolute" style={formIconClass}></i>
                  </Form.Group>

                  {/* Show password checkbox */}
                  <Form.Group controlId="formShowPassword" className="mt-2">
                    <Form.Check 
                      className="better-checkbox"
                      type="checkbox"
                      // Wrap the label in a span with userSelect set to none so that
                      // the text of the show password cannot be selected.
                      label={<span style={{ userSelect: 'none' }}>Show Password</span>}
                      onChange={() => {
                        setShowPassword(!showPassword);
                      }} 
                    />
                  </Form.Group>

                  <Button type="submit" className="w-100 mt-4 submit-btn" style={{
                    backgroundColor: theme.colors.primary,
                    borderColor: theme.colors.primary
                    }}>
                    Submit
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <style>
        {`
          body {
            background-color: #ebebeb;
          }
          
          .form-group {
            position: relative;
          }
          
          .form-group i {
            pointer-events: none;
          }
          
          .form-control {
            padding-left: 2.5rem;
          }
          
          .form-control::placeholder {
            color: ${placeholderColor};
          }
          
          .form-control:focus {
            outline: none;
            box-shadow: none; /* Remove the blue glow */
            border-color: #999; /* Change the border color to a more subtle gray */
          }

          .submit-btn:hover {
            background-color: ${theme.colors.primaryDark} !important;
            border-color: ${theme.colors.primaryDark} !important;
          }

          .submit-btn:focus {
            outline: none !important;
            box-shadow: none !important;
          }

          .better-checkbox .form-check-input:focus {
            outline: none !important;
            box-shadow: none !important;
            border-color: gray;
          }


          .better-checkbox .form-check-input:checked {
            background-color: ${theme.colors.primaryLight};
            border-color: ${theme.colors.primaryLight};
          }

          .better-checkbox .form-check-input:checked:focus {
            box-shadow: none;
          }

          .better-checkbox .form-check-input {
            cursor: pointer;
          }
        `}
      </style>
    </>
  )
};

export default Login;