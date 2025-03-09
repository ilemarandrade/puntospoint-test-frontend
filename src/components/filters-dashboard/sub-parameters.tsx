import { use, useMemo } from 'react';
import Chip from '../chip';

interface IProps {
  subParameterActive: string;
  handleClickSubParameter: (subParameter: string) => void;
  subParameter: any;
}
const SubParameter: React.FC<IProps> = ({
  subParameter,
  subParameterActive,
  handleClickSubParameter,
}) => {
  const label = useMemo(
    () =>
      typeof subParameter === 'number' ? `${subParameter}` : subParameter.label,
    [subParameter]
  );

  const value = useMemo(
    () =>
      typeof subParameter === 'number' ? `${subParameter}` : subParameter.name,
    [subParameter]
  );

  return (
    <Chip
      label={label}
      variant={subParameterActive === value ? 'filled' : 'text'}
      onClick={() => handleClickSubParameter(value)}
    />
  );
};

export default SubParameter;
