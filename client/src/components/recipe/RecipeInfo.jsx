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

const RecipeInfo = ({ reviewsRef }) => {

  const context = useContext(RecipeContext);

  console.log("context.user: ", context.user);

  return (
    <>
      <Rating reviewsRef={reviewsRef} />
      <div style={{
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: '0.5rem'
      }}>
        <div className="profile-link" style={{
          display: 'flex',
          alignItems: 'center',
          width: 'fit-content'
        }}
        onClick={() => {
          window.location.href = "/user/" + context.user.username;
        }}>
          <UserAvatar src={context.user.avatarSrc} style={{
            width: '40px',
            height: '40px'
          }}/>
            <div style={{ lineHeight: '0.9rem' }}>
              <span style={{ marginLeft: '0.2rem', color: '#1c1c1c' }}>
                {context.user.firstName} {context.user.lastName}
              </span>
              <br/>
              <span style={{ fontSize: '0.8rem', marginLeft: '0.2rem', color: 'gray' }}>
                @{context.user.username}
              </span>
            </div>
        </div>
        <InfoSeperationBar height={'20px'} margin="0.8rem" />
        <span style={{
          color: 'gray',
          fontSize: '0.9rem',
          }}>
            Last updated {timeAgo(new Date(context.lastUpdated))}
        </span>
        <InfoSeperationBar height={'20px'} margin="0.8rem" />
        <span
          style={{ color: 'gray', fontSize: '1.8rem' }}
          className="material-icons print-btn"
          onClick={() => window.print()}>
          print
        </span>
        <style>
          {`
            .profile-link:hover {
              cursor: pointer;
            }

            .profile-link:hover span {
              color: gray !important;
            }

            .print-btn:hover {
              cursor: pointer;
              color: #111 !important;
            }
          `}
        </style>
      </div>
    </>
  );
};

export default RecipeInfo;