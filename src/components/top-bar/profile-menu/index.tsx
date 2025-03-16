import { ButtonBase, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="w-full h-full flex items-center justify-center gap-1">
      <p className="font-medium text-base leading-6 text-center align-middle">
        Pamela Rojas Gonzalez
      </p>

      <ButtonBase
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          width: 48,
          height: 48,
          margin: 0.5,
          bgcolor: open ? '#d8d7d8' : '',
          borderRadius: '100%',
        }}
        data-testid="profile-button"
      >
        <ExpandMoreRoundedIcon />
      </ButtonBase>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={{
          top: anchorEl?.offsetTop ? anchorEl.offsetTop + 60 : 0,
          left: anchorEl?.offsetLeft ? anchorEl.offsetLeft - 150 : 0,
        }}
        sx={{
          '& .MuiPaper-root': {
            width: 200,
          },
        }}
      >
        <MenuItem onClick={handleClose} sx={{ padding: '12px 16px' }}>
          Editar perfil
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ padding: '12px 16px', gap: 1 }}>
          <LogoutRoundedIcon />
          <p>Cerrar Sesion</p>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
