import { Payload } from 'recharts/types/component/DefaultLegendContent';
import { EnumDateMainParameters, EnumFiltersTags } from './filters';

export type TagsType = { [key in EnumFiltersTags]: Array<Payload> };

export interface IFiltersDasboard {
  parameter: EnumDateMainParameters;
  subParameter: string;
  tags: EnumFiltersTags[];
}

export interface ISalesData {
  date: string;
  newCustomers: number;
  purchased: number;
  notPurchased: number;
  totalCustomers: number;
  totalMoney: number;
  sales: number;
  returns: number;
  cashbackGenerated: number;
  cashbackAccumulated: number;
  totalCashback: number;
  transactions: number;
}
