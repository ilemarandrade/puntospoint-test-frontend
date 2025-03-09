'use client';

import React, { Fragment, useEffect } from 'react';
import Chip from '../chip';
import { filtersByDates } from '@/constants/filters-options';
import { EnumDateMainParameters } from '@/types/filters';
import SubParameter from './sub-parameters';
import useFilters from './hooks/use-filters';
import FiltersTags from './filters-tags';

interface IProps {
  onChangeFilter?: (params: {
    parameter: EnumDateMainParameters;
    subParameter: string;
    tags: string[];
  }) => void;
}

const FiltersByDashboard: React.FC<IProps> = ({ onChangeFilter }) => {
  const {
    parameterActive,
    subParameterActive,
    onParameter,
    onSubParameter,
    subParameters,
    onTags,
    tags,
  } = useFilters();

  useEffect(() => {
    onChangeFilter &&
      onChangeFilter({
        parameter: parameterActive,
        subParameter: subParameterActive,
        tags,
      });
  }, [onChangeFilter, parameterActive, subParameterActive, tags]);

  return (
    <div className="space-y-12">
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

      <FiltersTags onTags={onTags} tags={tags} />
    </div>
  );
};

export default FiltersByDashboard;
