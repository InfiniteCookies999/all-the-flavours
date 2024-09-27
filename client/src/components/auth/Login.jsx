import { Form } from "react-bootstrap";
import theme from "../../theme";
import { useState } from "react";
import axios from "axios";
import { useError } from "../../contexts/ErrorContext";
import AuthContainer from "./AuthContainer";
import PrimaryButton from "../PrimaryButton";

const emailPattern = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;

const formIconClass = {
  top: '50%',
  left: '10px',
  transform: 'translateY(-50%)',
  color: 'var(--placeholder-color)'
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

  const { setError } = useError();

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

    axios.post("/api/auth/login", { email, password })
      .then(() => {
        window.location.href = "/";
      })
      .catch((error) => {
        if (error.response && error.response.status === 401 &&
          error.response.data) {
          setSubmitError(error.response.data);
          setSubmitValid(false);
          return;
        }
        setError(error);
      })
      .finally(() => setLoading(false));    
  };

  return (
      <AuthContainer xs={12} md={6} lg={4}>
        <>
          <h2 className="text-center mb-4" style={{ cursor: 'default' }}>Login</h2>
          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group controlId="forEmail" className="position-relative">
              <Form.Control type="email"
                            placeholder="ramen123@gmail.com"
                            onChange={(e) => {
                              if (updateEmailError()) {
                                setEmailValid(true);
                              }
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
                              if (updatePasswordError()) {
                                setPasswordValid(true);
                              }
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

            <div className="mt-2">
              <span style={{
                color: 'gray'
              }}>
                Don't have an account? <a href="/sign-up">Sign up</a>
              </span>
            </div>

            <PrimaryButton
              type="submit"
              className={"w-100 mt-4 submit-btn " + (!submitValid ? 'submit-invalid-btn' : '')}
              disabled={loading}
              >
              Submit
            </PrimaryButton>
            {!submitValid && <div className="text-danger mt-1">{submitError}</div>}
          </Form>
              
          <style>
            {`
              .form-group {
                position: relative;
              }
              
              .form-group i {
                pointer-events: none;
              }
              
              .form-control {
                padding-left: 2.5rem;
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

              .submit-invalid-btn {
                border-color: red !important;
                box-shadow: 0 0 2px red;
              }
            `}
          </style>
        </>
      </AuthContainer>
  )
};

export default Login;