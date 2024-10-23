import { Col, Form, Row } from "react-bootstrap";
import AuthContainer from "./AuthContainer";
import { useContext, useState } from "react";
import PrimaryButton from "../PrimaryButton";
import ShowPasswordCheckbox from "./ShowPasswordCheckBox";
import { useError } from "../../contexts/ErrorContext";
import axios from "axios";
import theme from "../../theme";
import { AuthContext } from "../../contexts/AuthContext";
import useCollapsed from "../../hooks/useCollapsed";
import phoneInputRestrictor from "../../util/phoneInputRestrictor";

const emailPattern = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
const namePattern = /^[A-Za-z\s-]*$/;
const usernamePattern = /^[A-Za-z0-9_-]*$/;
const passwordPattern = /^[a-zA-Z0-9@$!%*?&]*$/;

const FormError = ({ valid, otherValid, errorMsg, collapsed }) => {
  return (
    <>
      {(!valid || (!otherValid && !collapsed)) && (
        <div className="text-danger mt-1" style={{ opacity: valid ? 0 : 1 }}>
          {!valid ? errorMsg : ';'}
        </div>
    )}
    </>
  );
};

const SignUp = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');

  const [firstNameValid, setFirstNameValid] = useState(true);
  const [lastNameValid, setLastNameValid] = useState(true);
  const [usernameValid, setUsernameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [repeatedPasswordValid, setRepeatedPasswordValid] = useState(true);

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatedPasswordError, setRepeatedPasswordError] = useState('');

  const [submitValid, setSubmitValid] = useState(true);
  const [submitError, setSubmitError] = useState("");
  
  const [loading, setLoading] = useState(false);

  const { setError } = useError();

  const [showPassword, setShowPassword] = useState(false);

  const { isLoggedIn } = useContext(AuthContext);

  document.title = "Sign up";

  const updateNotEmptyError = (field, setError) => {
    const fieldValid = field.length !== 0;
    if (!fieldValid) {
      setError("empty");
    }
    return fieldValid;
  };

  const updateEmailError = (email) => {
    const emailValid = emailPattern.test(email);
    if (!emailValid) {
      setEmailError(email.length === 0 ? "empty" : "invalid email");
    }
    return emailValid;
  };

  const updatePhoneError = (phone) => {
    if (phone.length === 0) {
      setPhoneError("empty");
      return false;
    } else if (phone.length !== 12) {
      setPhoneError("incomplete");
      return false;
    }
    return true;
  };

  const updatePasswordError = (password) => {
    if (password.length === 0) {
      setPasswordError("empty");
      return false;
    } else if (password.length < 8) {
      setPasswordError("too short");
      return false;
    } else if (!/[a-z]/.test(password)) {
      setPasswordError("missing lowercase letter");
      return false;
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError("missing uppercase letter");
      return false;
    } else if (!/[@$!%*?&]/.test(password)) {
      setPasswordError("missing special character");
      return false;
    } else if (!passwordPattern.test(password)) {
      setPasswordError("invalid characters in password");
      return false;
    }
    return true;
  };

  const updateRepeatedPasswordError = (repeatedPassword, password) => {
    if (repeatedPassword.length === 0) {
      setRepeatedPasswordError("empty");
      return false;
    } else if (repeatedPassword !== password) {
      setRepeatedPasswordError("password does not match");
      return false;
    }
    return true;
  };

  const updateErrors = () => {
    const firstNameValid = updateNotEmptyError(firstName, setFirstNameError);
    const lastNameValid = updateNotEmptyError(lastName, setLastNameError);
    const usernameValid = updateNotEmptyError(username, setUsernameError);
    const emailValid = updateEmailError(email);
    const phoneValid = updatePhoneError(phone);
    const passwordValid = updatePasswordError(password);
    const repeatedPasswordValid = updateRepeatedPasswordError(repeatedPassword, password);

    setFirstNameValid(firstNameValid);
    setLastNameValid(lastNameValid);
    setUsernameValid(usernameValid);
    setEmailValid(emailValid);
    setPhoneValid(phoneValid);
    setPasswordValid(passwordValid);
    setRepeatedPasswordValid(repeatedPasswordValid);

    return !(
        firstNameValid &&
        lastNameValid &&
        usernameValid &&
        emailValid &&
        phoneValid &&
        passwordValid &&
        repeatedPasswordValid
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (updateErrors()) {
      return;
    }

    setLoading(true);

    axios.post("/api/auth/register", {
      firstName,
      lastName,
      email,
      password,
      username,
      phone
    })
      .then(() => {
        window.location.href = "/";
      })
      .catch((error) => {
        if (error.response?.status === 409 &&
          error.response.data) {
          setSubmitError(error.response.data);
          setSubmitValid(false);
          return;
        }
        setError(error);
      })
      .finally(() => setLoading(false));    
  };

  const collapsed = useCollapsed();

  if (isLoggedIn) {
    window.location.href = "/";
    return;
  }

  return (
    <AuthContainer xs={12} md={10} lg={7}>
      <div style={{ backgroundColor: 'white' }}>
      <h2 className="text-center mb-4" style={{ cursor: 'default' }}>Sign Up</h2>
        <Form onSubmit={handleSubmit} noValidate>
          <Row className="flex-column flex-md-row">

            <Col xs={12} md={6}>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Susan"
                  value={firstName}
                  className={"auth-input " +  (!firstNameValid ? 'is-invalid' : '')}
                  maxLength={40}
                  onChange={(e) => {
                    const firstName = e.target.value;
                    if (!namePattern.test(firstName)) {
                      e.preventDefault();
                      return;
                    }

                    if (updateNotEmptyError(firstName, setFirstNameError)) {
                      setFirstNameValid(true);
                    }
                    setFirstName(firstName);
                  }}
                  required
                />
              </Form.Group>
              <FormError valid={firstNameValid}
                         otherValid={lastNameValid}
                         errorMsg={firstNameError}
                         collapsed={collapsed} />
            </Col>

            <Col xs={12} md={6}>
              <Form.Group controlId="lastName" className={collapsed ? 'mt-2' : ''}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Smith"
                    value={lastName}
                    className={"auth-input " + (!lastNameValid ? 'is-invalid' : '')}
                    maxLength={40}
                    onChange={(e) => {
                      const lastName = e.target.value;
                      if (!namePattern.test(lastName)) {
                        e.preventDefault();
                        return;
                      }

                      if (updateNotEmptyError(lastName, setLastNameError)) {
                        setLastNameValid(true);
                      }
                      setLastName(lastName);
                    }}
                    required
                  />
              </Form.Group>
              <FormError valid={lastNameValid}
                         otherValid={firstNameValid}
                         errorMsg={lastNameError}
                         collapsed={collapsed} />
            </Col>

            <Col xs={12} md={6}>
              <Form.Group controlId="username" className="mt-2">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="susan241"
                  value={username}
                  className={"auth-input " + (!usernameValid ? 'is-invalid' : '')}
                  maxLength={32}
                  onChange={(e) => {
                    const username = e.target.value;
                    if (!usernamePattern.test(username)) {
                      e.preventDefault();
                      return;
                    }

                    if (updateNotEmptyError(username, setUsernameError)) {
                      setUsernameValid(true);
                    }
                    setUsername(username);
                  }}
                  required
                />
              </Form.Group>
              <FormError valid={usernameValid}
                         otherValid={true}
                         errorMsg={usernameError}
                         collapsed={collapsed} />
            </Col>

            {!collapsed && (
              <Col xs={12} md={6}>
                <Form.Group className="mt-2" style={{
                  opacity: 0
                }}>
                  <Form.Label>Hidden</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <FormError valid={true}
                            otherValid={usernameValid}
                            errorMsg={''}
                            collapsed={collapsed} />
              </Col>
            )}

            <Col xs={12} md={6}>
              <Form.Group controlId="email" className="mt-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="susan-smith@gmail.com"
                    value={email}
                    className={"auth-input " + (!emailValid ? 'is-invalid' : '')}
                    maxLength={254}
                    onChange={(e) => {
                      const email = e.target.value;
                      if (updateEmailError(email)) {
                        setEmailValid(true);
                      }
                      setEmail(email);
                    }}
                    required
                  />
                </Form.Group>
                <FormError valid={emailValid}
                          otherValid={phoneValid}
                          errorMsg={emailError}
                          collapsed={collapsed} />
            </Col>

            <Col xs={12} md={6}>
              <Form.Group controlId="phone" className="mt-2">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="777-777-7777"
                  value={phone}
                  className={"auth-input " + (!phoneValid ? 'is-invalid' : '')}
                  maxLength={12}
                  onChange={(e) => {
                    let phone = phoneInputRestrictor(e);
                    if (phone === null) {
                      return;
                    }

                    if (updatePhoneError(phone)) {
                      setPhoneValid(true);
                    }
                    setPhone(phone);
                  }}
                  required
                />
              </Form.Group>
              <FormError valid={phoneValid}
                         otherValid={emailValid}
                         errorMsg={phoneError}
                         collapsed={collapsed} />
            </Col>

            <Col xs={12} md={6}>
              <Form.Group controlId="password" className="mt-2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  value={password}
                  className={"auth-input " + (!passwordValid ? 'is-invalid' : '')}
                  maxLength={100}
                  onChange={(e) => {
                    const password = e.target.value;

                    if (updateRepeatedPasswordError(repeatedPassword, password)) {
                      setRepeatedPasswordValid(true);
                    }
                    if (updatePasswordError(password)) {
                      setPasswordValid(true);
                    }
                    setPassword(password);
                  }}
                  required
                />
              </Form.Group>
              <FormError valid={passwordValid}
                         otherValid={repeatedPasswordValid}
                         errorMsg={passwordError}
                         collapsed={collapsed} />
            </Col>

            <Col xs={12} md={6}>
              <Form.Group controlId="passwordRepeat" className="mt-2">
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="repeated password"
                  value={repeatedPassword}
                  className={"auth-input " + (!repeatedPasswordValid ? 'is-invalid' : '')}
                  maxLength={100}
                  onChange={(e) => {
                    const repeatedPassword = e.target.value;
                    if (!passwordPattern.test(repeatedPassword)) {
                      e.preventDefault();
                      return;
                    }

                    if (updateRepeatedPasswordError(repeatedPassword, password)) {
                      setRepeatedPasswordValid(true);
                    }
                    setRepeatedPassword(repeatedPassword);
                  }}
                  required
                />
              </Form.Group>
              <FormError valid={repeatedPasswordValid} 
                         otherValid={passwordValid}
                         errorMsg={repeatedPasswordError}
                         collapsed={collapsed} />
            </Col>

          </Row>

          <ShowPasswordCheckbox showPassword={showPassword} setShowPassword={setShowPassword} />

          <div className="mt-2" style={{
            color: 'gray',
            cursor: 'default'
            }}>
            <ul>
              <li>At least 8 characters</li>
              <li>At least 1 lowercase letter</li>
              <li>At least 1 uppercase letter</li>
              <li>At least 1 special character (@ $ ! % * ? &)</li>
            </ul>
          </div>

          <div className={`${collapsed ? 'mt-4' : 'mt-2'}`}>
            <PrimaryButton type="submit" style={{
              width: (collapsed ? '100%' : '48%')
              }}
              className={"w-100 mt-4 submit-btn " + (!submitValid ? 'submit-invalid-btn' : '')}
              disabled={loading}>
              Sign Up
            </PrimaryButton>
            {!submitValid && <div className="text-danger mt-1">{submitError}</div>}
          </div>
          <style>{theme.styles.submitBtn}</style>
          
          <div className="mt-2">
            <span>
              Already have an account? <a href="/login">Login</a>
            </span>
          </div>
          
        </Form>
      </div>
    </AuthContainer>
  );
};

export default SignUp;