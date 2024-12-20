import PropTypes from 'prop-types';
import { Carousel } from "react-bootstrap";
import useResponsiveValue from "../../hooks/useResponsitveValue";
import { useCallback, useEffect, useRef, useState } from "react";

const acceptedFileTypes = [ 'image/jpg', 'image/jpeg', 'image/png', 'image/webp' ];
const maxImages = 10;

const RecipeCarousel = ({ images, setImages, style, setImagesValid, showEdit=false }) => {

  const [activeIndex, setActiveIndex] = useState(0); // State for active carousel index.
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [disableTransition, setDisableTransition] = useState(false);
  const [draggingImage, setDraggingImage] = useState(false);

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
  const limitedImages = images.slice(0, imageCount);
  const tooManyImages = images.length > imageCount;

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };

  const editIconClass = {
    margin: '1rem',
    fontSize: '2.4rem',
    zIndex: 20,
    userSelect: 'none'
  };

  const addNewImage = useCallback((file) => {
    setImagesValid(true);

    const fileHolder = document.getElementById('imgs-file-input-holder');
    const transfer = new DataTransfer();
    for (const f of fileHolder.files) {
      transfer.items.add(f);
    }
    transfer.items.add(file);
    fileHolder.files = transfer.files;

    const newImageUrl = URL.createObjectURL(file);
    setImages(prevImages => {
      const updatedImages = [...prevImages, newImageUrl];
      
      setDisableTransition(true);
      setActiveIndex(updatedImages.length - 1);
      
      return updatedImages;
    });
  }, [setImages, setImagesValid]);

  const selectImage = useCallback(() => {
    const selector = document.getElementById('file-selector');

    selector.onchange = () => {
      const file = selector.files[0];
      if (file) {
        addNewImage(file);
      }
    };

    selector.click();
  }, [addNewImage]);

  const deleteImage = useCallback((indexToDelete) => {
    
    const fileHolder = document.getElementById('imgs-file-input-holder');
    const newFiles = Array.from(fileHolder.files);
    newFiles.splice(indexToDelete, 1);
    const transfer = new DataTransfer();
    for (const f of newFiles) {
      transfer.items.add(f);
    }
    fileHolder.files = transfer.files;

    setImages((prevImages) => {
      const updatedImages = prevImages.filter((_, index) => index !== indexToDelete);
      
      setDisableTransition(true);
      if (activeIndex >= updatedImages.length) {
        setActiveIndex(updatedImages.length - 1);
      } else if (activeIndex === indexToDelete) {
        setActiveIndex(Math.max(activeIndex - 1, 0));
      }

      return updatedImages;
    });
  }, [activeIndex, setImages]);

  const handleImageDragOver = useCallback((event) => {
    event.preventDefault();

    setDraggingImage(true);
  }, [setDraggingImage]);

  const handleImageDragLeave = () => {
    setDraggingImage(false);
  };

  const handleImageDragDrop = useCallback((event) => {
    event.preventDefault();
    setDraggingImage(false);

    const files = event.dataTransfer.files;
    const isValidImage = Array.from(files)
      .every(file => acceptedFileTypes.includes(file.type));

    if (files.length > 0 && isValidImage) {
      const file = files[0];

      if (file) {
        addNewImage(file);
      }
    }
  }, [addNewImage]);

  // Allow dragging images over the controls as well.
  const carouselRef = useRef(null);

  useEffect(() => {
    if (!showEdit) {
      return;
    }

    const carousel = carouselRef.current?.element;

    if (!carousel) {
      return;
    }

    const prevControl = carousel.querySelector('.carousel-control-prev');
    const nextControl = carousel.querySelector('.carousel-control-next');

    if (prevControl) {
      prevControl.addEventListener('dragover', handleImageDragOver);
      prevControl.addEventListener('dragleave', handleImageDragLeave);
      prevControl.addEventListener('drop', handleImageDragDrop);
    }
  
    if (nextControl) {
      nextControl.addEventListener('dragover', handleImageDragOver);
      nextControl.addEventListener('dragleave', handleImageDragLeave);
      nextControl.addEventListener('drop', handleImageDragDrop);
    }
  
    return () => {
      if (prevControl) {
        prevControl.removeEventListener('dragover', handleImageDragOver);
        prevControl.removeEventListener('dragleave', handleImageDragLeave);
        prevControl.removeEventListener('drop', handleImageDragDrop);
      }
  
      if (nextControl) {
        nextControl.removeEventListener('dragover', handleImageDragOver);
        nextControl.removeEventListener('dropleave', handleImageDragLeave);
        nextControl.removeEventListener('drop', handleImageDragDrop);
      }
    }
  }, [showEdit, images, handleImageDragDrop, handleImageDragOver]);

  const imageSize = '500px';

  return (
    <div style={{
      padding: '0.2rem',
      backgroundColor: '#dedede',
      ...style
    }}
    >
      <input
        id="file-selector"
        type="file"
        accept={acceptedFileTypes.join(', ')}
        hidden={true} />

      <input
        id="imgs-file-input-holder"
        type="file"
        name="file-holder" multiple="multiple" hidden={true}
        />
      {images.length > 0 ? (
        <>
          <Carousel
            ref={carouselRef}
            interval={null} // Prevent auto-scrolling
            activeIndex={activeIndex}
            onSelect={(index) => setActiveIndex(index)}
            onSlide={() => setIsTransitioning(true)}
            onSlid={() => {
              setIsTransitioning(false)
              setDisableTransition(false);
            }}
            controls={images.length > 0}
            className={disableTransition ? "disable-transition" : ""}
          >
            {images.map((image, index) => (
              <Carousel.Item
                key={index}
                onDragOver={(e) => {
                  if (images.length < maxImages) {
                    handleImageDragOver(e);
                  } else {
                    e.preventDefault();
                  }
                }}
                onDragLeave={() => {
                  if (images.length < maxImages) {
                    handleImageDragLeave();
                  }
                }}
                onDrop={(e) => {
                  if (images.length < maxImages) {
                    handleImageDragDrop(e);
                  } else {
                    e.preventDefault();
                  }
                }}>
                {showEdit && !isTransitioning && (
                  <>
                    <span className="material-icons position-absolute trash-img-icon" style={{
                      right: 0,
                      ...editIconClass
                    }}
                    onClick={() => deleteImage(index)}>
                      delete
                    </span>
                    {images.length < maxImages && (
                      <>
                        <span className="material-icons position-absolute add-img-icon" style={
                          editIconClass
                        }
                        onClick={selectImage}>
                          add_circle
                        </span>
                        <div style={{
                          width: '100%',
                          height: imageSize,
                          position: 'absolute',
                          border: draggingImage ? "2px solid black" : "",
                          zIndex: 25,
                          pointerEvents: 'none'
                        }}>
                        </div>
                      </>
                    )}
                  </>
                )}
                <img
                  className="d-block w-100"
                  src={image}
                  alt={`Alt ${index}`}
                  style={{ 
                    minHeight: imageSize,
                    maxHeight: imageSize,
                    objectFit: 'cover',
                  }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
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

              .trash-img-icon:hover {
                color: red !important;
                cursor: pointer;
              }

              .add-img-icon:hover {
                color: gray !important;
                cursor: pointer;
              }

              .disable-transition .carousel-item {
                transition: none !important;
              }
            `}
          </style>
        </>
      ) : (
        <>
          <div className="click-drag-area" style={{
            width: '100%',
            height: `calc(${imageSize} + 0.2rem)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}
          onClick={selectImage}
          onDragOver={(e) => handleImageDragOver(e)}
          onDragLeave={handleImageDragLeave}
          onDrop={(e) => handleImageDragDrop(e)}>
            <span style={{ fontSize: '1.4rem' }}>
              Click to add or drag an image
            </span>
          </div>
          <style>
            {`
              .click-drag-area:hover {
                cursor: pointer;
                border: 2px dashed black;
              }

              ${draggingImage ? `
                  .click-drag-area {
                    border: 2px solid black;
                  }
                ` : ''}
            `}
          </style>
        </>
      )}
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
              src={image}
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
                <span>+{images.length - imageCount} more</span>
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

RecipeCarousel.propTypes = {
  images: PropTypes.array.isRequired,
  setImages: PropTypes.func,
  style: PropTypes.object,
  showEdit: PropTypes.bool
};

export default RecipeCarousel;