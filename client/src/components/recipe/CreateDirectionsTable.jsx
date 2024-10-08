import { Form, Table } from "react-bootstrap";
import theme from "../../theme";
import { useCallback } from "react";

const CreateDirectionRow = ({ 
  index, 
  direction, 
  numDirections,
  handleDirectionChange,
  handleDirectionAdd,
  handleDirectionDelete,
  handleDirectionMoveUp,
  handleDirectionMoveDown,
  directionFieldsValid,
  directionsFieldErrors
}) => {
  // TODO: the up/down arrows should not work for the current direction that has not even
  // been added.

  const directionStepNotValid = !directionFieldsValid && directionsFieldErrors[index] !== '';

  return (
    <tr>
      <td>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span 
            className={"material-icons " + (index === 0 ? '' : 'direction-hover-pos-icon')}
            style={{ fontSize: '2rem', color: index === 0 ? 'gray' : 'inherit', }}
            onClick={() => handleDirectionMoveUp(index)}>
            keyboard_arrow_up
          </span>
          <span style={{ fontSize: '1.3rem' }}>{index + 1}</span>
          <span 
            className={"material-icons " + (index === numDirections - 1 ? '' : 'direction-hover-pos-icon')}
            style={{ fontSize: '2rem', color: index === numDirections - 1 ? 'gray' : 'inherit', }}
            onClick={() => handleDirectionMoveDown(index)}>
            keyboard_arrow_down
          </span>
        </div>
      </td>
      <td>
        <Form.Control 
          as="textarea" 
          className={"recipe-input " + (directionStepNotValid ? 'is-invalid' : '')}
          rows={3}
          placeholder="Describe direction step"
          value={direction}
          maxLength={300}
          onChange={(e) => handleDirectionChange(index, e.target.value)} 
        />
        {directionStepNotValid && <div className="text-danger mt-1">{directionsFieldErrors[index]}</div>}
      </td>
      <td style={{ width: '5rem' }}>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
          }}>
            {index === numDirections - 1 ? (
              <span className="material-icons add-direction-icon" style={{
                color: '#383838',
                transform: 'translateY(0.4rem)'
              }}
              onClick={() => handleDirectionAdd()}>
                add_circle
            </span>
            ) : (
              <span className="material-icons remove-direction-icon" style={{
                color: '#383838',
                transform: 'translateY(0.4rem)'
              }}
              onClick={() => handleDirectionDelete(index)}>
                delete
            </span>
            )}
          </div>
      </td>
    </tr>
  );
}

const CreateDirectionsTable = ({
  directions,
  setDirections,
  directionsValid,
  directionsError,
  setDirectionsValid,
  directionFieldsValid,
  directionsFieldErrors,
  setDirectionsFieldsValid,
  updateDirectionsFieldsErrors
}) => {

  const handleDirectionDelete = useCallback((indexToDelete) => {
    setDirectionsFieldsValid(true);

    setDirections(prevDirections => {
      return prevDirections.filter((_, index) => index !== indexToDelete);
    });
  }, [setDirections, setDirectionsFieldsValid]);

  const handleDirectionChange = useCallback((index, value) => {
      const newDirections = [...directions];
      newDirections[index] = value;
      setDirections(newDirections);
      updateDirectionsFieldsErrors(newDirections);
  }, [directions, setDirections, updateDirectionsFieldsErrors]);

  const handleDirectionAdd = useCallback(() => {
    setDirectionsFieldsValid(true);

    setDirectionsValid(true);
    setDirections(prevDirections => [...prevDirections, '']);
  }, [setDirections, setDirectionsFieldsValid, setDirectionsValid]);

  const handleDirectionMoveUp = useCallback((index) => {
    setDirectionsFieldsValid(true);
    const newDirections = [...directions];
    const temp = newDirections[index];
    newDirections[index] = newDirections[index - 1];
    newDirections[index - 1] = temp;
    setDirections(newDirections);
  }, [directions, setDirections, setDirectionsFieldsValid]);

  const handleDirectionMoveDown = useCallback((index) => {
    setDirectionsFieldsValid(true);
    const newDirections = [...directions];
    const temp = newDirections[index];
    newDirections[index] = newDirections[index + 1];
    newDirections[index + 1] = temp;
    setDirections(newDirections);
  }, [directions, setDirections, setDirectionsFieldsValid]);

  return (
    <>
      <Form.Label className="mt-4" style={{ fontSize: '1.5rem' }}>Directions</Form.Label>
      <div style={{
        ...(!directionsValid ? { border: '1px solid red' } : {}),
        height: 'fit-content'
      }}>
        <Table striped bordered className="m-0">
          <thead>
            <tr>
              <th>Step</th>
              <th>Direction</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {directions.map((direction, index) => 
              <CreateDirectionRow
                key={index}
                index={index}
                direction={direction}
                numDirections={directions.length}
                handleDirectionChange={handleDirectionChange}
                handleDirectionAdd={handleDirectionAdd}
                handleDirectionDelete={handleDirectionDelete}
                handleDirectionMoveUp={handleDirectionMoveUp}
                handleDirectionMoveDown={handleDirectionMoveDown}
                directionFieldsValid={directionFieldsValid}
                directionsFieldErrors={directionsFieldErrors}
              />
            )}
          </tbody>
          <style>
            {`
              .direction-hover-pos-icon:hover {
                cursor: pointer;
                color: ${theme.colors.primary} !important;
              }

              .remove-direction-icon:hover {
                cursor: pointer;
                color: red !important;
              }

              .add-direction-icon:hover {
                cursor: pointer;
                color: green !important;
              }
            `}
          </style>
        </Table>
      </div>
      {!directionsValid && <div className="text-danger mt-1">{directionsError}</div>}
    </>
  );
}

export default CreateDirectionsTable;