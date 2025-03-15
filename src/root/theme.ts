import { createTheme } from '@mui/material';

declare module '@mui/material' {
  interface TableContainerOwnProps {
    numberOfColumns: number;
  }
  interface ChipPropsVariantOverrides {
    text: true;
  }

  interface ChipOwnProps {
    hasIcon?: boolean;
    hasDeleteIcon?: boolean;
  }
}

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
          gap: 0,
          fontSize: 14,
          height: 40,
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
    MuiChip: {
      styleOverrides: {
        icon: {
          width: 18,
          height: 18,
          color: `rgb(${palette.primary.main})`,
          margin: 0,
        },
        label: {
          padding: 0,
          fontSize: 14,
        },
        deleteIcon: {
          width: 18,
          height: 18,
          margin: 0,
          color: 'rgba(0, 0, 0, 0.87)',
        },
        root: {
          padding: '6px 12px',
          gap: 8,
          borderRadius: 8,
          fontWeight: 500,
          color: '#1D192B',
          variants: [
            {
              props: { variant: 'filled' },
              style: {
                display: 'flex',
                backgroundColor: '#E7DFF8',
                '&:hover': {
                  backgroundColor: `#cec7df`,
                },
                '&:focus': {
                  backgroundColor: `#cec7df`,
                },
                '&:active': {
                  backgroundColor: `#cec7df`,
                },
              },
            },
            {
              props: { variant: 'filled', disabled: true },
              style: {
                backgroundColor: '#e7e2e7',
                opacity: '1 !important',
                '& *': {
                  color: '#9b969b',
                },
              },
            },
            {
              props: { variant: 'outlined' },
              style: {
                borderColor: '#79757F',
                '&:hover': {
                  backgroundColor: `#efebef`,
                },
                '&:focus': {
                  backgroundColor: `#efebef`,
                },
                '&:active': {
                  backgroundColor: `#efebef`,
                },
              },
            },
            {
              props: { variant: 'outlined', disabled: true },
              style: {
                opacity: '1 !important',
                borderColor: '#e7e2e7',
                '& *': {
                  color: '#a8a4a8',
                },
              },
            },
            {
              props: { variant: 'text' },
              style: {
                backgroundColor: 'transparent',
                borderWidth: 0,
                '&:hover': {
                  backgroundColor: `#efebef`,
                },
                '&:focus': {
                  backgroundColor: `#efebef`,
                },
                '&:active': {
                  backgroundColor: `#efebef`,
                },
              },
            },
            {
              props: { hasIcon: true },
              style: {
                paddingLeft: 8,
              },
            },
            {
              props: { icon: true },
              style: {
                paddingRight: 8,
              },
            },
          ],
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { numberOfColumns: 1 },
              style: {
                '& .MuiTableCell-root': {
                  padding: '12px 8px',
                },
              },
            },
          ],
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: 14,
          padding: '12px 24px',
          borderBottomWidth: 0,
          '&:hover': {
            backgroundColor: '#d6d1d6',
          },
          '&:focused': {
            backgroundColor: '#e1dde2',
          },
        },
      },
    },
    MuiTooltip: {
      defaultProps: {
        placement: 'top-start',
        followCursor: true,
      },
      styleOverrides: {
        tooltip: {
          backgroundColor: '#313033',
          borderRadius: 4,
          gap: 10,
          paddingTop: 4,
          paddingRight: 8,
          paddingBottom: 4,
          paddingLeft: 8,
          fontSize: '0.75rem',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          boxShadow: '0px 4px 10px 0px #0000001A',
          paddingTop: 8,
          paddingBottom: 8,
          paddingRight: 16,
          paddingLeft: 16,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 0px 7px 0px #00000026',
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: 'white',
          },
        },
      },
    },
  },
});

export default theme;
