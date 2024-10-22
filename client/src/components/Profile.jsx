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

const acceptedAvatarFileTypes = [ 'image/jpg', 'image/jpeg', 'image/png', 'image/webp' ];

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
    if (!isLoggedIn) return;

    axios.get(`/api/users/session`)
      .then(response => setUser(response.data))
      .catch(error => setError(error));
  }, [setError, isLoggedIn]);

  const onSelectAvatar = () => {
    
    const selector = document.getElementById('avatar-selector');

    selector.onchange = () => {
      const file = selector.files[0];
      if (file) {
        const transfer = new DataTransfer();
        transfer.items.add(file);
        
        selector.files = transfer.files;
      
        const newImageUrl = URL.createObjectURL(file);

        setUser(prevUser => ({
          ...prevUser,
          avatarImage: newImageUrl
        }));
      }
    };

    selector.click();
  };

  if (!isLoggedIn) {
    window.location.href = "/";
  }

  const tinyTableBreakpoints = {
    small: true,
    other: false
  };

  const isTinyTable = useResponsiveValue(tinyTableBreakpoints);

  const avatarSizeBreakpoints = {
    small: '10rem',
    medium: '11rem',
    large: '11rem',
    other: '12rem'
  };

  const avatarSize = useResponsiveValue(avatarSizeBreakpoints);

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

        <input
          id="avatar-selector"
          type="file"
          name="avatar-selector"
          accept={acceptedAvatarFileTypes.join(', ')}
          hidden={true} />
        <div style={{ marginTop: '2rem', marginBottom: '0.5rem', textAlign: 'center' }}>
          <div style={{
            borderRadius: '50%',
            width: `calc(${avatarSize} + 0.5rem)`,
            height: `calc(${avatarSize} + 0.5rem)`,
            backgroundColor: theme.colors.primaryLight,
            margin: 0,
            padding: 0
          }}>
            <UserAvatar 
              src={user.avatarImage} 
              style={{
                width: avatarSize,
                height: avatarSize
              }}
              className="user-avatar"
              onClick={onSelectAvatar}
            >
            <span className="material-icons position-absolute" style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '2.5rem',
              color: 'black',
              userSelect: 'none'
            }}>
              add_photo_alternate
            </span>
            </UserAvatar>
          </div>
        </div>
        <h4 style={{ margin: 0 }}>{user.firstName} {user.lastName}</h4>
        <span style={{ color: 'gray' }}>@{user.username}</span>
      </div>
      <div style={{ padding: isTinyTable ? '0' : '2rem' }}>
        <table className="table edit-table sm-responsive-text">
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

        <div>
          <h4>Biography</h4>
          <Form.Control
            className="auth-input"
            style={{ marginTop: '2rem' }}
            as="textarea" 
            rows={5}
            value={user.bio}
            maxLength={500}
            placeholder="Describe yourself!"
          />
        </div>
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

            .user-avatar {
              position: relative;
              top: 50% !important;
              transform: translateY(-50%);
            }

            .user-avatar:hover {
              cursor: pointer;
            }

            .user-avatar span {
              display: none;
            }

            .user-avatar:hover span {
              display: inline;
            }

             @media (max-width: 576px) {
              .edit-table {
                display: block;
                overflow-x: auto;
                white-space: nowrap;
              }
            }
          `}
        </style>
      </div>
    </AuthContainer>
  )
};

export default Profile;