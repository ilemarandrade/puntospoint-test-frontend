'use client';

import { linksMenu } from '@/constants/links-menu';
import { AppBar } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProfileMenu from './profile-menu.tsx';
import Image from 'next/image';

const TopBar = () => {
  const pathname = usePathname();

  return (
    <AppBar position="sticky">
      <Grid container spacing={2}>
        <Grid size={{ xs: 0, sm: 0, lg: 3 }} container alignItems="center">
          <Image
            src="/puntospoint-logo.svg"
            alt="Logo"
            width={100}
            height={100}
            className="w-6/12"
          />
        </Grid>
        <Grid
          size={{ xs: 'grow', lg: 6 }}
          container
          justifyContent={{ xs: 'left', lg: 'center' }}
          alignItems="center"
        >
          {linksMenu.map((link) => (
            <Link
              key={link.title}
              href={link.url}
              className={`${
                pathname === link.url ? 'bg-primary text-white' : 'text-primary'
              } rounded-[100px] h-[40px] gap-2 py-2.5 px-6 font-medium text-sm leading-5 tracking-tight text-center`}
            >
              {link.title}
            </Link>
          ))}
        </Grid>
        <Grid size={{ xs: 'auto', lg: 3 }}>
          <ProfileMenu />
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default TopBar;
