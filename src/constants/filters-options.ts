import {
  EnumDateMainParameters,
  EnumFiltersTags,
  EnumThisMonthSubParameters,
  EnumThisWeekSubParameters,
  IFiltersByDates,
} from '@/types/filters';

const monthsFilters = [
  {
    name: EnumThisMonthSubParameters.ALL,
    label: 'Todo',
  },
  {
    name: EnumThisMonthSubParameters.JANUARY,
    label: 'Enero',
  },
  {
    name: EnumThisMonthSubParameters.FEBRUARY,
    label: 'Febrero',
  },
  {
    name: EnumThisMonthSubParameters.MARCH,
    label: 'Marzo',
  },
  {
    name: EnumThisMonthSubParameters.APRIL,
    label: 'Abril',
  },
  {
    name: EnumThisMonthSubParameters.MAY,
    label: 'Mayo',
  },
  {
    name: EnumThisMonthSubParameters.JUNE,
    label: 'Junio',
  },
  {
    name: EnumThisMonthSubParameters.JULY,
    label: 'Julio',
  },
  {
    name: EnumThisMonthSubParameters.AUGUST,
    label: 'Agosto',
  },
  {
    name: EnumThisMonthSubParameters.SEPTEMBER,
    label: 'Septiembre',
  },
  {
    name: EnumThisMonthSubParameters.OCTOBER,
    label: 'Octubre',
  },
  {
    name: EnumThisMonthSubParameters.NOVEMBER,
    label: 'Noviembre',
  },
  {
    name: EnumThisMonthSubParameters.DECEMBER,
    label: 'Diciembre',
  },
];

export const monthsInNumber = {
  [EnumThisMonthSubParameters.JANUARY]: 0,
  [EnumThisMonthSubParameters.FEBRUARY]: 1,
  [EnumThisMonthSubParameters.MARCH]: 2,
  [EnumThisMonthSubParameters.APRIL]: 3,
  [EnumThisMonthSubParameters.MAY]: 4,
  [EnumThisMonthSubParameters.JUNE]: 5,
  [EnumThisMonthSubParameters.JULY]: 6,
  [EnumThisMonthSubParameters.AUGUST]: 7,
  [EnumThisMonthSubParameters.SEPTEMBER]: 8,
  [EnumThisMonthSubParameters.OCTOBER]: 9,
  [EnumThisMonthSubParameters.NOVEMBER]: 10,
  [EnumThisMonthSubParameters.DECEMBER]: 11,
};

const yearsFilters = [
  {
    name: EnumThisMonthSubParameters.ALL,
    label: 'Todo',
  },
  {
    name: '2020',
    label: '2020',
  },
  {
    name: '2021',
    label: '2021',
  },
  {
    name: '2022',
    label: '2022',
  },
  {
    name: '2023',
    label: '2023',
  },
  {
    name: '2024',
    label: '2024',
  },
  {
    name: '2025',
    label: '2025',
  },
];

export const filtersByDates: IFiltersByDates[] = [
  {
    parameter: EnumDateMainParameters.TODAY,
    label: 'Hoy',
  },
  {
    parameter: EnumDateMainParameters.THIS_WEEK,
    label: '7D',
    subParameters: [
      {
        name: EnumThisWeekSubParameters.ALL,
        label: 'Todo',
      },
      {
        name: EnumThisWeekSubParameters.MONDAY,
        label: 'Lunes',
      },
      {
        name: EnumThisWeekSubParameters.TUESDAY,
        label: 'Martes',
      },
      {
        name: EnumThisWeekSubParameters.WEDNESDAY,
        label: 'Miércoles',
      },
      {
        name: EnumThisWeekSubParameters.THURSDAY,
        label: 'Jueves',
      },
      {
        name: EnumThisWeekSubParameters.FRIDAY,
        label: 'Viernes',
      },
      {
        name: EnumThisWeekSubParameters.SATURDAY,
        label: 'Sábado',
      },
      {
        name: EnumThisWeekSubParameters.SUNDAY,
        label: 'Domingo',
      },
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

export const filterTags = {
  firstGroup: [
    {
      label: 'Clientes',
      value: EnumFiltersTags.CLIENTS,
    },
    {
      label: 'Transacciones',
      value: EnumFiltersTags.TRANSACTIONS,
    },
  ],
  secondGroup: [
    {
      label: 'Dinero',
      value: EnumFiltersTags.MONEY,
    },
    {
      label: 'Cashback',
      value: EnumFiltersTags.CASHBACK,
    },
  ],
};
