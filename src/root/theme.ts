import { createTheme } from '@mui/material';

const palette = {
  primary: {
    main: '100 75 186',
  },
};

const theme = createTheme({
  palette: {
    primary: {
      main: `rgb(${palette.primary.main})`,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: 14,
          height: 40,
          gap: '8px',
          paddingTop: '10px',
          paddingRight: '24px',
          paddingBottom: '10px',
          paddingLeft: '24px',
          borderRadius: 100,
          LineHeight: 20,
          textTransform: 'capitalize',
          variants: [
            {
              props: { variant: 'outlined' },
              style: {
                borderWidth: 1,
                borderColor: '#79757F',
                '&:hover': {
                  backgroundColor: `rgb(${palette.primary.main} / 8%)`,
                },
                '&:focus': {
                  backgroundColor: `rgb(${palette.primary.main} / 8%)`,
                  borderColor: `rgb(${palette.primary.main})`,
                },
              },
            },
            {
              props: { variant: 'contained' },
              style: {
                color: 'white',
                boxShadow: 'initial',
                '&:hover': {
                  boxShadow: '0px 1px 2px 0px #0000004D',
                  backgroundColor: `rgb(${palette.primary.main})`,
                },
              },
            },
            {
              props: { variant: 'text' },
              style: {
                color: `rgb(${palette.primary.main})`,
                paddingRight: 10,
                paddingLeft: 10,
                paddingTop: 12,
                paddingBottom: 12,
                '&:hover': {
                  backgroundColor: `rgb(${palette.primary.main} / 8%)`,
                },
                '&:focus': {
                  backgroundColor: `rgb(${palette.primary.main} / 12%)`,
                },
                '&:active': {
                  backgroundColor: `rgb(${palette.primary.main} / 12%)`,
                },
              },
            },
          ],
        },
      },
    },
  },
});

export default theme;
