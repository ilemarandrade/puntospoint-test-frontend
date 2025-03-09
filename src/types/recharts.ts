import { Payload } from 'recharts/types/component/DefaultLegendContent';
import { EnumFiltersTags } from './filters';

export type TagsType = { [key in EnumFiltersTags]: Array<Payload> };

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
