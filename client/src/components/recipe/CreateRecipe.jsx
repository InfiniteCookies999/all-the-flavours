import { useCallback, useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";
import RecipeCarousel from "./RecipeCarousel";
import theme from "../../theme";
import CreateIngredientsTable from "./CreateIngredientsTable";
import CreateDirectionsTable from "./CreateDirectionsTable";
import PrimaryButton from "../PrimaryButton";
import axios from "axios";
import { useError } from "../../contexts/ErrorContext";
import { AuthContext } from "../../contexts/AuthContext";

const CreateRecipeContainer = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    width: 80%; 
  }
`;

const CreateRecipe = () => {

  const [title, setTitle] = useState('');
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([
    {
      wholeAmount: '0',
      fractionAmount: '0',
      unit: '',
      name: ''
    }
  ]);
  const [directions, setDirections] = useState([ '' ]);

  const [titleError, setTitleError] = useState('');
  const [imagesError, setImagesError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [ingredientsError, setIngredientsError] = useState('');
  const [ingredientsFieldErrors, setIngredientsFieldErrors] = useState([]);
  const [directionsError, setDirectionsError] = useState('');
  const [directionsFieldErrors, setDirectionsFieldErrors] = useState([]);

  const [titleValid, setTitleValid] = useState(true);
  const [imagesValid, setImagesValid] = useState(true);
  const [descriptionValid, setDescriptionValid] = useState(true);
  const [ingredientsValid, setIngredientsValid] = useState(true);
  const [ingredientsFieldsValid, setIngredientsFieldsValid] = useState(true);
  const [directionsValid, setDirectionsValid] = useState(true);
  const [directionFieldsValid, setDirectionsFieldsValid] = useState(true);

  const { setError } = useError();

  const { isLoggedIn } = useContext(AuthContext);

  const [submitValid, setSubmitValid] = useState(true);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Create recipe";
  }, []);

  const updateTitleError = () => {
    const input = document.getElementById('title-input');
    const title = input.value;
    
    if (title.length === 0) {
      setTitleError("empty");
      return false;
    }
    if (title.length < 10) {
      setTitleError("too short");
      return false;
    }
    return true;
  };

  const updateDescriptionError = () => {
    const input = document.getElementById('description-input');
    const description = input.value;

    if (description.length === 0) {
      setDescriptionError("empty");
      return false;
    }
    if (description.length < 30) {
      setDescriptionError("too short");
      return false;
    }
    return true;
  };

  const updateImagesError = () => {
    if (images.length === 0) {
      setImagesError("must have at least one image");
      return false;
    }
    return true;
  };

  const updateIngredientsError = () => {
    if (ingredients.length === 1) {
      setIngredientsError("no ingredients added");
      return false;
    }
    return true;
  };

  const updateDirectionsError = () => {
    if (directions.length === 1) {
      setDirectionsError("no directions added");
      return false;
    }
    return true;
  };

  const updateIngredientsFieldErrors = useCallback((ingredients) => {
    
    const fieldErrors = [];
    let fieldsValid = true;

    for (let i = 0; i < ingredients.length; i++) {
      const fieldError = {
        amountError: '',
        unitError: '',
        nameError: ''
      };      

      const ingredient = ingredients[i];
      if (i === ingredients.length - 1) {
        // TODO: should probably warn if the fields are not all zeroed out?
        fieldErrors.push(fieldError);
        continue;
      }

      if (ingredient.wholeAmount === '0' &&
          ingredient.fractionAmount === '0'
      ) {
        fieldError.amountError = "amount cannot be zero";
        fieldsValid = false;
      }

      if (ingredient.unit === '') {
        fieldError.unitError = "empty";
        fieldsValid = false;
      }

      if (ingredient.name === '') {
        fieldError.nameError = "empty";
        fieldsValid = false;
      }

      fieldErrors.push(fieldError);
    }

    setIngredientsFieldErrors(fieldErrors);
    return fieldsValid;
  }, []);

  const updateDirectionsFieldsErrors = useCallback((directions) => {

    const fieldErrors = [];
    let fieldsValid = true;
    
    for (let i = 0; i < directions.length; i++) {
      if (i === directions.length - 1) {
        // TODO: should probably warn if the text box is not empty?
        fieldErrors.push('');
        continue;
      }

      const directionStep = directions[i];
      let fieldValid = true;
      if (directionStep === '') {
        fieldValid = false;
        fieldErrors.push('empty');
      }

      if (directionStep.length < 3) {
        fieldValid = false;
        fieldErrors.push('too short');
      }

      if (!fieldValid) {
        fieldsValid = false;
      } else {
        fieldErrors.push('');  
      }
    }

    setDirectionsFieldErrors(fieldErrors);
    return fieldsValid;
  }, []);

  const updateErrors = () => {
    const titleValid = updateTitleError();
    const descriptionValid = updateDescriptionError();
    const imagesValid = updateImagesError();
    const ingredientsValid = updateIngredientsError();
    const ingredientsFieldsValid = updateIngredientsFieldErrors(ingredients);
    const directionsValid = updateDirectionsError();
    const directionsFieldsValid = updateDirectionsFieldsErrors(directions);

    setTitleValid(titleValid);
    setDescriptionValid(descriptionValid);
    setImagesValid(imagesValid);
    setIngredientsValid(ingredientsValid);
    setIngredientsFieldsValid(ingredientsFieldsValid);
    setDirectionsValid(directionsValid);
    setDirectionsFieldsValid(directionsFieldsValid);

    return !(
      titleValid &&
      descriptionValid &&
      imagesValid &&
      ingredientsValid &&
      ingredientsFieldsValid &&
      directionsValid &&
      directionsFieldsValid
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (updateErrors()) {
      setSubmitValid(false);
      return;
    }

    const getFractionAmount = (ingredient) => {
     return parseFloat(ingredient.fractionAmount);
    };

    const fileHolder = document.getElementById('imgs-file-input-holder');
    const images = fileHolder.files;

    // Using FormData so that the images may transfer correctly.
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    
    directions.slice(0, -1).forEach((direction, index) => {
      formData.append(`directions[${index}].text`, direction);
    });

    // Append every ingredient as a JSON string.
    ingredients.forEach((ingredient, index) => {
      if (index === ingredients.length - 1) return;

      formData.append(`ingredients[${index}].quantity`, Number.parseFloat(ingredient.wholeAmount) + getFractionAmount(ingredient));
      formData.append(`ingredients[${index}].unit`, ingredient.unit);
      formData.append(`ingredients[${index}].name`, ingredient.name);
    });

    for (let i = 0; i < images.length; i++) {
      formData.append("uploadImages", images[i]);
    }

    axios.post("/api/recipes", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        const recipeId = response.data.id;
        window.location.href = "/recipe/" + recipeId;
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const handleDragOver = (event) => {
      event.preventDefault();
    };

    const handleDrop = (event) => {
      event.preventDefault();
    };

    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('drop', handleDrop);

    return () => {
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('drop', handleDrop);
    };
  }, []);

  if (!isLoggedIn) {
    window.location.href = "/";
    return null;
  }
  
  return (
    <CreateRecipeContainer>
      <h1>Create Recipe</h1>
      <Form className="mt-3" onSubmit={handleSubmit} noValidate>
        <Form.Control id="title-input"
                      type="text"
                      className={"recipe-input " + (!titleValid ? 'is-invalid' : '')}
                      placeholder="Original Cookies"
                      maxLength={70}
                      value={title}
                      onChange={(e) => {
                        if (updateTitleError()) {
                          setTitleValid(true);
                        }
                        setTitle(e.target.value);
                      }} />
        {!titleValid && <div className="text-danger mt-1">{titleError}</div>}

        <RecipeCarousel
          images={images}
          setImages={setImages}
          setImagesValid={setImagesValid}
          imagesValid={imagesValid}
          showEdit={true}
          style={{
            ...(!imagesValid ? { border: '1px solid red' } : {}),
            marginTop: "1rem"
          }} />
        {!imagesValid && <div className="text-danger mt-1">{imagesError}</div>}

        <Form.Label className="mt-4" style={{ fontSize: '1.5rem' }}>Description</Form.Label>
        <Form.Control
          id="description-input"
          as="textarea" 
          className={"recipe-input " + (!descriptionValid ? 'is-invalid' : '')}
          rows={5}
          placeholder="Enter a description for the recipe"
          value={description}
          maxLength={300}
          onChange={(e) => {
            if (updateDescriptionError()) {
              setDescriptionValid(true);
            }
            setDescription(e.target.value);
          }} 
        />
        {!descriptionValid && <div className="text-danger mt-1">{descriptionError}</div>}

        <CreateIngredientsTable
          ingredients={ingredients}
          setIngredients={setIngredients}
          ingredientsValid={ingredientsValid}
          ingredientsError={ingredientsError}
          setIngredientsValid={setIngredientsValid}
          ingredientsFieldsValid={ingredientsFieldsValid}
          ingredientsFieldErrors={ingredientsFieldErrors}
          updateIngredientsFieldErrors={updateIngredientsFieldErrors}
          setIngredientsFieldsValid={setIngredientsFieldsValid}
          />

        <CreateDirectionsTable
          directions={directions}
          setDirections={setDirections}
          directionsValid={directionsValid}
          directionsError={directionsError}
          setDirectionsValid={setDirectionsValid}
          directionFieldsValid={directionFieldsValid}
          directionsFieldErrors={directionsFieldErrors}
          setDirectionsFieldsValid={setDirectionsFieldsValid}
          updateDirectionsFieldsErrors={updateDirectionsFieldsErrors}
          />

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
          <PrimaryButton
            type="submit"
            style={{ width: '9rem', height: '3rem' }}
            className={"mt-4 submit-btn " + (!submitValid ? 'submit-invalid-btn' : '')}
            disabled={loading}>
            Submit
          </PrimaryButton>
          {!submitValid && <div className="text-danger mt-1">There is one or more errors in your form</div>}
        </div>

      </Form>
      <style>
        {`
          .recipe-input:focus {
            outline: none;
            box-shadow: none;
            border: 1px solid ${theme.colors.primaryDark};
          }

          .is-invalid {
            outline: none !important;
            box-shadow: none !important;
          }

          ${theme.styles.submitBtn}
        `}
      </style>
    </CreateRecipeContainer>
  );
};

export default CreateRecipe;