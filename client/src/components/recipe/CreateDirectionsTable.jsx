import { Form, Table } from "react-bootstrap";
import theme from "../../theme";

const CreateDirectionRow = ({ 
  index, 
  direction, 
  numDirections,
  handleDirectionChange,
  handleDirectionAdd,
  handleDirectionDelete,
  handleDirectionMoveUp,
  handleDirectionMoveDown
}) => {
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
          <span style={{ fontSize: '1.3rem' }}>1</span>
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
          className="recipe-input"
          rows={3}
          placeholder="Describe direction step"
          value={direction}
          maxLength={300}
          onChange={(e) => handleDirectionChange(index, e.target.value)} 
        />
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

const CreateDirectionsTable = ({ directions, setDirections }) => {

  const handleDirectionDelete = (indexToDelete) => {
    setDirections(prevDirections => {
      return prevDirections.filter((_, index) => index !== indexToDelete);
    });
  };

  const handleDirectionChange = (index, value) => {
      const newDirections = [...directions];
      newDirections[index] = value;
      setDirections(newDirections);
  };

  const handleDirectionAdd = () => {
    setDirections(prevDirections => [...prevDirections, '']);
  };

  const handleDirectionMoveUp = (index) => {
    const newDirections = [...directions];
    const temp = newDirections[index];
    newDirections[index] = newDirections[index - 1];
    newDirections[index - 1] = temp;
    setDirections(newDirections);
  };

  const handleDirectionMoveDown = (index) => {
    const newDirections = [...directions];
    const temp = newDirections[index];
    newDirections[index] = newDirections[index + 1];
    newDirections[index + 1] = temp;
    setDirections(newDirections);
  };

  return (
    <>
      <Form.Label className="mt-4" style={{ fontSize: '1.5rem' }}>Directions</Form.Label>
      <Table striped bordered>
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
    </>
  );
}

export default CreateDirectionsTable;