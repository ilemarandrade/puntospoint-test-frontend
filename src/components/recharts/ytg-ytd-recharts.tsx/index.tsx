import { Grid2 } from '@mui/material';

import RenderRechart from './render-rechart';

interface IYTGYTDRechartsData {
  year: string;
  amount: number;
}

interface IProps {
  data: { ytg: IYTGYTDRechartsData[]; ytd: IYTGYTDRechartsData[] };
}
const YTGAndYDTRechart: React.FC<IProps> = ({ data }) => {
  const preparedDataYTG = data.ytg.reduce(
    (acc, { amount }, index) => ({
      ...acc,
      ['key' + index]: amount,
    }),
    {}
  );

  const preparedDataYTD = data.ytd.reduce(
    (acc, { amount }, index) => ({
      ...acc,
      ['key' + index]: amount,
    }),
    {}
  );

  return (
    <Grid2 container>
      <Grid2>
        <RenderRechart
          data={[preparedDataYTG]}
          barStructure={data.ytg.map(({ year }, index) => ({
            key: 'key' + index,
            name: year,
            dateKey: 'key' + index,
          }))}
          title="YTG"
        />
      </Grid2>
      <Grid2>
        <RenderRechart
          data={[preparedDataYTD]}
          barStructure={data.ytd.map(({ year }, index) => ({
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
