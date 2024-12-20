import axios from "axios";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useError } from "../../contexts/ErrorContext";
import ShowPasswordCheckbox from "../auth/ShowPasswordCheckBox";

const passwordPattern = /^[a-zA-Z0-9@$!%*?&]*$/;

const ProfilePassword = ({ valueStyle, editIconStyle }) => {

  const [showPasswordEdit, setShowPasswordEdit] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [currentPasswordValid, setCurrentPasswordValid] = useState(true);
  const [newPasswordValid, setNewPasswordValid] = useState(true);

  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');

  const [sendingRequest, setSendingRequest] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const { setError } = useError();

  const updateCurrentPasswordError = () => {
    const input = document.getElementById('current-password-input');
    const currentPassword = input.value;
    if (currentPassword === '') {
      setCurrentPasswordError('empty');
      return false;
    }
    return true;
  };

  const updateNewPasswordError = () => {
    const input = document.getElementById('new-password-input');
    const newPassword = input.value;

    if (newPassword.length === 0) {
      setNewPasswordError("empty");
      return false;
    } else if (newPassword.length < 8) {
      setNewPasswordError("too short");
      return false;
    } else if (!/[a-z]/.test(newPassword)) {
      setNewPasswordError("missing lowercase letter");
      return false;
    } else if (!/[A-Z]/.test(newPassword)) {
      setNewPasswordError("missing uppercase letter");
      return false;
    } else if (!/[@$!%*?&]/.test(newPassword)) {
      setNewPasswordError("missing special character");
      return false;
    } else if (!passwordPattern.test(newPassword)) {
      setNewPasswordError("invalid characters in password");
      return false;
    }
    return true;
  };

  const saveNewPassword = () => {
    if (newPassword === '' && currentPassword === '') {
      setShowPasswordEdit(false);
      return;
    }

    const currentPasswordValid = updateCurrentPasswordError();
    const newPasswordValid = updateNewPasswordError();
    
    if (!currentPasswordValid) {
      setCurrentPasswordValid(false);
    }

    if (!newPasswordValid) {
      setNewPasswordValid(false);
    }

    if (!currentPasswordValid || !newPasswordValid) {
      return;
    }

    setSendingRequest(true);

    axios.patch(`/api/auth/password`, {
      currentPassword,
      newPassword
    })
    .then(() => setShowPasswordEdit(false))
    .catch(error => {
      if (error.response?.status === 401 &&
          error.response.data) {
        setCurrentPasswordError(error.response.data);
        setCurrentPasswordValid(false);
        return;
      }
      setError(error);
    })
    .finally(() => setSendingRequest(false));
  };

  return (
    <tr className="edit-row">
      <th>Password</th>
      {showPasswordEdit ? (
        <>
          <Form.Control
            id="current-password-input"
            type={showPassword ? "text" : "password"}
            className={"auth-input " + (!currentPasswordValid ? 'is-invalid' : '')}
            style={{ height: '2.2rem' }}
            placeholder="current password"
            maxLength={100}
            onChange={(e) => {

              if (updateCurrentPasswordError()) {
                setCurrentPasswordValid(true);
              }

              setCurrentPassword(e.target.value);
            }}
            />
          {!currentPasswordValid && <div className="text-danger mt-1">{currentPasswordError}</div>}
          <Form.Control
            id="new-password-input"
            type={showPassword ? "text" : "password"}
            className={"auth-input mt-2 " + (!newPasswordValid ? 'is-invalid' : '')}
            style={{ height: '2.2rem' }}
            placeholder="new password"
            maxLength={100}
            onChange={(e) => {
              const newPassword = e.target.value;

              if (updateNewPasswordError()) {
                setNewPasswordValid(true);
              }

              setNewPassword(newPassword);
            }}
            />
          {!newPasswordValid && <div className="text-danger mt-1">{newPasswordError}</div>}
          <ShowPasswordCheckbox showPassword={showPassword} setShowPassword={setShowPassword} />
        </>
      ) : (
        <th style={valueStyle}>*************</th>
      )}
      <th>
        <span className="material-icons edit-icon" style={{
          ...editIconStyle,
          display: sendingRequest ? 'none' : 'inline'
        }}
        onClick={() => {
          if (showPasswordEdit) {
            saveNewPassword();
          } else {
            setShowPasswordEdit(true);  
          }
        }}>
          {showPasswordEdit ? <>save</> : <>edit</>}
        </span>
      </th>
    </tr>
  );
};

export default ProfilePassword;