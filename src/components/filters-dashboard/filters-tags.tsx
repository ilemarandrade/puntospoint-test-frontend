import { filterTags } from '@/constants/filters-options';
import Chip from '../chip';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { EnumFiltersTags } from '@/types/filters';
import { useMemo } from 'react';

interface IProps {
  tags: string[];
  isFreezeValues?: boolean;
  onTags: (tag: EnumFiltersTags) => void;
}

const FiltersTags: React.FC<IProps> = ({
  tags,
  onTags,
  isFreezeValues = false,
}) => {
  const tagsPrepared = useMemo(
    () => ({
      firstGroup: filterTags.firstGroup.map((item) => ({
        ...item,
        checked: tags.includes(item.value),
      })),
      secondGroup: filterTags.secondGroup.map((item) => ({
        ...item,
        checked: tags.includes(item.value),
      })),
    }),
    [tags]
  );

  return (
    <div className="flex justify-between overflow-x-auto gap-1">
      <div className="flex gap-4 md:gap-1 md:flex-row flex-col">
        {tagsPrepared.firstGroup.map((item) => (
          <Chip
            key={item.value}
            label={item.label}
            icon={item.checked ? <CheckRoundedIcon /> : undefined}
            variant={item.checked ? 'filled' : 'outlined'}
            onClick={() => !isFreezeValues && onTags(item.value)}
          />
        ))}
      </div>
      <div className="flex gap-4 md:gap-1 md:flex-row flex-col">
        {tagsPrepared.secondGroup.map((item) => (
          <Chip
            key={item.value}
            label={item.label}
            icon={item.checked ? <CheckRoundedIcon /> : undefined}
            variant={item.checked ? 'filled' : 'outlined'}
            onClick={() => !isFreezeValues && onTags(item.value)}
          />
        ))}
      </div>
    </div>
  );
};

export default FiltersTags;
