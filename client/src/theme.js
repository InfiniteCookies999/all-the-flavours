const primary = '#fcac19';
const primaryLight = '#ffcb6b';
const primaryDark = '#e89907';

const theme = {
  colors: {
    primary,
    primaryLight,
    primaryDark,
    secondary: 'rgb(33, 37, 41)',
    background: 'white',
    backgroundLight: '#f7f7f7'
  },
  styles: {
    submitBtn: `
      .submit-btn:hover {
        background-color: ${primaryDark} !important;
        border-color: ${primaryDark} !important;
      }

      .submit-btn:not[submit-invalid-btn]:focus {
        outline: none !important;
        box-shadow: none !important;
      }

      .submit-invalid-btn {
        border-color: red !important;
        box-shadow: 0 0 2px red;
      }
    `
  }
};

export default theme;