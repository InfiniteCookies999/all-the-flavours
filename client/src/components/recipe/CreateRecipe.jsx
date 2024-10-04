import { useState } from "react";
import { Form, Table } from "react-bootstrap";
import styled from "styled-components";
import RecipeCarousel from "./RecipeCarousel";

const CreateRecipeContainer = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    width: 80%; 
  }
`;

const IngredientRow = ({
  ingredient,
  index,
  handleIngredientChange,
  handleDeleteIngredient,
  onIngredientAdd,
  addIngredient=false
}) => {
  return (
    <tr>
      <td style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Form.Control 
          type="text"
          value={ingredient.wholeAmount}
          onChange={(e) => handleIngredientChange(index, 'wholeAmount', e.target.value)} 
        />
        <Form.Control
          style={{ width: '4rem' }}
          as="select"
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
          value={ingredient.unit}
          onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)} 
        />
      </td>
      <td>
        <Form.Control 
          type="text"
          value={ingredient.name}
          onChange={(e) => handleIngredientChange(index, 'name', e.target.value)} 
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
            // TODO: change to a better icon.
            <span className="material-icons add-ingredient-icon" style={{
              color: '#383838',
              transform: 'translateY(0.4rem)'
            }}
            onClick={() => onIngredientAdd()}>
              data_saver_on
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

const CreateRecipe = () => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([
    {
      wholeAmount: 1,
      fractionAmount: 0,
      unit: 'cup',
      name: 'unsalted butter'
    },
    {
      wholeAmount: 0,
      fractionAmount: 0.5,
      unit: 'cup',
      name: 'white sugar'
    },
    {
      wholeAmount: 2,
      fractionAmount: 0,
      unit: '',
      name: 'egg'
    }
  ]);
  const [incompleteIngredient, setIncompleteIngredient] = useState({
    wholeAmount: 0,
    fractionAmount: 0,
    unit: '',
    name: ''
  });

  document.title = "Create recipe";
  
  const handleDeleteIngredient = (indexToDelete) => {
    setIngredients(prevIngredients => {
      return prevIngredients.filter((_, index) => index !== indexToDelete);
    });
  };

  const handleIngredientChange = (index, field, value) => {
    if (ingredients.length !== index) {
      const newIngredients = [...ingredients];
      newIngredients[index][field] = value;
      setIngredients(newIngredients);
    } else {
      const newIngredient = { ...incompleteIngredient };
      newIngredient[field] = value;
      setIncompleteIngredient(newIngredient)
    }
  };

  const handleIngredientAdd = () => {
    setIngredients(prevIngredients => [...prevIngredients, incompleteIngredient]);
    
    // TODO: detect errors.
    setIncompleteIngredient({
      wholeAmount: 0,
      fractionAmount: 0,
      unit: '',
      name: ''
    });
  };

  const handleSubmit = () => {

  };
  
  return (
    <CreateRecipeContainer>
      <h1>Create Recipe</h1>
      <Form className="mt-3" onSubmit={handleSubmit} noValidate>
        <Form.Control type="text"
                      placeholder="Original Cookies"
                      maxLength={70}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)} />

        <RecipeCarousel 
          showEdit={true}
          style={{
            marginTop: "1rem"
          }} />

        <Form.Label className="mt-4" style={{ fontSize: '1.5rem' }}>Description</Form.Label>
        <Form.Control 
          as="textarea" 
          rows={5} // Adjust rows as needed
          placeholder="Enter a description for the recipe"
          value={description}
          maxLength={300}
          onChange={(e) => setDescription(e.target.value)} 
        />

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
            <IngredientRow
              key={index}
              ingredient={ingredient}
              index={index}
              handleIngredientChange={handleIngredientChange}
              handleDeleteIngredient={handleDeleteIngredient}
              />
          )}
          <IngredientRow
            addIngredient={true}
            ingredient={incompleteIngredient}
            index={ingredients.length}
            handleIngredientChange={handleIngredientChange}
            onIngredientAdd={handleIngredientAdd}
          />
          </tbody>
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
        </Table>

      </Form>
    </CreateRecipeContainer>
  );
};

export default CreateRecipe;