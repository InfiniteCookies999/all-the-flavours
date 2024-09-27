import { Col, Form, Row } from "react-bootstrap";
import AuthContainer from "./AuthContainer";
import { useState } from "react";
import useResponsiveValue from "../../hooks/useResponsitveValue";
import PrimaryButton from "../PrimaryButton";

const SignUp = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');

  const collapsedBreakpoints = {
    small: true,
    medium: true,
    large: false,
    other: false
  };
  
  const collapsed = useResponsiveValue(collapsedBreakpoints);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <AuthContainer xs={12} md={8} lg={7}>
      <div style={{ backgroundColor: 'white' }}>
        <h2 className="text-center mb-4" style={{ cursor: 'default' }}>Sign Up</h2>
        <Form onSubmit={handleSubmit} noValidate>
          <Row>
            <Col xs={12} md={6}>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Susan"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="username" className="mt-2">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="susan241"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="email" className="mt-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="susan-smith@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="password" className="mt-2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

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
            </Col>

            <Col xs={12} md={6}>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Smith"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
              </Form.Group>

              {!collapsed && (
                <Form.Group className="mt-2" style={{
                  opacity: 0
                }}>
                  <Form.Label>Hidden</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              )}

              <Form.Group controlId="phone" className="mt-2">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="777-777-7777"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="passwordRepeat" className="mt-2">
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="repeated password"
                  value={repeatedPassword}
                  onChange={(e) => setRepeatedPassword(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <div className={`${collapsed ? 'mt-4' : 'mt-2'}`}>
            <PrimaryButton type="submit" style={{
              width: (collapsed ? '100%' : '48%')
              }}>
              Sign Up
            </PrimaryButton>
          </div>
          
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