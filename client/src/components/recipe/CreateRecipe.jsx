import { useState } from "react";
import { Form, Table } from "react-bootstrap";
import styled from "styled-components";
import RecipeCarousel from "./RecipeCarousel";
import theme from "../../theme";
import CreateIngredientsTable from "./CreateIngredientsTable";

const CreateRecipeContainer = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    width: 80%; 
  }
`;

const CreateRecipe = () => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([
    {
      wholeAmount: 0,
      fractionAmount: 0,
      unit: '',
      name: ''
    }
  ]);

  document.title = "Create recipe";
  
  const handleIngredientDelete = (indexToDelete) => {
    setIngredients(prevIngredients => {
      return prevIngredients.filter((_, index) => index !== indexToDelete);
    });
  };

  const handleIngredientChange = (index, field, value) => {
      const newIngredients = [...ingredients];
      newIngredients[index][field] = value;
      setIngredients(newIngredients);
  };

  const handleIngredientAdd = () => {
    setIngredients(prevIngredients => [...prevIngredients, {
      wholeAmount: 0,
      fractionAmount: 0,
      unit: '',
      name: ''
    }]);
  };

  const handleSubmit = () => {

  };
  
  return (
    <CreateRecipeContainer>
      <h1>Create Recipe</h1>
      <Form className="mt-3" onSubmit={handleSubmit} noValidate>
        <Form.Control type="text"
                      className="recipe-input"
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
          className="recipe-input"
          rows={5} // Adjust rows as needed
          placeholder="Enter a description for the recipe"
          value={description}
          maxLength={300}
          onChange={(e) => setDescription(e.target.value)} 
        />

        <CreateIngredientsTable
          ingredients={ingredients}
          handleIngredientAdd={handleIngredientAdd}
          handleIngredientDelete={handleIngredientDelete}
          handleIngredientChange={handleIngredientChange}
          />

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
            <tr>
              <td>

              </td>
              <td>

              </td>
              <td>

              </td>
            </tr>
          </tbody>
        </Table>
      </Form>
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

          .recipe-input:focus {
            outline: none;
            box-shadow: none;
            border: 1px solid ${theme.colors.primaryDark};
          }
        `}
      </style>
    </CreateRecipeContainer>
  );
};

export default CreateRecipe;