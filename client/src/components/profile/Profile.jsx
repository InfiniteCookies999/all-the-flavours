import { useContext, useEffect, useState } from "react";
import theme from "../../theme";
import AuthContainer from "../auth/AuthContainer";
import UserAvatar from "../UserAvatar";
import { useError } from "../../contexts/ErrorContext";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import useResponsiveValue from "../../hooks/useResponsitveValue";
import { Form } from "react-bootstrap";
import ProfileName from "./ProfileName";
import ProfileUsername from "./ProfileUsername";
import ProfileEmail from "./ProfileEmail";
import ProfilePhone from "./ProfilePhone";
import ProfilePassword from "./ProfilePassword";

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

  const { setError } = useError();

  const { isLoggedIn, setAvatarSrc } = useContext(AuthContext);

  document.title = "Profile";

  useEffect(() => {
    if (!isLoggedIn) return;

    axios.get(`/api/users/session`)
      .then(response => setUser({ 
        ...response.data,
        name: response.data.firstName + " " + response.data.lastName
       }))
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
          avatarSrc: newImageUrl
        }));
        setAvatarSrc(newImageUrl);

        const formData = new FormData();
        formData.append('file', file);

        axios.patch(`/api/users/${user.id}/avatar`, formData)
          .catch(error => setError(error));
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
              src={user.avatarSrc} 
              style={{
                width: avatarSize,
                height: avatarSize
              }}
              className="user-avatar"
              onClick={onSelectAvatar}>
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
              <ProfileName
                user={user}
                setUser={setUser}
                valueStyle={valueStyle}
                editIconStyle={editIconStyle}
                />
              <ProfileUsername
                user={user}
                setUser={setUser}
                valueStyle={valueStyle}
                editIconStyle={editIconStyle}
                />
              <ProfileEmail
                user={user}
                setUser={setUser}
                valueStyle={valueStyle}
                editIconStyle={editIconStyle}
                />
              <ProfilePhone
                user={user}
                setUser={setUser}
                valueStyle={valueStyle}
                editIconStyle={editIconStyle}
                />
              <ProfilePassword
                valueStyle={valueStyle}
                editIconStyle={editIconStyle}
                />
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