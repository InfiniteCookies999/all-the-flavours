import Rating from "./RecipeRating";
import UserAvatar from "../UserAvatar";
import InfoSeperationBar from "../InfoSeperationBar";
import { useContext } from "react";
import RecipeContext from "../../contexts/RecipeContext";

const timeAgo = (date) => {
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  const interval = Math.floor(seconds / 31536000); // 1 year in seconds

  if (interval > 1) {
    return `${interval} years ago`;
  }
  if (interval === 1) {
    return `1 year ago`;
  }

  const months = Math.floor(seconds / 2592000); // 1 month in seconds
  if (months > 1) {
    return `${months} months ago`;
  }
  if (months === 1) {
    return `1 month ago`;
  }

  const days = Math.floor(seconds / 86400); // 1 day in seconds
  if (days > 1) {
    return `${days} days ago`;
  }
  if (days === 1) {
    return `1 day ago`;
  }

  const hours = Math.floor(seconds / 3600); // 1 hour in seconds
  if (hours > 1) {
    return `${hours} hours ago`;
  }
  if (hours === 1) {
    return `1 hour ago`;
  }

  const minutes = Math.floor(seconds / 60); // 1 minute in seconds
  if (minutes > 1) {
    return `${minutes} minutes ago`;
  }
  if (minutes === 1) {
    return `1 minute ago`;
  }

  return `Just now`;
};

const RecipeInfo = () => {

  const context = useContext(RecipeContext);

  return (
    <>
      <Rating />
      <div style={{
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: '0.5rem'
      }}>
        <div className="profile-link" style={{
          display: 'flex',
          alignItems: 'center',
          alignContent: 'center',
          width: 'fit-content'
        }}>
          {/* TODO: loading the user profile */}
          <UserAvatar src={'/example-profile.jpg'} style={{
            width: '40px',
            height: '40px'
          }}/>
          <span style={{ marginLeft: '0.2rem', color: '#1c1c1c' }}>
            {context.user.firstName} {context.user.lastName}
          </span>
        </div>
        <InfoSeperationBar height={'20px'} margin="0.8rem" />
        <span style={{
          color: 'gray',
          fontSize: '0.9rem',
          }}>
            Last updated {timeAgo(new Date(context.lastUpdated))}
          </span>
        <style>
          {`
            .profile-link:hover {
              cursor: pointer;
            }

            .profile-link:hover span {
              color: gray !important;
            }
          `}
        </style>
      </div>
    </>
  );
};

export default RecipeInfo;