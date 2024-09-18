//import '@fortawesome/fontawesome-free/css/all.min.css';
import '@mui/material/styles'; // Import for MUI
import theme from '../theme';

const SiteLogo = ({ navbarHoverClass }) => {
  return (
    <>
    <div style={{
      display: 'flex', 
      alignItems: 'center',
      position: 'relative', 
      width: '60px', 
      height: '60px', 
      marginRight: '10px',
    }}>
      {/* Circle Background */}
      <div style={{
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        width: '60px', 
        height: '60px', 
        borderRadius: '50%', 
        backgroundColor: theme.colors.primaryLight,
        position: 'relative', // Ensure it's on the same level as the icon
      }}>
        {/* Icon */}   
        {<svg xmlns="http://www.w3.org/2000/svg"
             height="24px"
             viewBox="0 -960 960 960"
             width="24px"
             fill="#343a40"
             className='logo-icon'
             style={{
              width: '2rem',
              height: '2rem',
              transition: 'fill 0.3s ease'
              }}>
          <path d="M177-560q14-36 4.5-64T149-680q-33-40-43.5-75.5T102-840h78q-8 38-2.5 62t28.5 52q38 46 48.5 81.5t.5 84.5h-78Zm160 0q14-36 5-64t-32-56q-33-40-44-75.5t-4-84.5h78q-8 38-2.5 62t28.5 52q38 46 48.5 81.5t.5 84.5h-78Zm160 0q14-36 5-64t-32-56q-33-40-44-75.5t-4-84.5h78q-8 38-2.5 62t28.5 52q38 46 48.5 81.5t.5 84.5h-78ZM200-160q-50 0-85-35t-35-85v-200h561q5-34 27-59.5t54-36.5l185-62 25 76-185 62q-12 4-19.5 14.5T720-462v182q0 50-35 85t-85 35H200Zm0-80h400q17 0 28.5-11.5T640-280v-120H160v120q0 17 11.5 28.5T200-240Zm200-80Z"/>
        </svg>}
      </div>
      <style>
        {`
          .${navbarHoverClass}:hover .logo-icon {
            fill: #fff7e8;
          }
        `}
      </style>
    </div>
    </>
  );
};

export default SiteLogo;