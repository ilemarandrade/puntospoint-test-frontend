'use client';

import { linksMenu } from '@/constants/links-menu';
import Grid from '@mui/material/Grid2';
import Link from 'next/link';
import ProfileMenu from './profile-menu';

interface DesktopTopBarProps {
  pathname: string;
}

const DesktopTopBar = ({ pathname }: DesktopTopBarProps) => {
  return (
    <>
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
              pathname === link.url ? 'bg-primary text-white' : 'text-primary'
            } rounded-[100px] h-[40px] gap-2 py-2.5 px-6 font-medium text-sm leading-5 tracking-tight text-center`}
          >
            {link.title}
          </Link>
        ))}
      </Grid>
      <Grid size={{ lg: 3 }} sx={{ display: { xs: 'none', lg: 'flex' } }}>
        <ProfileMenu />
      </Grid>
    </>
  );
};

export default DesktopTopBar;
