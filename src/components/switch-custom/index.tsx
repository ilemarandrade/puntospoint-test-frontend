import StarRoundedIcon from '@mui/icons-material/StarRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import { useCallback, useState } from 'react';
import SwitchButton from './switch-button';

interface IProps {
  onClick: () => void;
}

const SwitchCustom: React.FC<IProps> = ({ onClick }) => {
  const [indexActive, setIndexActive] = useState(0);

  const handleClick = useCallback(
    (index: number) => {
      setIndexActive(index);
      onClick();
    },
    [indexActive]
  );

  return (
    <div className="flex border border-primary rounded-full p-1">
      <SwitchButton isActive={indexActive === 0} onClick={() => handleClick(0)}>
        <BarChartRoundedIcon />
        <span className="text-sm">Gráfico</span>
      </SwitchButton>
      <SwitchButton isActive={indexActive === 1} onClick={() => handleClick(1)}>
        <StarRoundedIcon />
        <span className="text-sm">Pulso</span>
      </SwitchButton>
    </div>
  );
};

export default SwitchCustom;
