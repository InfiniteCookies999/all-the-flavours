import { useState } from "react";
import { Form } from "react-bootstrap";
import { useError } from "../../contexts/ErrorContext";
import axios from "axios";
import ShowPasswordCheckbox from "../auth/ShowPasswordCheckBox";

const emailPattern = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;

const ProfileEmail = ({ user, setUser, valueStyle, editIconStyle }) => {

  const [showEmailEdit, setShowEmailEdit] = useState(false);

  const [emailValid, setEmailValid] = useState(true);
  const [emailError, setEmailError] = useState('');

  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordError, setPasswordError] = useState('');
  
  const [password, setPassword] = useState('');

  const [sendingRequest, setSendingRequest] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [originalEmail, setOriginalEmail] = useState('');

  const { setError } = useError();

  const updateEmailError = () => {
    const input = document.getElementById('email-input');
    
    const email = input.value;
    if (email === '') {
      setEmailError('empty');
      return false;
    }

    if (!emailPattern.test(email)) {
      setEmailError("invalid email");
      return false;
    }

    return true;
  };

  const updatePasswordError = () => {
    const input = document.getElementById('email-password-input');

    const password = input.value;
    if (password === '') {
      setPasswordError('empty');
      return false;
    }

    return true;
  };

  const saveNewEmail = () => {

    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('email-password-input');

    const email = emailInput.value;
    const password = passwordInput.value;

    if (originalEmail === email) {
      setShowEmailEdit(false);
      return;
    }
    
    const emailValid = updateEmailError();
    const passwordValid = updatePasswordError();
    
    if (!emailValid) {
      setEmailValid(false);
    }

    if (!passwordValid) {
      setPasswordValid(false);
    }

    if (!emailValid || !passwordValid) {
      return;
    }
  
    setSendingRequest(true);

    axios.patch(`/api/auth/email`, {
      email,
      password
    })
    .then(() => setShowEmailEdit(false))
    .catch(error => {
      if (error.response?.status === 401 &&
          error.response.data) {
        setPasswordError(error.response.data);
        setPasswordValid(false);
        return;
      } else if (error.response?.status === 409 &&
                 error.response.data) {
        setEmailError(error.response.data);
        setEmailValid(false);
        return;
      }
      setError(error);
    })
    .finally(() => setSendingRequest(false));
  };

  return (
    <tr className="edit-row">
      <th>Email</th>
      {showEmailEdit ? (
        <>
          <Form.Control
            id="email-input"
            type="text"
            className={"auth-input " + (!emailValid ? 'is-invalid' : '')}
            style={{ height: '2.2rem' }}
            value={user.email}
            placeholder="ramen123@gmail.com"
            maxLength={254}
            onChange={(e) => {
              const email = e.target.value;

              if (updateEmailError()) {
                setEmailValid(true);
              }

              setUser(prevUser => ({
                ...prevUser,
                email
              }));
            }}
            />
          {!emailValid && <div className="text-danger mt-1">{emailError}</div>}
          <Form.Control
            id="email-password-input"
            type={showPassword ? "text" : "password"}
            className={"auth-input mt-2 " + (!passwordValid ? 'is-invalid' : '')}
            style={{ height: '2.2rem' }}
            value={password}
            placeholder="password"
            maxLength={100}
            onChange={(e) => {
              const password = e.target.value;

              if (updatePasswordError()) {
                setPasswordValid(true);
              }

              setPassword(password);
            }}
            />
          {!passwordValid && <div className="text-danger mt-1">{passwordError}</div>}
          <ShowPasswordCheckbox showPassword={showPassword} setShowPassword={setShowPassword} />
        </>
      ) : (
        <th style={valueStyle}>{user.email}</th>
      )}
      <th>
        <span className="material-icons edit-icon" style={{
          ...editIconStyle,
          display: sendingRequest ? 'none' : 'inline'
        }}
          onClick={() => {
            if (showEmailEdit) {
              saveNewEmail();
            } else {
              setPassword('');
              setPasswordValid(true);
              setShowEmailEdit(true);  
              setOriginalEmail(user.email);
            }
          }}>
          {showEmailEdit ? <>save</> : <>edit</>}
        </span>
      </th>
    </tr>
  );
};

export default ProfileEmail;