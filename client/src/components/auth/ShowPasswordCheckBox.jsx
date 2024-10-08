import { Form } from "react-bootstrap";
import theme from "../../theme";

const ShowPasswordCheckbox = ({ showPassword, setShowPassword }) => {
  return (
    <>
      <Form.Group controlId="formShowPassword" className="mt-2">
        <Form.Check 
          className="better-checkbox"
          type="checkbox"
          // Wrap the label in a span with userSelect set to none so that
          // the text of the show password cannot be selected.
          label={<span style={{ userSelect: 'none' }}>Show Password</span>}
          onChange={() => {
            setShowPassword(!showPassword);
          }} 
        />
      </Form.Group>
      <style>
        {`
          .better-checkbox .form-check-input:focus {
            outline: none !important;
            box-shadow: none !important;
            border-color: gray;
          }

          .better-checkbox .form-check-input:checked {
            background-color: ${theme.colors.primaryLight};
            border-color: ${theme.colors.primaryLight};
          }

          .better-checkbox .form-check-input:checked:focus {
            box-shadow: none;
          }

          .better-checkbox .form-check-input {
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
};

export default ShowPasswordCheckbox;