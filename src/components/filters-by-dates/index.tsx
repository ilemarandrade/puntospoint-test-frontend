import React, { Fragment, useEffect } from 'react';
import Chip from '../chip';
import { filtersByDates } from '@/constants/filters-by-dates';
import { EnumDateMainParameters } from '@/types/filters-by-dates';
import SubParameter from './sub-parameters';
import useFilters from './hooks/use-filters';

interface IProps {
  onChangeFilter?: (params: {
    parameter: EnumDateMainParameters;
    subParameter: string;
  }) => void;
}

const FiltersByDates: React.FC<IProps> = ({ onChangeFilter }) => {
  const {
    parameterActive,
    subParameterActive,
    onParameter,
    onSubParameter,
    title,
    subParameters,
  } = useFilters();

  useEffect(() => {
    onChangeFilter &&
      onChangeFilter({
        parameter: parameterActive,
        subParameter: subParameterActive,
      });
  }, [onChangeFilter, parameterActive, subParameterActive]);

  return (
    <div className="space-y-12">
      <p className="text-xl font-semibold text-black">{title}</p>
      <div className="flex gap-3">
        {filtersByDates.map((item) => (
          <Fragment key={item.label}>
            <Chip
              label={item.label}
              variant={parameterActive === item.parameter ? 'filled' : 'text'}
              onClick={() => onParameter(item.parameter)}
            />
          </Fragment>
        ))}
      </div>

      <div className="flex gap-3 mt-3  min-h-[32px]">
        {subParameters?.map((item, index) => (
          <SubParameter
            key={`sub-parameter-${index}`}
            subParameter={item}
            subParameterActive={subParameterActive}
            handleClickSubParameter={onSubParameter}
          />
        ))}
      </div>
    </div>
  );
};

export default FiltersByDates;
