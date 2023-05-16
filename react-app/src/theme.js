import { Button, TextField, Typography, createTheme, ThemeProvider, Box} from '@mui/material';

// colour/typography theme 
const theme = createTheme({
  palette: {
    text: {
      primary: '#4D4D4D', // dark grey text
    },
    primary: {
      main: '#F72585',// pink
      contrastText: '#FFFFFF',
      background: {
        default: '#FFFFFF',
      }
    },
    secondary: {
      main: '#7209B7', // purple
      contrastText: '#FFFFFF',
    },
    button: {
      main: '#F72585', 
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 17,
    letterSpacing: '-0.01562em',
    h1: {
      fontSize: 35,
    },
    h5: {
      fontSize: '1em',
    },
    h6: {
      fontSize: '1.5em',
    },
  },
   components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          letterSpacing: '0.02362em',
        },
      },
    },
  },
});

export default theme;