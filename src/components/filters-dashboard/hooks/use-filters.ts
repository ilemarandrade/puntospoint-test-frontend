import { filtersByDates } from '@/constants/filters-options';
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
} = () => {
  const [parameterActive, setParameterActive] = useState(
    EnumDateMainParameters.TODAY
  );
  const [subParameterActive, setSubParameterActive] = useState<string>('');
  const [tags, setTags] = useState<EnumFiltersTags[]>([
    EnumFiltersTags.CLIENTS,
  ]);

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
      if (tags.includes(tag)) {
        setTags((prev) => prev.filter((item) => item !== tag));
      } else {
        setTags((prev) => [...prev, tag]);
      }
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
  };
};

export default useFilters;
