import { Grid2 } from '@mui/material';

import RenderRechart from './render-rechart';

interface IYTGYTDRechartsData {
  year: string;
  amount: number;
}

interface IProps {
  data?: { ytg: IYTGYTDRechartsData[]; ytd: IYTGYTDRechartsData[] };
  isLoading?: boolean;
}
const YTGAndYDTRechart: React.FC<IProps> = ({ data, isLoading }) => {
  const preparedDataYTG = data?.ytg?.reduce(
    (acc, { amount }, index) => ({
      ...acc,
      ['key' + index]: amount,
    }),
    {}
  );

  const preparedDataYTD = data?.ytd?.reduce(
    (acc, { amount }, index) => ({
      ...acc,
      ['key' + index]: amount,
    }),
    {}
  );

  return (
    <Grid2 container className="relative">
      <div
        className={` ${
          isLoading
            ? 'absolute top-0 left-0 w-full h-full animate-pulse bg-gray-200 rounded-md'
            : ''
        }`}
      ></div>

      <Grid2 size={{ xs: 12, sm: 6 }}>
        <RenderRechart
          data={[preparedDataYTG]}
          barStructure={data?.ytg?.map(({ year }, index) => ({
            key: 'key' + index,
            name: year,
            dateKey: 'key' + index,
          }))}
          title="YTG"
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <RenderRechart
          data={[preparedDataYTD]}
          barStructure={data?.ytd?.map(({ year }, index) => ({
            key: year,
            name: year,
            dateKey: 'key' + index,
          }))}
          title="YTD"
        />
      </Grid2>
    </Grid2>
  );
};

export default YTGAndYDTRechart;
