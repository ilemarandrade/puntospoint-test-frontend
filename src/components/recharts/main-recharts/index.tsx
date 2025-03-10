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
import { IMovementsData } from '@/types/recharts';
import { Fragment, useMemo } from 'react';
import { exportTableCsv } from '@/utils/export-table-csv';
import { env } from '@/root/env';

interface IProps {
  tagsSelected?: EnumFiltersTags[];
  data?: IMovementsData[];
}
export default function MainRechart({ tagsSelected = [], data }: IProps) {
  const isTest = useMemo(() => env.NODE_ENV === 'test', []);

  const exportTable = () => {
    if (!data?.length) return;

    const currenTags = mainRechartConfig.filter((row) =>
      tagsSelected.includes(row.id)
    );

    const headers = currenTags.map((row) => row.label);

    const body = data.map((row) =>
      currenTags.map((item) => row[item.keyAccessor])
    );

    exportTableCsv({ headers, body });
  };

  const renderChart = useMemo(() => {
    return (
      <ComposedChart
        data={data}
        height={500}
        width={400}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
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
                .includes(payload.dataKey as keyof IMovementsData)
            ) {
              return [`$${Number(value).toLocaleString()}`, name];
            }
            return [Number(value).toLocaleString(), name];
          }}
          labelFormatter={(label) => `${label}`}
        />

        <Legend
          payload={payloadLegend.filter(
            (item) => tagsSelected?.length && tagsSelected?.includes(item.id)
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
    );
  }, [data, tagsSelected]);

  return (
    <div className="w-full relative">
      <div className="h-[500px] w-full pb-6">
        {isTest ? (
          renderChart
        ) : (
          <ResponsiveContainer
            width="100%"
            height="100%"
            minWidth={500}
            minHeight={400}
          >
            {renderChart}
          </ResponsiveContainer>
        )}
      </div>

      <div className="absolute bottom-0 right-8">
        <Button
          variant="text"
          onClick={exportTable}
          startIcon={<Download fontSize="small" />}
          data-testid="export-table"
          disabled={!data?.length}
        >
          Exportar tabla
        </Button>
      </div>
    </div>
  );
}
