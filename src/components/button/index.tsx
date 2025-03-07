import { Button as ButtonMui, ButtonProps } from '@mui/material';

interface IProps extends ButtonProps {}

const Button: React.FC<IProps> = ({ variant = 'contained', ...rest }) => {
  return <ButtonMui variant={variant} {...{ ...rest }} />;
};

export default Button;
