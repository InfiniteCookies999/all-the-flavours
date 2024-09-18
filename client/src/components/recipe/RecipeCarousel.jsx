import { useContext, useState } from "react";
import { Carousel } from "react-bootstrap";
import useResponsiveValue from "../../hooks/useResponsitveValue";
import RecipeContext from "../../contexts/RecipeContext";

const RecipeCarousel = () => {

  const context = useContext(RecipeContext);

  const [activeIndex, setActiveIndex] = useState(0); // State for active carousel index.

  // Creating a use effect that will allow us to recalculate the number
  // of images that are displayed based on the window size.
  const imageBreakpointValues = {
    small: 2,
    medium: 3,
    large: 4,
    other: 6
  };
  
  const imageCount = useResponsiveValue(imageBreakpointValues);

  // Get the number of images to display
  const limitedImages = context.images.slice(0, imageCount);
  const tooManyImages = context.images.length > imageCount;

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div style={{
      padding: '0.2rem',
      backgroundColor: '#dedede'
    }}>
      <Carousel
        interval={null} // Prevent auto-scrolling
        activeIndex={activeIndex}
        onSelect={(index) => setActiveIndex(index)}
      >
        {context.images.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={'/images/'+image}
              alt={`Alt ${index}`}
              style={{ 
                minHeight: '500px',
                maxHeight: '500px',
                objectFit: 'cover',
              }}
            />
            <style>
              {`
                .carousel-control-prev, .carousel-control-next {
                  filter: invert(1) grayscale(1) contrast(1) brightness(0.8);
                  color: white;                
                }

                .carousel-indicators .active {
                  background-color: orange !important; /* Dark color for active indicator */
                }

                .carousel-indicators button {
                  background-color: black !important; /* Dark color for indicators */
                }
              `}
            </style>
          </Carousel.Item>
        ))}
      </Carousel>
      <div style={{
        marginTop: '0.5rem',
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap',
        ...(imageCount <= limitedImages.length ? { justifyContent: 'space-between' } : {})
        }}>
        {limitedImages.map((image, index) => (
          <div style={{
            position: 'relative',
            display: 'inline-block',
            width: `calc(100% / ${imageCount} - 0.5rem)`,
            height: '10rem',
            overflow: 'hidden' // Make sure the images stay in the container!
            }}
            className="thumbnail"
            key={index}
            onClick={() => {
              if ((index !== limitedImages.length - 1) || !tooManyImages) {
                handleThumbnailClick(index);
              }
            }}
            >
            <img
              className="d-block w-100 h-100"
              src={'/images/'+image}
              alt={`Alt ${index}`}
              style={{ objectFit: 'cover' }}
            />
            {tooManyImages && index === limitedImages.length - 1 && (
              <div className="w-100 h-100" style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(128, 128, 128, 0.5)', // Gray overlay
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10 // Ensure the overlay appears on top
              }}>
                <span className="material-icons">
                  photo_library
                </span>
                <br/>
                <span>+{context.images.length - imageCount} more</span>
              </div>
            )}
          </div>
        ))}
        <style>
          {`
            .thumbnail:hover {
              cursor: pointer;
            }
          `}
        </style>
      </div>
    </div>
  );
}
export default RecipeCarousel;