import { Form, Table } from "react-bootstrap";

const CreateIngredientRow = ({
  ingredient,
  index,
  handleIngredientChange,
  handleDeleteIngredient,
  handleIngredientAdd,
  addIngredient=false
}) => {
  return (
    <tr>
      <td style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Form.Control 
          type="text"
          className="recipe-input"
          value={ingredient.wholeAmount}
          onChange={(e) => {
            const wholeAmount = e.target.value;
            if (!/^[0-9]*$/.test(wholeAmount) || (wholeAmount.startsWith("0") && wholeAmount !== '0')) {
              e.preventDefault();
              return;
            }
            handleIngredientChange(index, 'wholeAmount', wholeAmount);
          }} 
        />
        <Form.Control
          style={{ width: '3rem' }}
          as="select"
          className="recipe-input"
          value={ingredient.fractionAmount}
          onChange={(e) => handleIngredientChange(index, 'fractionAmount', e.target.value)}>
          <option>0</option>
          <option value="0.5">½</option>
          <option value="0.333">⅓</option>
          <option value="0.666">⅔</option>
          <option value="0.25">¼</option>
          <option value="0.75">¾</option>
        </Form.Control>
      </td>
      <td>
        <Form.Control 
          type="text"
          className="recipe-input"
          value={ingredient.unit}
          onChange={(e) => {
            const unit = e.target.value;
            if (!/^[a-zA-Z]*$/.test(unit)) {
              e.preventDefault();
              return;
            }
            handleIngredientChange(index, 'unit', unit);
          }} 
        />
      </td>
      <td>
        <Form.Control 
          type="text"
          className="recipe-input"
          value={ingredient.name}
          onChange={(e) => {
            const name = e.target.value;
            if (!/^[a-zA-Z ]*$/.test(name)) {
              e.preventDefault();
              return;
            }
            handleIngredientChange(index, 'name', name)
          }} 
        />
      </td>
      <td>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%'
        }}>
          {addIngredient ? (
            <span className="material-icons add-ingredient-icon" style={{
              color: '#383838',
              transform: 'translateY(0.4rem)'
            }}
            onClick={() => handleIngredientAdd()}>
              add_circle
            </span>
          ) : (
            <span className="material-icons remove-ingredient-icon" style={{
              color: '#383838',
              transform: 'translateY(0.4rem)'
            }}
            onClick={() => handleDeleteIngredient(index)}>
              delete
            </span>
          )}
        </div>
      </td>
    </tr>
  );
};

const CreateIngredientsTable = ({ 
  ingredients,
  handleIngredientAdd, 
  handleIngredientDelete,
  handleIngredientChange
}) => {
  return (
    <>
      <Form.Label className="mt-4" style={{ fontSize: '1.5rem' }}>Ingredients</Form.Label>
      <Table striped bordered>
       <thead>
          <tr>
            <th>Whole Amount</th>
            <th>Unit</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient, index) =>
            <CreateIngredientRow
              key={index}
              ingredient={ingredient}
              index={index}
              addIngredient={index === ingredients.length - 1}
              handleIngredientAdd={handleIngredientAdd}
              handleIngredientChange={handleIngredientChange}
              handleDeleteIngredient={handleIngredientDelete}
              />
          )}
        </tbody>
      </Table>
    </>
  );
};

/*
 <CreateIngredientRow
          addIngredient={true}
          ingredient={incompleteIngredient}
          index={ingredients.length}
          handleIngredientChange={handleIngredientChange}
          onIngredientAdd={handleIngredientAdd}
        />
*/

export default CreateIngredientsTable;