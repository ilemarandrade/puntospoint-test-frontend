'use client';

import { linksMenu } from '@/constants/links-menu';
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProfileMenu from './profile-menu.tsx';
import Image from 'next/image';
import { useState } from 'react';
import { List } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import BalanceRoundedIcon from '@mui/icons-material/BalanceRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const drawerWidth = 240;

const TopBar = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <>
      <AppBar position="sticky">
        <Grid container spacing={2} sx={{ position: 'relative' }}>
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
          <Grid
            size={{ xs: 12, lg: 3 }}
            container
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src="/puntospoint-logo.svg"
              alt="Logo"
              width={100}
              height={100}
              className="max-w-[250px] lg:w-6/12"
            />
          </Grid>
          <Grid
            size={{ xs: 'grow', md: 6 }}
            container
            justifyContent={{ xs: 'left', lg: 'center' }}
            alignItems="center"
            sx={{ display: { xs: 'none', lg: 'flex' } }}
          >
            {linksMenu.map((link) => (
              <Link
                key={link.title}
                href={link.url}
                className={`${
                  pathname === link.url
                    ? 'bg-primary text-white'
                    : 'text-primary'
                } rounded-[100px] h-[40px] gap-2 py-2.5 px-6 font-medium text-sm leading-5 tracking-tight text-center`}
              >
                {link.title}
              </Link>
            ))}
          </Grid>
          <Grid size={{ lg: 3 }} sx={{ display: { xs: 'none', lg: 'flex' } }}>
            <ProfileMenu />
          </Grid>
        </Grid>
      </AppBar>

      <nav>
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
          <Box
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          >
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
                          color:
                            pathname === item.url ? 'white' : 'text.primary',
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
      </nav>
    </>
  );
};

export default TopBar;
