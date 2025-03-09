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

export const filtersByDates: IFiltersByDates[] = [
  {
    parameter: EnumDateMainParameters.TODAY,
    label: 'Hoy',
    title: 'Hoy',
  },
  {
    parameter: EnumDateMainParameters.THIS_WEEK,
    label: '7D',
    title: '7 días',
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
    ],
  },
  {
    parameter: EnumDateMainParameters.THIS_MONTH,
    label: 'Este mes',
    title: 'Este mes',
  },
  {
    parameter: EnumDateMainParameters.THIS_SEMESTER,
    label: '6M',
    title: '6 Meses',
    subParameters: monthsFilters,
  },
  {
    parameter: EnumDateMainParameters.YTD_YTG,
    label: 'YTD / YTG',
    title: 'YTD',
  },
  {
    parameter: EnumDateMainParameters.THIS_YEAR,
    label: '1A',
    title: '1 Año',
    subParameters: monthsFilters,
  },
  {
    parameter: EnumDateMainParameters.MAX,
    label: 'MAX',
    title: 'Max',
    subParameters: [2020, 2021, 2022, 2023, 2024, 2025],
  },
  {
    parameter: EnumDateMainParameters.CUSTOM,
    label: 'Personalizado',
    title: 'Personalizado',
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
