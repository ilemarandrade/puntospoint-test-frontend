import {
  EnumDateMainParameters,
  EnumFiltersTags,
  EnumThisMonthSubParameters,
  EnumThisWeekSubParameters,
  IFiltersByDates,
} from '../types/filters';

export const monthsSpanish = {
  [EnumThisMonthSubParameters.ALL]: 'Todo',
  [EnumThisMonthSubParameters.JANUARY]: 'Enero',
  [EnumThisMonthSubParameters.FEBRUARY]: 'Febrero',
  [EnumThisMonthSubParameters.MARCH]: 'Marzo',
  [EnumThisMonthSubParameters.APRIL]: 'Abril',
  [EnumThisMonthSubParameters.MAY]: 'Mayo',
  [EnumThisMonthSubParameters.JUNE]: 'Junio',
  [EnumThisMonthSubParameters.JULY]: 'Julio',
  [EnumThisMonthSubParameters.AUGUST]: 'Agosto',
  [EnumThisMonthSubParameters.SEPTEMBER]: 'Septiembre',
  [EnumThisMonthSubParameters.OCTOBER]: 'Octubre',
  [EnumThisMonthSubParameters.NOVEMBER]: 'Noviembre',
  [EnumThisMonthSubParameters.DECEMBER]: 'Diciembre',
};

export const weekDaysSpanish = {
  [EnumThisWeekSubParameters.ALL]: 'Todo',
  [EnumThisWeekSubParameters.MONDAY]: 'Lunes',
  [EnumThisWeekSubParameters.TUESDAY]: 'Martes',
  [EnumThisWeekSubParameters.WEDNESDAY]: 'Miércoles',
  [EnumThisWeekSubParameters.THURSDAY]: 'Jueves',
  [EnumThisWeekSubParameters.FRIDAY]: 'Viernes',
  [EnumThisWeekSubParameters.SATURDAY]: 'Sábado',
  [EnumThisWeekSubParameters.SUNDAY]: 'Domingo',
};

const createMonthFilters = () => {
  return Object.values(EnumThisMonthSubParameters).map((month) => ({
    name: month,
    label: monthsSpanish[month],
  }));
};

const createYearFilters = () => {
  const years = ['2020', '2021', '2022', '2023', '2024', '2025'];
  return [
    { name: EnumThisMonthSubParameters.ALL, label: 'Todo' },
    ...years.map((year) => ({ name: year, label: year })),
  ];
};

export const monthsFilters = createMonthFilters();

export const yearsFilters = createYearFilters();

export const monthsInNumber = Object.fromEntries(
  Object.values(EnumThisMonthSubParameters).map((month, index) => [
    month,
    index,
  ])
);

export const filtersByDates: IFiltersByDates[] = [
  {
    parameter: EnumDateMainParameters.TODAY,
    label: 'Hoy',
  },
  {
    parameter: EnumDateMainParameters.THIS_WEEK,
    label: '7D',
    subParameters: [
      ...Object.values(EnumThisWeekSubParameters).map((day) => ({
        name: day,
        label: weekDaysSpanish[day],
      })),
    ],
  },
  {
    parameter: EnumDateMainParameters.THIS_MONTH,
    label: 'Este mes',
  },
  {
    parameter: EnumDateMainParameters.THIS_SEMESTER,
    label: '6M',
    subParameters: monthsFilters,
  },
  {
    parameter: EnumDateMainParameters.YTD_YTG,
    label: 'YTD / YTG',
  },
  {
    parameter: EnumDateMainParameters.THIS_YEAR,
    label: '1A',
    subParameters: monthsFilters,
  },
  {
    parameter: EnumDateMainParameters.MAX,
    label: 'MAX',
    subParameters: yearsFilters,
  },
  {
    parameter: EnumDateMainParameters.CUSTOM,
    label: 'Personalizado',
  },
];

export const titleTableDate = {
  [EnumDateMainParameters.TODAY]: { title: 'Hoy', header: 'Horas' },
  [EnumDateMainParameters.THIS_WEEK]: { title: '7 días', header: 'Semana' },
  [EnumDateMainParameters.THIS_MONTH]: { title: 'Este mes', header: 'Días' },
  [EnumDateMainParameters.THIS_SEMESTER]: { title: '6 meses', header: 'Meses' },
  [EnumDateMainParameters.YTD_YTG]: { title: 'YTD / YTG', header: 'Meses' },
  [EnumDateMainParameters.THIS_YEAR]: { title: '1 Año', header: 'Meses' },
  [EnumDateMainParameters.MAX]: { title: 'MAX', header: 'Años' },
  [EnumDateMainParameters.CUSTOM]: {
    title: 'Personalizado',
    header: 'Personalizado',
  },
};

export const filterTags = {
  firstGroup: [
    {
      label: 'Clientes',
      value: EnumFiltersTags.CLIENTS,
      dataTestid: 'clients',
    },
    {
      label: 'Transacciones',
      value: EnumFiltersTags.TRANSACTIONS,
      dataTestid: 'transactions',
    },
  ],
  secondGroup: [
    {
      label: 'Dinero',
      value: EnumFiltersTags.MONEY,
      dataTestid: 'money',
    },
    {
      label: 'Cashback',
      value: EnumFiltersTags.CASHBACK,
      dataTestid: 'cashback',
    },
  ],
};
