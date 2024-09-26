import { Button, Col, Container, Form, Row } from "react-bootstrap";
import theme from "../../theme";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const emailPattern = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
const placeholderColor = '#b0b0b0';

const formIconClass = {
  top: '50%',
  left: '10px',
  transform: 'translateY(-50%)',
  color: placeholderColor
};

const Login = () => {
  
  const [showPassword, setShowPassword] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [submitValid, setSubmitValid] = useState(true);
  const [submitError, setSubmitError] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const updatePasswordError = () => {
    
    const passwordValid = password.length > 0;

    if (!passwordValid) {
      setPasswordError("empty");
    }

    return passwordValid;
  }

  const updateEmailError = () => {

    const emailValid = emailPattern.test(email);

    if (!emailValid) {
      setEmailError(email.length === 0 ? "empty" : "invalid email");
    }

    return emailValid;
  };

  const updateErrors = () => {

    const emailValid = updateEmailError();
    const passwordValid = updatePasswordError();

    setEmailValid(emailValid);
    setPasswordValid(passwordValid);

    return !emailValid || !passwordValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (updateErrors()) {
      return;
    }

    setLoading(true);

    try {

      await axios.post("/api/auth/login", { email, password });
      
      navigate('/');

    } catch (error) {
      if (error.response && error.response.status === 401 &&
          error.response.data) {
        setSubmitError(error.response.data);
        setSubmitValid(false);
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <Container>
          <Row className="justify-content-center" style={{ marginTop: '20rem' }}>
            <Col xs={12} md={6} lg={4}>
              <div className="bg-white p-4 shadow-sm rounded">
                <h2 className="text-center mb-4">Login</h2>
                <Form onSubmit={handleSubmit} noValidate>
                  <Form.Group controlId="forEmail" className="position-relative">
                    <Form.Control type="email"
                                  placeholder="ramen123@gmail.com"
                                  onChange={(e) => {
                                    updateEmailError();
                                    setEmail(e.target.value)
                                  }}
                                  className={!emailValid ? 'is-invalid' : ''} />
                    <i className="fas fa-envelope position-absolute" style={formIconClass}></i>
                  </Form.Group>
                  {!emailValid && <div className="text-danger mt-1">{emailError}</div>}
                  
                  <Form.Group controlId="formBasicPassword" className="mt-3 position-relative">
                    <Form.Control type={showPassword ? "text" : "password"} 
                                  placeholder="Password"
                                  onChange={(e) => {
                                    updatePasswordError();
                                    setPassword(e.target.value);
                                  }}
                                  className={!passwordValid ? 'is-invalid' : ''} />
                    <i className="fas fa-lock position-absolute" style={formIconClass}></i>
                  </Form.Group>
                  {!passwordValid && <div className="text-danger mt-1">{passwordError}</div>}

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

                  <Button type="submit" style={{
                    backgroundColor: theme.colors.primary,
                    borderColor: theme.colors.primary
                    }}
                    className={"w-100 mt-4 submit-btn " + (!submitValid ? 'submit-invalid-btn' : '')}
                    disabled={loading} >
                    Submit
                  </Button>
                  {!submitValid && <div className="text-danger mt-1">{submitError}</div>}
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

          .submit-btn:not[submit-invalid-btn]:focus {
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

          .is-invalid {
            outline: none !important;
            box-shadow: none !important;
          }

          .submit-invalid-btn {
            border-color: red !important;
            box-shadow: 0 0 2px red;
          }
        `}
      </style>
    </>
  )
};

export default Login;