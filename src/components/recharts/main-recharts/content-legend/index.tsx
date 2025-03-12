import { EnumFiltersTags } from '@/types/filters';
import { TagsType } from '@/types/recharts';
import { ReactNode } from 'react';
import { Props } from 'recharts/types/component/DefaultLegendContent';
import Legend from './legends';

const ContentLegend: (props: Props) => ReactNode = ({ payload }) => {
  const group: TagsType | undefined = payload?.reduce(
    (acc: TagsType, item) => {
      acc[item.id as EnumFiltersTags].push(item);
      return acc;
    },
    {
      [EnumFiltersTags.CLIENTS]: [],
      [EnumFiltersTags.TRANSACTIONS]: [],
      [EnumFiltersTags.MONEY]: [],
      [EnumFiltersTags.CASHBACK]: [],
    }
  );

  if (!group) return null;

  return (
    <div className="space-y-2 flex flex-col items-center">
      <Legend legends={group[EnumFiltersTags.CLIENTS]} />
      <Legend legends={group[EnumFiltersTags.TRANSACTIONS]} />
      <Legend legends={group[EnumFiltersTags.MONEY]} />
      <Legend legends={group[EnumFiltersTags.CASHBACK]} />
    </div>
  );
};

export default ContentLegend;
