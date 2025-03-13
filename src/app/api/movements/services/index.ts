import {
  EnumDateMainParameters,
  EnumThisMonthSubParameters,
  EnumThisWeekSubParameters,
} from '@/types/filters';
import {
  generateCustomData,
  generateDailyDataForMonth,
  generateHourlyData,
  generateMonthlyData,
  generateMonthlyDataByRange,
  generateMonthlyDataFrom2020To2025,
  generateMonthlyDataLast6Months,
  generateWeeklyData,
} from '../data-mock';
import { monthsInNumber } from '@/constants/filters-options';
import { IFiltersDasboard } from '@/types/recharts';

const getMovements = async (params?: IFiltersDasboard) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const parameter = params?.parameter;
  const subParameter = params?.subParameter;

  console.log({ params });

  const isMax = parameter === EnumDateMainParameters.MAX;
  const isToday = parameter === EnumDateMainParameters.TODAY;
  const isYear = parameter === EnumDateMainParameters.THIS_YEAR;
  const isThisMonth = parameter === EnumDateMainParameters.THIS_MONTH;
  const isThisWeek = parameter === EnumDateMainParameters.THIS_WEEK;
  const isSemester = parameter === EnumDateMainParameters.THIS_SEMESTER;
  const subParameterIsNotAll = subParameter !== EnumThisMonthSubParameters.ALL;
  const isCustom = parameter === EnumDateMainParameters.CUSTOM;

  if (isCustom) return generateCustomData(params?.from, params?.to);

  if (params?.from && params?.to) {
    return generateMonthlyDataByRange(params?.from, params?.to);
  }

  if (isThisWeek && subParameter !== EnumThisWeekSubParameters.ALL) {
    return generateHourlyData();
  }

  if (isThisWeek && subParameter === EnumThisWeekSubParameters.ALL) {
    return generateWeeklyData();
  }

  if (
    isThisMonth ||
    (isSemester && subParameterIsNotAll) ||
    (isYear && subParameterIsNotAll)
  ) {
    return generateDailyDataForMonth(
      !isThisMonth && subParameter
        ? monthsInNumber[subParameter as keyof typeof monthsInNumber]
        : undefined
    );
  }

  if (isSemester) {
    return generateMonthlyDataLast6Months();
  }

  if (isYear || (isMax && subParameterIsNotAll)) {
    return generateMonthlyData(isMax ? Number(subParameter) : undefined);
  }

  if (isMax) {
    return generateMonthlyDataFrom2020To2025();
  }

  if (isToday) return generateHourlyData(true);

  if (isCustom) return generateCustomData(params?.from, params?.to);
};

export default getMovements;
