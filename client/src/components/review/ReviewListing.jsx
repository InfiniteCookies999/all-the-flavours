import StarRating from "../recipe/RecipeStarRating";
import UserAvatar from "../UserAvatar";

const ReviewListing = ({ reviews, loadMoreRef=null }) => {
  return (
    <>
      {reviews.map((review, index) => (
        <div key={review.id} style={{
          backgroundColor: 'white',
          padding: '0.5rem',
          boxShadow: '0 0 4px rgba(0, 0, 0, 0.2)'
        }}
        ref={index === reviews.length - 1 ? loadMoreRef : null}
        >
          <StarRating rating={review.rating / 2} showCursor={false} />
          <a href={`/user/${review.reviewer.id}`} style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            width: 'fit-content'
            }}>
            <UserAvatar src="/example-profile.jpg" style={{
              width: '1.5rem',
              height: '1.5rem'
              }} />
            <span style={{ color: 'gray' }}>
              by {review.reviewer.firstName} {review.reviewer.lastName}
            </span>
          </a>
          <p className="mt-2">{review.text}</p>
        </div>
      ))}
    </>
  );
}

export default ReviewListing;