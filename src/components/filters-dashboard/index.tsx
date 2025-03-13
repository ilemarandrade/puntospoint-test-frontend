'use client';

import React, { Fragment, useCallback, useEffect } from 'react';
import Chip from '../chip';
import { filtersByDates } from '@/constants/filters-options';
import SubParameter from './sub-parameters';
import useFilters from './hooks/use-filters';
import FiltersTags from './filters-tags';
import { IFiltersDasboard } from '@/types/recharts';
import { EnumDateMainParameters, EnumFiltersTags } from '@/types/filters';
import DatePickerPopover from './date-picker-chip';

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
    rangeDate,
    setRangeDate,
  } = useFilters();

  const handleOnRangeChange = useCallback((from: Date, to: Date) => {
    setRangeDate({ from, to });
  }, []);

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
          from: rangeDate?.from,
          to: rangeDate?.to,
        });
      }
    }
  }, [
    onChangeFilter,
    parameterActive,
    rangeDate?.from,
    rangeDate?.to,
    setTags,
    subParameterActive,
    tags,
  ]);

  return (
    <div className="space-y-12">
      <div className="flex gap-3">
        {filtersByDates.map((item) => (
          <Fragment key={item.label}>
            {item.parameter === EnumDateMainParameters.CUSTOM ? (
              <DatePickerPopover
                rangeMode
                onClick={() => onParameter(item.parameter)}
                isSelected={parameterActive === item.parameter}
                onRangeChange={handleOnRangeChange}
                initialDate={rangeDate}
              />
            ) : (
              <Chip
                label={item.label}
                variant={parameterActive === item.parameter ? 'filled' : 'text'}
                onClick={() => onParameter(item.parameter)}
              />
            )}
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
