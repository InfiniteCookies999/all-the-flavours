import { useCallback, useEffect, useRef, useState } from "react";
import useWindowResize from "../hooks/useWindowResize";
import theme from "../theme";
import useResponsiveValue from "../hooks/useResponsitveValue";

const SocialLink = ({ svg, href }) => {
  return (
    <a href={href}>
      <img src={svg} alt='Social Icon' width="30" height="30" />
    </a>
  );
};

const AboutUs = () => {

  const imageCoverRef = useRef(null);
  const [imageCoverHeight, setImageCoverHeight] = useState(0);

  const paragraphPaddingBreakpoints = {
    small: '0',
    medium: '2rem',
    large: '12rem',
    other: '12rem'
  };

  const paragraphPadding = useResponsiveValue(paragraphPaddingBreakpoints);

  useEffect(() => {
    document.title = "About Us";
  }, []);

  const imageHeightChange = useCallback(() => {
    const imageCover = imageCoverRef.current;
    if (!imageCover) {
      return;
    }

    const height = imageCover.getBoundingClientRect().height;
    setImageCoverHeight(height);

  }, [setImageCoverHeight, imageCoverRef]);

  useWindowResize(imageHeightChange);

  return (
    <>
      <div style={{
        position: 'absolute',
        overflow: 'hidden',
        width: '100%',
        top: 0,
        left: 0,
        marginTop: '5.5rem',
        margin: 0
        }}>
        <img
          className="w-100"
          src="/about-us-cover.jpg"
          alt="about us"
          style={{
            zIndex: -1, // Ensures the image stays behind the text
          }}
          ref={imageCoverRef}
          onLoad={imageHeightChange}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -30%)',
            color: 'white',
            textAlign: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adds a translucent background
            padding: '1rem 2rem',
            borderRadius: '8px'
          }}>
          <h1>Welcome to Our Recipe World</h1>
          <p>Explore delicious recipes and culinary secrets.</p>
        </div>
      </div>
      
      <div className="w-100 position-absolute" style={{
        left: 0,
        right: 0,
        top: 0,
        height: '4rem',
        transform: `translateY(calc(${imageCoverHeight}px - 2px))`,
        backgroundColor: theme.colors.primaryLight
      }}>
      </div>

      <div style={{
        marginTop: `calc(${imageCoverHeight}px + 7rem)`
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h1>All The Flavours</h1>
          <div style={{
            display: 'flex',
            gap: '1rem'
          }}>
            <SocialLink svg='/twitter-icon.svg'
                        href='http://twitter.com'>
            </SocialLink>
            <SocialLink svg='/linkedin-icon.svg'
                        href='https://linkedin.com'>
            </SocialLink>
            <SocialLink svg='/youtube-icon.svg'
                        href='https://youtube.com'>
            </SocialLink>
            <SocialLink svg='/instagram-icon.svg'
                        href='https://instagram.com'>
            </SocialLink>
            <SocialLink svg='/github-icon.svg'
                        href='https://github.com'>
            </SocialLink>
          </div>
        </div>

        <div className="mt-4" style={{
          paddingLeft: paragraphPadding,
          paddingRight: paragraphPadding
          }}>
          <div style={{ height: '1px', backgroundColor: 'gray', marginBottom: '2rem' }}></div>
          <p className="med-responsive-text" style={{ color: '#4a4a4a' }}>
            Welcome to our recipe website, where culinary enthusiasts can explore a diverse collection of delicious recipes. Whether you're looking for quick weeknight dinners, indulgent desserts, or healthy meals, we have something for everyone. Join us as we share tips, techniques, and the joy of cooking!
          </p>
          <div style={{ height: '1px', backgroundColor: 'gray', marginTop: '2rem' }}></div>
        </div>

        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1rem' }}>What Our Users Say</h2>
          
          <blockquote>
            "This website has transformed my cooking! The recipes are easy to follow and delicious!"
            <footer style={{ color: 'gray' }}>— Happy Cook</footer>
          </blockquote>

          <blockquote style={{ margin: '1rem 0' }}>
            "I love the variety of recipes available. I can always find something new to try!"
            <footer style={{ color: 'gray' }}>— Culinary Explorer</footer>
          </blockquote>
          
          <blockquote style={{ margin: '1rem 0' }}>
            "The step-by-step instructions are a game changer. I've made dishes I never thought I could!"
            <footer style={{ color: 'gray' }}>— Beginner Chef</footer>
          </blockquote>
          
          <blockquote style={{ margin: '1rem 0' }}>
            "Every recipe I've tried has turned out amazing. This site is my go-to for meal planning!"
            <footer style={{ color: 'gray' }}>— Meal Planner Extraordinaire</footer>
          </blockquote>
        </div>
      </div>

      <style>
        {`
          .container {
            min-height: 0rem !important;
          }
        `}
      </style>
    </>
  );
}

export default AboutUs;