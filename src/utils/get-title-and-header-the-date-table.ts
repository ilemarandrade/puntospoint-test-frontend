import {
  monthsInNumber,
  monthsSpanish,
  titleTableDate,
  weekDaysSpanish,
} from '@/constants/filters-options';
import { monthsData } from '@/constants/months';
import {
  EnumDateMainParameters,
  EnumThisWeekSubParameters,
} from '@/types/filters';

export const getTitleAndHeaderTheDateTable = (
  parameter?: string,
  subParameter = EnumThisWeekSubParameters.ALL as string
): {
  title: string;
  header: string;
  format?: (date: string) => string;
} => {
  if (!parameter) return { title: '', header: '' };
  const formatToGetFirtsValueDate = (date: string) =>
    date.split(' ')[0].charAt(0).toUpperCase() + date.split(' ')[0].slice(1);

  switch (parameter) {
    case EnumDateMainParameters.TODAY:
      return titleTableDate[EnumDateMainParameters.TODAY];
    case EnumDateMainParameters.THIS_WEEK:
      return subParameter !== EnumThisWeekSubParameters.ALL
        ? {
            header: titleTableDate[EnumDateMainParameters.TODAY].header,
            title:
              weekDaysSpanish[subParameter as keyof typeof weekDaysSpanish],
          }
        : titleTableDate[EnumDateMainParameters.THIS_WEEK];
    case EnumDateMainParameters.THIS_MONTH:
      return {
        ...titleTableDate[EnumDateMainParameters.THIS_MONTH],
        format: formatToGetFirtsValueDate,
      };

    case EnumDateMainParameters.THIS_SEMESTER:
      return subParameter !== EnumThisWeekSubParameters.ALL
        ? {
            header: titleTableDate[EnumDateMainParameters.THIS_MONTH].header,
            title: monthsSpanish[subParameter as keyof typeof monthsSpanish],
            format: formatToGetFirtsValueDate,
          }
        : titleTableDate[EnumDateMainParameters.THIS_SEMESTER];

    case EnumDateMainParameters.THIS_YEAR:
      return subParameter !== EnumThisWeekSubParameters.ALL
        ? {
            header: titleTableDate[EnumDateMainParameters.THIS_MONTH].header,
            title: monthsSpanish[subParameter as keyof typeof monthsSpanish],
            format: formatToGetFirtsValueDate,
          }
        : {
            ...titleTableDate[EnumDateMainParameters.THIS_YEAR],
            format: formatToGetFirtsValueDate,
          };

    case EnumDateMainParameters.MAX:
      return subParameter !== EnumThisWeekSubParameters.ALL
        ? {
            header: titleTableDate[EnumDateMainParameters.THIS_MONTH].header,
            title: monthsSpanish[subParameter as keyof typeof monthsSpanish],
            format: formatToGetFirtsValueDate,
          }
        : titleTableDate[EnumDateMainParameters.MAX];

    case EnumDateMainParameters.CUSTOM:
      return titleTableDate[EnumDateMainParameters.CUSTOM];

    default:
      return { title: '', header: '' };
  }
};
