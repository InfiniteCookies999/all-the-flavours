import { useState } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";
import RecipeCarousel from "./RecipeCarousel";

const CreateRecipeContainer = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    width: 80%; 
  }
`;


const CreateRecipe = () => {

  const [title, setTitle] = useState('');

  document.title = "Create recipe";
  
  const handleSubmit = () => {

  };
  
  return (
    <CreateRecipeContainer>
      <h1>Create Recipe</h1>
      <Form className="mt-3" onSubmit={handleSubmit} noValidate>
        <Form.Control type="text"
                      placeholder="Original Cookies"
                      maxLength={70}
                      onChange={(e) => setTitle(e.target.value)} />

        <RecipeCarousel 
          showEdit={true}
          style={{
            marginTop: "1rem"
          }} />



      </Form>
    </CreateRecipeContainer>
  );
};

export default CreateRecipe;