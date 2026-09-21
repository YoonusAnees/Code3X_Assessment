import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#5b4ff7',
      dark: '#4538dc',
    },

    background: {
      default: '#f7f7fb',
      paper: '#ffffff',
    },

    text: {
      primary: '#171725',
      secondary: '#696974',
    },
  },

  shape: {
    borderRadius: 12,
  },

  typography: {
    fontFamily: 'Inter, Arial, sans-serif',

    h3: {
      fontWeight: 800,
    },

    button: {
      fontWeight: 700,
      textTransform: 'none',
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 50,
          borderRadius: 10,
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },
    },
  },
});