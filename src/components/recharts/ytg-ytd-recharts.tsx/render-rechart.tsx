import formatAmount from '@/utils/format-amount';
import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  DefaultLegendContent,
  Legend,
  ResponsiveContainer,
  YAxis,
} from 'recharts';
import { CategoricalChartProps } from 'recharts/types/chart/generateCategoricalChart';

interface IProps {
  data: CategoricalChartProps['data'];
  barStructure?: {
    key: string;
    name: string;
    dateKey: string;
  }[];
  title: string;
}

const RenderRechart: React.FC<IProps> = ({ data, barStructure, title }) => {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      minWidth={200}
      minHeight={200}
    >
      <BarChart
        data={data}
        height={500}
        width={400}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        barGap={20}
      >
        <CartesianGrid vertical={false} />

        <YAxis
          yAxisId="left"
          orientation="left"
          className="text-xs"
          tickFormatter={(value) => formatAmount(value)}
          axisLine={false}
          tickLine={false}
        />

        <Legend
          layout="horizontal"
          align="center"
          wrapperStyle={{ paddingTop: 10, fontSize: 12, color: 'black' }}
          className="text-xs"
          content={(props) => (
            <div>
              <p className="text-center mb-2">{title}</p>
              <DefaultLegendContent {...{ ...props }} ref={null} />
            </div>
          )}
        />

        {barStructure?.length ? (
          barStructure.map(({ key, name, dateKey }: any, index: number) => (
            <Bar
              key={key}
              yAxisId="left"
              dataKey={dateKey}
              fill={index === 0 ? '#EB3535' : '#7A35EB'}
              name={name}
              barSize={80}
            />
          ))
        ) : (
          <></>
        )}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RenderRechart;
