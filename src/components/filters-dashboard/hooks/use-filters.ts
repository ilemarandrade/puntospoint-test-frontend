import { filtersByDates, filterTags } from '@/constants/filters-options';
import {
  EnumDateMainParameters,
  EnumFiltersTags,
  IThisMonthSubParameters,
  IThisWeekSubParameters,
  IYearsParamerters,
} from '@/types/filters';
import { useCallback, useMemo, useState } from 'react';

const useFilters: () => {
  parameterActive: EnumDateMainParameters;
  subParameterActive: string;
  onParameter: (parameter: EnumDateMainParameters) => void;
  onSubParameter: (subParameter: string) => void;
  subParameters?:
    | IThisWeekSubParameters[]
    | IThisMonthSubParameters[]
    | IYearsParamerters[];
  tags: EnumFiltersTags[];
  onTags: (tag: EnumFiltersTags) => void;
  setTags: (tags: EnumFiltersTags[]) => void;
  rangeDate: { from: Date; to: Date } | undefined;
  setRangeDate: (rangeDate: { from: Date; to: Date }) => void;
} = () => {
  const [parameterActive, setParameterActive] = useState(
    EnumDateMainParameters.TODAY
  );
  const [subParameterActive, setSubParameterActive] = useState<string>('');
  const [tags, setTags] = useState<EnumFiltersTags[]>([
    EnumFiltersTags.CLIENTS,
  ]);
  const [rangeDate, setRangeDate] = useState<{ from: Date; to: Date }>();

  const handleClickParameter = useCallback(
    (parameter: EnumDateMainParameters) => {
      setParameterActive(parameter);
    },
    []
  );

  const handleClickSubParameter = useCallback((subParameter: string) => {
    setSubParameterActive(subParameter);
  }, []);

  const handleClickTag = useCallback(
    (tag: EnumFiltersTags) => {
      const group = Object.values(filterTags).find((group) =>
        group.some((item) => item.value === tag)
      );

      if (!group) return;

      const selectedGroupTags = group.filter((item) =>
        tags.includes(item.value)
      );

      if (selectedGroupTags.length > 0) {
        setTags((prev) =>
          prev.filter(
            (item) => !selectedGroupTags.map((t) => t.value).includes(item)
          )
        );
      }

      setTags((prev) => [...prev, tag]);
    },
    [tags]
  );

  const subParameters = useMemo(() => {
    const currentSubParameters = filtersByDates.find(
      (item) => item.parameter === parameterActive
    )?.subParameters;

    if (currentSubParameters?.length) {
      const newSubParameter = currentSubParameters?.[0]?.name;

      setSubParameterActive(newSubParameter);
    }

    return currentSubParameters;
  }, [parameterActive]);

  return {
    parameterActive,
    subParameterActive,
    onParameter: handleClickParameter,
    onSubParameter: handleClickSubParameter,
    subParameters,
    tags,
    onTags: handleClickTag,
    setTags,
    rangeDate,
    setRangeDate,
  };
};

export default useFilters;
