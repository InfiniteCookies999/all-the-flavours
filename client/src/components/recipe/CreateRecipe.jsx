import { useState } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";
import RecipeCarousel from "./RecipeCarousel";
import theme from "../../theme";
import CreateIngredientsTable from "./CreateIngredientsTable";
import CreateDirectionsTable from "./CreateDirectionsTable";

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
  const [directions, setDirections] = useState([ '' ]);

  document.title = "Create recipe";

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
          rows={5}
          placeholder="Enter a description for the recipe"
          value={description}
          maxLength={300}
          onChange={(e) => setDescription(e.target.value)} 
        />

        <CreateIngredientsTable
          ingredients={ingredients}
          setIngredients={setIngredients}
          />

        <CreateDirectionsTable
          directions={directions}
          setDirections={setDirections}
          />

      </Form>
      <style>
        {`
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