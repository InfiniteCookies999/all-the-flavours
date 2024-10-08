import { useCallback } from "react";
import { Form, Table } from "react-bootstrap";

const CreateIngredientRow = ({
  ingredient,
  index,
  handleIngredientChange,
  handleDeleteIngredient,
  handleIngredientAdd,
  ingredientsFieldsValid,
  ingredientsFieldErrors,
  addIngredient
}) => {
  const amountNotValid = !ingredientsFieldsValid && ingredientsFieldErrors[index].amountError !== '';
  const unitNotValid = !ingredientsFieldsValid && ingredientsFieldErrors[index].unitError !== '';
  const nameNotValid = !ingredientsFieldsValid && ingredientsFieldErrors[index].nameError !== '';

  return (
    <tr>
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Form.Control 
            type="text"
            className={"recipe-input " + (amountNotValid ? 'is-invalid' : '')}
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
            className={"recipe-input " + (amountNotValid ? 'is-invalid' : '')}
            value={ingredient.fractionAmount}
            onChange={(e) => handleIngredientChange(index, 'fractionAmount', e.target.value)}>
            <option>0</option>
            <option value="0.5">½</option>
            <option value="0.333">⅓</option>
            <option value="0.666">⅔</option>
            <option value="0.25">¼</option>
            <option value="0.75">¾</option>
          </Form.Control>
        </div>
        {amountNotValid && <div className="text-danger mt-1">{ingredientsFieldErrors[index].amountError}</div>}
      </td>
      <td>
        <Form.Control 
          type="text"
          className={"recipe-input " + (unitNotValid ? 'is-invalid' : '')}
          value={ingredient.unit}
          placeholder="cup"
          onChange={(e) => {
            const unit = e.target.value;
            if (!/^[a-zA-Z]*$/.test(unit)) {
              e.preventDefault();
              return;
            }
            handleIngredientChange(index, 'unit', unit);
          }}
        />
        {!ingredientsFieldsValid && <div className="text-danger mt-1">{ingredientsFieldErrors[index].unitError}</div>}
      </td>
      <td>
        <Form.Control 
          type="text"
          className={"recipe-input " + (nameNotValid ? 'is-invalid' : '')}
          value={ingredient.name}
          placeholder="butter"
          onChange={(e) => {
            const name = e.target.value;
            if (!/^[a-zA-Z ]*$/.test(name)) {
              e.preventDefault();
              return;
            }
            handleIngredientChange(index, 'name', name)
          }} 
        />
        {!ingredientsFieldsValid && <div className="text-danger mt-1">{ingredientsFieldErrors[index].nameError}</div>}
      </td>
      <td style={{ width: '5rem' }}>
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
  setIngredients,
  ingredientsValid,
  ingredientsError,
  setIngredientsValid,
  ingredientsFieldsValid,
  ingredientsFieldErrors,
  updateIngredientsFieldErrors,
  setIngredientsFieldsValid
}) => {

  const handleIngredientDelete = useCallback((indexToDelete) => {
    setIngredientsFieldsValid(true); // Set to true because it is complicated to recompute

    setIngredients(prevIngredients => {
      return prevIngredients.filter((_, index) => index !== indexToDelete);
    });
  }, [setIngredients, setIngredientsFieldsValid]);

  const handleIngredientChange = useCallback((index, field, value) => {
      const newIngredients = [...ingredients];
      newIngredients[index][field] = value;
      setIngredients(newIngredients);
      if (updateIngredientsFieldErrors(newIngredients)) {
        setIngredientsFieldsValid(true);
      }
  }, [ingredients, setIngredients, setIngredientsFieldsValid, updateIngredientsFieldErrors]);

  const handleIngredientAdd = useCallback(() => {
    setIngredientsFieldsValid(true); // Set to true because it is complicated to recompute
    setIngredientsValid(true);

    setIngredients(prevIngredients => [...prevIngredients, {
      wholeAmount: '0',
      fractionAmount: '0',
      unit: '',
      name: ''
    }]);
  }, [setIngredients, setIngredientsFieldsValid, setIngredientsValid]);

  return (
    <>
      <Form.Label className="mt-4" style={{ fontSize: '1.5rem' }}>Ingredients</Form.Label>
      <div style={{
        ...(!ingredientsValid ? { border: '1px solid red' } : {}),
        height: 'fit-content'
      }}>
        <Table striped bordered className="m-0">
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
                index={index}
                ingredient={ingredient}
                addIngredient={index === ingredients.length - 1}
                handleIngredientAdd={handleIngredientAdd}
                handleIngredientChange={handleIngredientChange}
                handleDeleteIngredient={handleIngredientDelete}
                ingredientsFieldsValid={ingredientsFieldsValid}
                ingredientsFieldErrors={ingredientsFieldErrors}
                />
            )}
          </tbody>
        </Table>
        <style>
          {`
            .remove-ingredient-icon:hover {
              cursor: pointer;
              color: red !important;
            }

            .add-ingredient-icon:hover {
              cursor: pointer;
              color: green !important;
            }
          `}
        </style>
      </div>
      {!ingredientsValid && <div className="text-danger mt-1">{ingredientsError}</div>}
    </>
  );
};

export default CreateIngredientsTable;