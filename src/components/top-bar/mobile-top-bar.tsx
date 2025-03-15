'use client';

import { linksMenu } from '@/constants/links-menu';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import BalanceRoundedIcon from '@mui/icons-material/BalanceRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

interface MobileTopBarProps {
  pathname: string;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const drawerWidth = 240;

const MobileTopBar = ({
  pathname,
  mobileOpen,
  handleDrawerToggle,
}: MobileTopBarProps) => {
  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{
          mr: 2,
          position: 'absolute',
          left: 0,
          height: '100%',
          display: { xs: 'flex', lg: 'none' },
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Image
              src="/puntospoint-logo.svg"
              alt="Logo"
              width={120}
              height={120}
              className="mx-auto mb-2"
            />
          </Box>
          <Divider />
          <List sx={{ flexGrow: 1 }}>
            {linksMenu.map((item) => (
              <ListItem key={item.title} disablePadding>
                <ListItemButton
                  component={Link}
                  href={item.url}
                  selected={pathname === item.url}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'primary.contrastText',
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      '& svg': {
                        color: pathname === item.url ? 'white' : 'text.primary',
                      },
                    }}
                  >
                    {item.title === 'Dashboard' && <DashboardRoundedIcon />}
                    {item.title === 'Clientes' && <PeopleRoundedIcon />}
                    {item.title === 'Reglas de acumulación' && (
                      <BalanceRoundedIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{
                      fontSize: '0.875rem',
                      fontWeight: pathname === item.url ? 600 : 400,
                      color: pathname === item.url ? 'white' : 'text.primary',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PersonRoundedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Editar Perfil"
                  sx={{
                    fontSize: '0.875rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ color: 'error.main' }}>
                <ListItemIcon sx={{ color: 'inherit' }}>
                  <LogoutRoundedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Cerrar Sesión"
                  sx={{
                    fontSize: '0.875rem',
                    color: 'inherit',
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default MobileTopBar;
