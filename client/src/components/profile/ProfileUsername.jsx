import axios from "axios";
import { Form } from "react-bootstrap";
import { useError } from "../../contexts/ErrorContext";
import { useState } from "react";

const usernamePattern = /^[A-Za-z0-9_-]*$/;

const ProfileUsername = ({ user, setUser, valueStyle, editIconStyle }) => {

  const [showUsernameEdit, setShowUsernameEdit] = useState(false);

  const [usernameValid ,setUsernameValid] = useState(true);
  const [usernameError, setUsernameError] = useState('');

  const [sendingRequest, setSendingRequest] = useState(false);

  const { setError } = useError();

  const updateUsernameError = () => {
    const input = document.getElementById('username-input');
    
    const username = input.value;
    if (username === '') {
      setUsernameError('empty');
      return false;
    }

    return true;
  };

  const saveNewUsername = () => {
    const input = document.getElementById('username-input');
    const username = input.value;
    
    if (!updateUsernameError()) {
      setUsernameValid(false);
      return false;
    }

    setSendingRequest(true);

    setUser(prevUser => ({
      ...prevUser,
      username
    }));

    axios.patch(`/api/users/${user.id}/username`,
      { username })
    .then(() => setShowUsernameEdit(false))
    .catch(error => {
      if ((error.response?.status === 401 || error.response?.status === 409) &&
          error.response.data) {
        setUsernameError(error.response.data);
        setUsernameValid(false);
        return;
      }
      setError(error);
    })
    .finally(() => setSendingRequest(false));

    return true;
  };

  return (
    <tr className="edit-row">
      <th>Username</th>
      {showUsernameEdit ? (
        <>
          <Form.Control
            id="username-input"
            type="text"
            className={"auth-input " + (!usernameValid ? 'is-invalid' : '')}
            style={{ height: '2.2rem' }}
            value={user.username}
            placeholder="susan-smith123"
            maxLength={32}
            onChange={(e) => {
              const username = e.target.value;

              if (!usernamePattern.test(username)) {
                e.preventDefault();
                return;
              }

              if (updateUsernameError()) {
                setUsernameValid(true);
              }

              setUser(prevUser => ({
                ...prevUser,
                username
              }));
            }}
            />
          {!usernameValid && <div className="text-danger mt-1">{usernameError}</div>}
        </>
      ) : (
        <th style={valueStyle}>{user.username}</th>
      )}
      <th>
        <span className="material-icons edit-icon"
          style={{
            ...editIconStyle,
            display: sendingRequest ? 'none' : 'inline'
          }}
          onClick={() => {
            if (showUsernameEdit) {
              saveNewUsername();
            } else {
              setShowUsernameEdit(true);
            }
          }}>
          {showUsernameEdit ? <>save</> : <>edit</>}
        </span>
      </th>
    </tr>
  );
};

export default ProfileUsername;