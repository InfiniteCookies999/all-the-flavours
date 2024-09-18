import { Col, Row } from "react-bootstrap";
import theme from "../theme";
import styled from "styled-components";
import useResponsiveValue from "../hooks/useResponsitveValue";

const iconGroupGap = '0.2rem';
const darkTextColor = 'rgba(255, 255, 255, 0.55)';

const ShowcaseIcon = ({ icon }) => {
  return (
    <span className="material-icons" style={{
      fontSize: '2.8rem',
      marginLeft: iconGroupGap,
      marginRight: iconGroupGap,
      //color: '#99b6c9'
      color: '#faf5eb'
    }}>
      {icon}
    </span>
  );
};

const ConnectWithGroup = ({ icon, text, showIcon }) => {
  return (
    showIcon ? 
      (
        <Row style={{ margin: 0, marginTop: '0.5rem' }}>
          <Col md={1} style={{ paddingLeft: '0.2rem' }}>
            <span className="material-icons">{icon}</span>
          </Col>
          <Col md={11}>
            {text}
          </Col>
        </Row>
      ) :
      (
        <div style={{ marginTop: '1rem' }}>
          {text}
        </div>
      )
  );
};

const StyledSocialLink = styled.a`
  margin-top: 0.2rem;
  display: block;
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }

  &:hover span {
    color: white !important;
  }
`;

const SocialLink = ({ svg, href, text }) => {
  return (
    <StyledSocialLink href={href}>
      <img src={svg} alt='Social Icon' width="20" height="20" />
      <span style={{ color: darkTextColor, marginLeft: '0.5rem' }}>{text}</span>
    </StyledSocialLink>
  );
};

const StyledFooter = styled.footer`
  background-color: ${theme.colors.secondary};
  color: white;
  border-top: 3.5rem solid ${theme.colors.primaryLight};
  padding: 6rem 0;

  .sm-top-margin {
    margin-top: 5rem;
  }

  @media (min-width: 768px) {
    .sm-top-margin {
      margin-top: 0rem;
    }
  }
`;

const SiteFooter = () => {

  const collapsedBreakpoints = {
    small: false,
    medium: false,
    large: true,
    other: true
  };
  
  const notCollapsed = useResponsiveValue(collapsedBreakpoints);

  return (
    <StyledFooter>
      <Row style={{
        // Remove margin because it causes body to overflow.
        margin: 0,
        display: 'flex'
        }}>
        <Col md={4} className="text-center" style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: 'auto'
        }}>
          <div>
            <div style={{ marginBottom: iconGroupGap }}>
              <ShowcaseIcon icon={'egg_alt'}></ShowcaseIcon>
              <ShowcaseIcon icon={'set_meal'}></ShowcaseIcon>
            </div>
            <div style={{ marginBottom: iconGroupGap }}>
              <ShowcaseIcon icon={'ramen_dining'}></ShowcaseIcon>
              <ShowcaseIcon icon={'lunch_dining'}></ShowcaseIcon>
            </div>
            <div style={{ marginTop: iconGroupGap }}>
              <ShowcaseIcon icon={'cake'}></ShowcaseIcon>
              <ShowcaseIcon icon={'bakery_dining'}></ShowcaseIcon>
            </div>
          </div>
          <p className="mb-0 mt-2">&copy; {new Date().getFullYear()} All The Flavours</p>
        </Col>
        <Col md={4} className="text-center sm-top-margin">
          <h4>Connect With Us</h4>
          <div style={{
            color: darkTextColor,
            ...(notCollapsed ? {
              display: 'inline-block',
              textAlign: 'left',  
            } : {})
          }}>
            <ConnectWithGroup icon={'house'}
                              showIcon={notCollapsed}
                              text={
              <>
                <div>ABC Solutions Inc.</div>
                <div>7890 Market Street, Suite 101</div>
                <div>Downtown, Metropolis, NY 10001</div>
                <div>United States</div>
              </>
            }>
            </ConnectWithGroup>
            <ConnectWithGroup icon='mail'
                              showIcon={notCollapsed}
                              text={'contact-us@alltheflavours.com'}>
            </ConnectWithGroup>
            <ConnectWithGroup icon='call'
                              showIcon={notCollapsed}
                              text={'(+1) 124-243-6721'}>
            </ConnectWithGroup>
          </div>
        </Col>
        <Col md={4} className="text-center sm-top-margin">
          <h4>Social Links</h4>
          <div style={{
            display: 'inline-block',
            textAlign: 'left'
          }}>
            <SocialLink svg='/twitter-icon.svg'
                        href='http://twitter.com'
                        text='Twitter'>
            </SocialLink>
            <SocialLink svg='/linkedin-icon.svg'
                        href='https://linkedin.com'
                        text='Linkedin'>
            </SocialLink>
            <SocialLink svg='/youtube-icon.svg'
                        href='https://youtube.com'
                        text='Youtube'>
            </SocialLink>
            <SocialLink svg='/instagram-icon.svg'
                        href='https://instagram.com'
                        text='Instagram'>
            </SocialLink>
            <SocialLink svg='/github-icon.svg'
                        href='https://github.com'
                        text='Github'>
            </SocialLink>
          </div>
        </Col>
      </Row>
    </StyledFooter>
  );
};

export default SiteFooter;