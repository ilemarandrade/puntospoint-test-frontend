export enum EnumDateMainParameters {
  TODAY = 'TODAY',
  THIS_WEEK = 'THIS_WEEK',
  THIS_MONTH = 'THIS_MONTH',
  THIS_SEMESTER = 'THIS_SEMESTER',
  THIS_YEAR = 'THIS_YEAR',
  YTD_YTG = 'YTD_YTG',
  MAX = 'MAX',
  CUSTOM = 'CUSTOM',
}

export interface IFiltersByDates {
  parameter: EnumDateMainParameters;
  label: string;
  subParameters?:
    | IThisWeekSubParameters[]
    | IThisMonthSubParameters[]
    | IYearsParamerters[];
}

export enum EnumThisWeekSubParameters {
  ALL = 'ALL',
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export enum EnumThisMonthSubParameters {
  ALL = 'ALL',
  JANUARY = 'JANUARY',
  FEBRUARY = 'FEBRUARY',
  MARCH = 'MARCH',
  APRIL = 'APRIL',
  MAY = 'MAY',
  JUNE = 'JUNE',
  JULY = 'JULY',
  AUGUST = 'AUGUST',
  SEPTEMBER = 'SEPTEMBER',
  OCTOBER = 'OCTOBER',
  NOVEMBER = 'NOVEMBER',
  DECEMBER = 'DECEMBER',
}

export interface ISubParameters<T> {
  label: string;
  name: T;
}

export interface IThisWeekSubParameters
  extends ISubParameters<EnumThisWeekSubParameters> {}

export interface IThisMonthSubParameters
  extends ISubParameters<EnumThisMonthSubParameters> {}

export interface IYearsParamerters {
  label: string;
  name: string;
}

export enum EnumFiltersTags {
  CLIENTS = 'CLIENTS',
  TRANSACTIONS = 'TRANSACTIONS',
  MONEY = 'MONEY',
  CASHBACK = 'CASHBACK',
}
