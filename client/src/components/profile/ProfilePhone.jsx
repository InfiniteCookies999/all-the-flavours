import { useState } from "react";
import { Form } from "react-bootstrap";
import phoneInputRestrictor from "../../util/phoneInputRestrictor";
import axios from "axios";
import { useError } from "../../contexts/ErrorContext";

const ProfilePhone = ({ user, setUser, valueStyle, editIconStyle }) => {
  
  const [showPhoneEdit, setShowPhoneEdit] = useState(false);

  const [phoneValid, setPhoneValid] = useState(true);
  const [phoneError, setPhoneError] = useState('');

  const { setError } = useError();
  
  const updatePhoneError = () => {
    const input = document.getElementById('phone-input');

    const phone = input.value;
    if (phone === '') {
      setPhoneError('empty');
      return false;
    }

    if (phone.length !== 12) {
      setPhoneError('incomplete');
      return false;
    }

    return true;
  };

  const saveNewPhone = () => {
    if (!updatePhoneError()) {
      setPhoneValid(false);
      return false;
    }

    const input = document.getElementById('phone-input');
    const phone = input.value;

    axios.patch(`/api/users/${user.id}/phone`, {
      phone
    })
    .catch(error => setError(error));

    return true;
  };

  return (
    <tr className="edit-row">
      <th>Phone</th>
      {showPhoneEdit ? (
        <>
          <Form.Control
            id="phone-input"
            type="text"
            className={"auth-input " + (!phoneValid ? 'is-invalid' : '')}
            style={{ height: '2.2rem' }}
            value={user.phone}
            placeholder="214-435-3122"
            onChange={(e) => {
              const phone = phoneInputRestrictor(e);
              if (phone === null) {
                return;
              }

              if (updatePhoneError()) {
                setPhoneValid(true);
              }

              setUser(prevUser => ({
                ...prevUser,
                phone
              }));
            }}
            />
          {!phoneValid && <div className="text-danger mt-1">{phoneError}</div>}
        </>
      ) : (
        <th style={valueStyle}>{user.phone}</th>
      )}
      <th>
        <span className="material-icons edit-icon" style={editIconStyle} onClick={() => {
          if (showPhoneEdit) {
            if (saveNewPhone()) {
              setShowPhoneEdit(false);
            }
          } else {
            setShowPhoneEdit(true);  
          }
        }}>
          {showPhoneEdit ? <>save</> : <>edit</>}
        </span>
      </th>
    </tr>
  );
};

export default ProfilePhone;