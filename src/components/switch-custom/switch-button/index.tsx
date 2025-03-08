import { ButtonBase } from '@mui/material';

interface IProps {
  children: React.ReactNode;
  isActive?: boolean;
  onClick: () => void;
}

const SwitchButton: React.FC<IProps> = ({
  children,
  isActive = false,
  onClick,
}) => {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        borderRadius: 50,
        padding: '7px 12px',
        gap: 0.5,
        backgroundColor: isActive ? 'primary.main' : '',
        color: isActive ? 'white' : 'primary.main',
      }}
    >
      {children}
    </ButtonBase>
  );
};

export default SwitchButton;
