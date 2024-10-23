import { Form } from "react-bootstrap";
import { useError } from "../../contexts/ErrorContext";
import axios from "axios";
import { useState } from "react";

const namePattern = /^[A-Za-z\s- ]*$/;

const ProfileName = ({ user, setUser, valueStyle, editIconStyle }) => {

  const [showNameEdit, setShowNameEdit] = useState(false);

  const [nameValid, setNameValid] = useState(true);
  const [nameError, setNameError] = useState('');

  const { setError } = useError();

  const updateNameError = () => {
    const input = document.getElementById('name-input');
    
    const name = input.value;
    if (name === '') {
      setNameError('empty');
      return false;
    }
    
    const parts = name.split(' ');
    if (parts[0] === '') {
      setNameError('first name empty');
      return false;
    }

    if (parts.length < 2 || parts[1] === '') {
      setNameError('last name empty');
      return false;
    }

    return true;
  };

  const saveNewName = () => {
    if (!updateNameError()) {
      setNameValid(false);
      return false;
    }

    const input = document.getElementById('name-input');
    
    const name = input.value;
    const parts = name.split(' ');
    const firstName = parts[0];
    const lastName = parts[1];

    setUser(prevUser => ({
      ...prevUser,
      firstName,
      lastName
    }));

    axios.patch(`/api/users/${user.id}/name`, {
      firstName,
      lastName
    }).catch(error => setError(error));

    return true;
  };

  return (
    <tr className="edit-row">
      <th>Name</th>
      {showNameEdit ? (
        <>
          {/* TODO: fix issue of errors regarding input cannot be a child of <tr> ! D:< */}
          <Form.Control
            id="name-input"
            type="text"
            className={"auth-input " + (!nameValid ? 'is-invalid' : '')}
            style={{ height: '2.2rem' }}
            placeholder="Susan Smith"
            value={user.name}
            onChange={(e) => {
              const name = e.target.value;
              
              const parts = name.split(' ');
              if (parts.length > 2) {
                // Do not allow more than a first and last name!
                e.preventDefault();
                return;
              }

              if (!namePattern.test(name)) {
                e.preventDefault();
                return;
              }
              
              if (updateNameError()) {
                setNameValid(true);
              }

              setUser(prevUser => ({
                ...prevUser,
                name
              }));
            }}
            />
          {!nameValid && <div className="text-danger mt-1">{nameError}</div>}
        </>  
      ) : (
        <th style={valueStyle}>{user.firstName} {user.lastName}</th>
      )}
      <th>
        <span className="material-icons edit-icon" style={editIconStyle} onClick={() => {
            if (showNameEdit) {
              if (saveNewName()) {
                setShowNameEdit(false);
              }
            } else {
              setShowNameEdit(true);  
            }
        }}>
          {showNameEdit ? <>save</> : <>edit</>}
        </span>
      </th>
    </tr>
  );
};

export default ProfileName;