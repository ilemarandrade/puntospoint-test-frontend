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
) => {
  if (!parameter) return { title: '', header: '' };

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
      return subParameter !== EnumThisWeekSubParameters.ALL
        ? titleTableDate[EnumDateMainParameters.THIS_MONTH]
        : titleTableDate[EnumDateMainParameters.THIS_MONTH];

    case EnumDateMainParameters.THIS_SEMESTER:
      return subParameter !== EnumThisWeekSubParameters.ALL
        ? {
            header: titleTableDate[EnumDateMainParameters.THIS_MONTH].header,
            title: monthsSpanish[subParameter as keyof typeof monthsSpanish],
          }
        : titleTableDate[EnumDateMainParameters.THIS_SEMESTER];

    case EnumDateMainParameters.THIS_YEAR:
      return subParameter !== EnumThisWeekSubParameters.ALL
        ? {
            header: titleTableDate[EnumDateMainParameters.THIS_MONTH].header,
            title: monthsSpanish[subParameter as keyof typeof monthsSpanish],
          }
        : titleTableDate[EnumDateMainParameters.THIS_YEAR];

    case EnumDateMainParameters.MAX:
      return subParameter !== EnumThisWeekSubParameters.ALL
        ? titleTableDate[EnumDateMainParameters.THIS_MONTH]
        : titleTableDate[EnumDateMainParameters.MAX];

    case EnumDateMainParameters.CUSTOM:
      return titleTableDate[EnumDateMainParameters.CUSTOM];

    default:
      return { title: '', header: '' };
  }
};
