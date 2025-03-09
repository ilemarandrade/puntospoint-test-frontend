'use client';

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Button from '../../button';
import { Download } from '@mui/icons-material';
import {
  mainRechartConfig,
  payloadLegend,
} from '@/constants/main-rechart-config';
import ContentLegend from './content-legend';
import { EnumFiltersTags } from '@/types/filters';
import { ISalesData } from '@/types/recharts';
import { Fragment } from 'react';

interface IProps {
  tagsSelected: EnumFiltersTags[];
  data: ISalesData[];
}
export default function MainRechart({ tagsSelected, data }: IProps) {
  const exportTable = () => {
    const currenTags = mainRechartConfig.filter((row) =>
      tagsSelected.includes(row.id)
    );

    const headers = currenTags.map((row) => row.label).join(',');

    const body = data.map((row) =>
      currenTags.map((item) => row[item.keyAccessor])
    );

    const csvContent = [headers, ...body].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'datos_ventas.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full relative">
      <div className="h-[500px] w-full pb-6">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="Xaxis"
              className="text-xs"
              axisLine={{
                stroke: '#D9D9D9',
                strokeWidth: 1,
              }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              className="text-xs"
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`}
              className="text-xs"
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value, name, payload) => {
                if (
                  mainRechartConfig
                    .filter((item) => item.type === 'line')
                    .map((item) => item.keyAccessor)
                    .includes(payload.dataKey as keyof ISalesData)
                ) {
                  return [`$${Number(value).toLocaleString()}`, name];
                }
                return [Number(value).toLocaleString(), name];
              }}
              labelFormatter={(label) => `${label}`}
            />

            <Legend
              payload={payloadLegend.filter(
                (item) =>
                  tagsSelected?.length && tagsSelected?.includes(item.id)
              )}
              layout="horizontal"
              align="center"
              wrapperStyle={{ paddingTop: 10 }}
              content={ContentLegend}
            />

            {mainRechartConfig.map((item) => {
              if (!tagsSelected.includes(item.id)) return null;

              return (
                <Fragment key={item.value}>
                  {item.type === 'bar' && (
                    <Bar
                      key={item.value}
                      yAxisId="left"
                      dataKey={item.keyAccessor}
                      fill={item.color}
                      name={item.label}
                      barSize={25}
                    />
                  )}
                  {item.type === 'line' && (
                    <Line
                      yAxisId="right"
                      type="linear"
                      dataKey={item.keyAccessor}
                      stroke={item.color}
                      strokeWidth={2}
                      name={item.label}
                      dot={false}
                    />
                  )}
                </Fragment>
              );
            })}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="absolute bottom-0 right-8">
        <Button
          variant="text"
          onClick={exportTable}
          startIcon={<Download fontSize="small" />}
        >
          Exportar tabla
        </Button>
      </div>
    </div>
  );
}
