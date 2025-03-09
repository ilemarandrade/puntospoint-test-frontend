import { filtersByDates } from '@/constants/filters-by-dates';
import {
  EnumDateMainParameters,
  IThisMonthSubParameters,
  IThisWeekSubParameters,
} from '@/types/filters-by-dates';
import { useCallback, useMemo, useState } from 'react';

const useFilters: () => {
  parameterActive: EnumDateMainParameters;
  subParameterActive: string;
  onParameter: (parameter: EnumDateMainParameters) => void;
  onSubParameter: (subParameter: string) => void;
  title?: string;
  subParameters?:
    | IThisWeekSubParameters[]
    | IThisMonthSubParameters[]
    | number[];
  tags: string[];
  onTags: (tag: string) => void;
} = () => {
  const [parameterActive, setParameterActive] = useState(
    EnumDateMainParameters.TODAY
  );
  const [subParameterActive, setSubParameterActive] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

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
    (tag: string) => {
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
      const firstSubParameter =
        typeof currentSubParameters?.[0] === 'number'
          ? `${currentSubParameters?.[0]}`
          : currentSubParameters?.[0]?.name;

      setSubParameterActive(firstSubParameter);
    }

    return currentSubParameters;
  }, [parameterActive]);

  const title = useMemo(() => {
    const currentParameter = filtersByDates.find(
      (item) => item.parameter === parameterActive
    );

    return currentParameter?.title;
  }, [parameterActive]);

  return {
    parameterActive,
    subParameterActive,
    onParameter: handleClickParameter,
    onSubParameter: handleClickSubParameter,
    subParameters,
    title,
    tags,
    onTags: handleClickTag,
  };
};

export default useFilters;
