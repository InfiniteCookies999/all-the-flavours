import PropTypes from 'prop-types';

const UserAvatar = ({ src, style, children, ...props }) => {
  return (
    <div style={{
      display: 'inline-block',
      overflow: 'hidden',
      borderRadius: '50%',
      width: 'fit-content',
      height: 'fit-content',
    }}
    {...props}>
      <img src={src ? src : '/example-profile.jpg'} alt="User Avatar" style={{
        ...style,
        borderRadius: '50%',
        aspectRatio: '1/1'
      }}/>
      {children}
    </div>
  );
};

UserAvatar.propTypes = {
  src: PropTypes.string,
  style: PropTypes.object,
};

export default UserAvatar;