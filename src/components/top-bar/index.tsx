'use client';

import { linksMenu } from '@/constants/links-menu';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  ListItem,
  ListItemButton,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProfileMenu from './profile-menu.tsx';
import Image from 'next/image';
import { useState } from 'react';
import { List } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

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
          <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <List>
              {linksMenu.map((item) => (
                <ListItem key={item.title} disablePadding>
                  <ListItemButton
                    sx={{ textAlign: 'center' }}
                    LinkComponent={Link}
                    href={item.url}
                  >
                    {item.title}
                  </ListItemButton>
                </ListItem>
              ))}
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  Editar Perfil
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  Cerrar Sesion
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
