'use client';

import { useState } from 'react';
import { AppBar, useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import MobileTopBar from './mobile-top-bar';
import DesktopTopBar from './desktop-top-bar';

const TopBar = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <>
      <AppBar position="sticky">
        <Grid
          container
          spacing={2}
          sx={{ position: 'relative' }}
          alignItems="center"
        >
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

          {isMobile ? (
            <MobileTopBar
              pathname={pathname}
              mobileOpen={mobileOpen}
              handleDrawerToggle={handleDrawerToggle}
            />
          ) : (
            <DesktopTopBar pathname={pathname} />
          )}
        </Grid>
      </AppBar>
    </>
  );
};

export default TopBar;
