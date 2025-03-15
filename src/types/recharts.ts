import { Payload } from 'recharts/types/component/DefaultLegendContent';
import {
  EnumDateMainParameters,
  EnumFiltersTags,
  EnumThisMonthSubParameters,
} from './filters';

export type TagsType = { [key in EnumFiltersTags]: Array<Payload> };

export interface IFiltersDasboard {
  parameter?: EnumDateMainParameters;
  subParameter?: string;
  tags?: EnumFiltersTags[];
  from?: Date;
  to?: Date;
}

export interface IMovementsData {
  date: string | Date;
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
  invoiced?: {
    date: string;
    amount: number;
  }[];
}

export interface IYTGYTDData {
  ytg: {
    year: string;
    amount: number;
  }[];
  ytd: {
    year: string;
    amount: number;
  }[];
}
