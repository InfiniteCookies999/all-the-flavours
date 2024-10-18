import { useContext, useEffect, useState } from "react";
import theme from "../theme";
import AuthContainer from "./auth/AuthContainer";
import UserAvatar from "./UserAvatar";
import { useError } from "../contexts/ErrorContext";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import useResponsiveValue from "../hooks/useResponsitveValue";
import { Form } from "react-bootstrap";

const valueStyle = {
  color: 'gray',
  fontWeight: 'normal'
};

const editIconStyle = {
  fontSize: '1.1rem',
  color: '#192fd1',
  transform: 'translateY(0.5rem)',
  userSelect: 'none'
}

const Profile = () => {

  const [user, setUser] = useState(null);

  const [showNameEdit, setShowNameEdit] = useState(false);
  const [showUsernameEdit, setShowUsernameEdit] = useState(false);
  const [showEmailEdit, setShowEmailEdit] = useState(false);
  const [showPhoneEdit, setShowPhoneEdit] = useState(false);
  const [showPasswordEdit, setShowPasswordEdit] = useState(false);

  const { setError } = useError();

  const { isLoggedIn } = useContext(AuthContext);

  document.title = "Profile";

  useEffect(() => {
    axios.get(`/api/users/session`)
      .then(response => setUser(response.data))
      .catch(error => setError(error));
  }, [setError]);

  if (!isLoggedIn) {
    window.location.href = "/";
  }

  const tinyTableBreakpoints = {
    small: true,
    other: false
  };

  const isTinyTable = useResponsiveValue(tinyTableBreakpoints);

  if (!user) {
    return null;
  }

  return (
    <AuthContainer xs={12} md={10} lg={8}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{ marginTop: '2rem', marginBottom: '0.5rem', textAlign: 'center' }}>
          <div style={{
            borderRadius: '50%',
            border: `2px solid ${theme.colors.primaryLight}`
          }}>
            <UserAvatar 
              src={'/example-profile.jpg'} 
              style={{
                width: '12rem',
                height: '12rem'
              }}
            />
          </div>
        </div>
        <h4 style={{ margin: 0 }}>{user.firstName} {user.lastName}</h4>
        <span style={{ color: 'gray' }}>@{user.username}</span>
      </div>
      <div style={{ padding: isTinyTable ? '0' : '2rem' }}>
        <table className="table edit-table">
          <tbody>
              <tr className="edit-row">
                <th>Name</th>
                {showNameEdit ? (
                  <Form.Control
                    type="text"
                    className="auth-input"
                    style={{ height: '2.2rem' }}
                    placeholder="Susan Smith"
                    value={user.firstName + " " + user.lastName}
                    />
                ) : (
                  <th style={valueStyle}>{user.firstName} {user.lastName}</th>
                )}
                <th>
                  <span className="material-icons edit-icon" style={editIconStyle} onClick={() => {
                      setShowNameEdit(!showNameEdit);
                  }}>
                    {showNameEdit ? <>save</> : <>edit</>}
                  </span>
                </th>
              </tr>
              <tr className="edit-row">
                <th>Username</th>
                {showUsernameEdit ? (
                  <Form.Control
                    type="text"
                    className="auth-input"
                    style={{ height: '2.2rem' }}
                    value={user.username}
                    placeholder="susan-smith123"
                    />
                ) : (
                  <th style={valueStyle}>{user.username}</th>
                )}
                <th>
                  <span className="material-icons edit-icon" style={editIconStyle} onClick={() => {
                    setShowUsernameEdit(!showUsernameEdit);
                  }}>
                    {showUsernameEdit ? <>save</> : <>edit</>}
                  </span>
                </th>
              </tr>
              <tr className="edit-row">
                <th>Email</th>
                {showEmailEdit ? (
                  <Form.Control
                    type="text"
                    className="auth-input"
                    style={{ height: '2.2rem' }}
                    value={user.email}
                    placeholder="ramen123@gmail.com"
                    />
                ) : (
                  <th style={valueStyle}>{user.email}</th>
                )}
                <th>
                  <span className="material-icons edit-icon" style={editIconStyle} onClick={() => {
                    setShowEmailEdit(!showEmailEdit);
                  }}>
                    {showEmailEdit ? <>save</> : <>edit</>}
                  </span>
                </th>
              </tr>
              <tr className="edit-row">
                <th>Phone</th>
                {showPhoneEdit ? (
                  <Form.Control
                    type="text"
                    className="auth-input"
                    style={{ height: '2.2rem' }}
                    value={user.phone}
                    placeholder="214-435-3122"
                    />
                ) : (
                  <th style={valueStyle}>{user.phone}</th>
                )}
                <th>
                  <span className="material-icons edit-icon" style={editIconStyle} onClick={() => {
                    setShowPhoneEdit(!showPhoneEdit);
                  }}>
                    {showPhoneEdit ? <>save</> : <>edit</>}
                  </span>
                </th>
              </tr>
              <tr className="edit-row">
                <th>Password</th>
                {showPasswordEdit ? (
                  <Form.Control
                    type="text"
                    className="auth-input"
                    style={{ height: '2.2rem' }}
                    />
                ) : (
                  <th style={valueStyle}>*************</th>
                )}
                <th>
                  <span className="material-icons edit-icon" style={editIconStyle} onClick={() => {
                    setShowPasswordEdit(!showPasswordEdit);
                  }}>
                    {showPasswordEdit ? <>save</> : <>edit</>}
                  </span>
                </th>
              </tr>
          </tbody>
        </table>
        <style>
          {`
            .edit-row {
              border-bottom: none;
              height: 3rem;
            }

            .edit-table th, .edit-table td {
              border: none;
            }

            .edit-row th:nth-child(1) {
              max-width: 10rem;
              width: 10rem;
            }

            .edit-row th:nth-child(3) {
              max-width: 2rem;
              width: 2rem;
            }

            .edit-row input {
              transform: translateY(0.2rem);
            }

            .edit-icon:hover {
              cursor: pointer;
              color: #a9b3fc !important;
            }
          `}
        </style>
      </div>
    </AuthContainer>
  )
};

export default Profile;