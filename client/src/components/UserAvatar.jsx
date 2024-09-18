import PropTypes from 'prop-types';

const UserAvatar = ({ src, style }) => {
  return (
    <div style={{
      display: 'inline-block',
      overflow: 'hidden',
      borderRadius: '50%'
    }}>
      <img src={src} alt="User Avatar" style={{
        ...style,
        borderRadius: '50%'
      }}/>
    </div>
  );
};

UserAvatar.propTypes = {
  src: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default UserAvatar;