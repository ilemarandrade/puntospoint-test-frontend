'use client';

import React, { Fragment, useEffect } from 'react';
import Chip from '../chip';
import { filtersByDates } from '@/constants/filters-options';
import SubParameter from './sub-parameters';
import useFilters from './hooks/use-filters';
import FiltersTags from './filters-tags';
import { IFiltersDasboard } from '@/types/recharts';
import { EnumDateMainParameters, EnumFiltersTags } from '@/types/filters';

interface IProps {
  onChangeFilter?: (params: IFiltersDasboard) => void;
}

const FiltersDashboard: React.FC<IProps> = ({ onChangeFilter }) => {
  const {
    parameterActive,
    subParameterActive,
    onParameter,
    onSubParameter,
    subParameters,
    onTags,
    setTags,
    tags,
  } = useFilters();

  useEffect(() => {
    if (onChangeFilter) {
      if (
        parameterActive === EnumDateMainParameters.YTD_YTG &&
        (!tags.includes(EnumFiltersTags.MONEY) || tags.length > 1)
      ) {
        setTags([EnumFiltersTags.MONEY]);
      } else {
        onChangeFilter({
          parameter: parameterActive,
          subParameter: subParameterActive,
          tags,
        });
      }
    }
  }, [onChangeFilter, parameterActive, setTags, subParameterActive, tags]);

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

      <FiltersTags
        onTags={onTags}
        tags={tags}
        isFreezeValues={parameterActive === EnumDateMainParameters.YTD_YTG}
      />
    </div>
  );
};

export default FiltersDashboard;
