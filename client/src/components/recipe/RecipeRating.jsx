import { useContext } from "react";
import InfoSeperationBar from "../InfoSeperationBar";
import StarRating from "./RecipeStarRating";
import RecipeContext from "../../contexts/RecipeContext";

const getRankingPostfix = (ranking) => {
  const lastDigit = ranking % 10;
  const lastTwoDigits = ranking % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return "th";
  }

  switch (lastDigit) {
  case 1: return "st";
  case 2: return "nd";
  case 3: return "rd";
  default: return "th";
  }
}

const Rating = () => {
  
  const context = useContext(RecipeContext);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center'
    }}>
      <StarRating rating={context.rating} numberReviews={context.numberReviews} />
      <InfoSeperationBar height={'20px'} margin="1rem" />
      {/* Indication of how popular in comparison it is. */}
      <div style={{ fontSize: '1.1rem' }}>
        <span style={{ fontWeight: 'bold' }}>
          #
        </span>
        <span style={{
          color: 'black'
        }}>
          {context.ranking}
        </span>
        <span style={{
          color: 'gray'
        }}>
          {getRankingPostfix(context.ranking)} rated
        </span>
      </div>
    </div>
  );
}

export default Rating;