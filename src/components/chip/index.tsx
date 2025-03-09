import { Chip as ChipMui, ChipProps } from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

interface IProps {
  label: string;
  variant?: ChipProps['variant'];
  onDelete?: ChipProps['onDelete'];
  icon?: ChipProps['icon'];
  deleteIcon?: ChipProps['deleteIcon'];
  onClick?: ChipProps['onClick'];
  disabled?: boolean;
}

const Chip: React.FC<IProps> = ({
  label,
  variant,
  onDelete,
  icon,
  deleteIcon = <ClearRoundedIcon />,
  onClick,
  disabled,
}) => {
  return (
    <ChipMui
      label={label}
      variant={variant}
      onDelete={onDelete}
      icon={icon}
      hasIcon={Boolean(icon)}
      hasDeleteIcon={Boolean(onDelete)}
      deleteIcon={deleteIcon}
      onClick={onClick}
      disabled={disabled}
    />
  );
};

export default Chip;
