'use client';

import AsideDashboard from '@/components/aside-dashboard';
import DashboardTable from '@/components/dashboard-table';
import FiltersDashboard from '@/components/filters-dashboard';
import MainRechart from '@/components/recharts/main-recharts';
import YTGAndYDTRechart from '@/components/recharts/ytg-ytd-recharts.tsx';
import useGetMovements from '@/hooks/use-get-movements';
import useGetYTGAndYtd from '@/hooks/use-get-ytg-and-ytd';
import { EnumDateMainParameters } from '@/types/filters';
import { IFiltersDasboard } from '@/types/recharts';
import { getTitleAndHeaderTheDateTable } from '@/utils/get-title-and-header-the-date-table';

import { Grid2 } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';

const DashboardPage = () => {
  const [filters, setFilters] = useState<IFiltersDasboard>();

  const { data, isLoading } = useGetMovements({ filters });
  const { data: dataYTGAndYDT, isLoading: isLoadingYTGAndYDT } =
    useGetYTGAndYtd({
      enabled: filters?.parameter === EnumDateMainParameters.YTD_YTG,
    });

  const onChangeFilter = useCallback((filter: IFiltersDasboard) => {
    setFilters(filter);
  }, []);

  const titleDate = useMemo(() => {
    return getTitleAndHeaderTheDateTable(
      filters?.parameter,
      filters?.subParameter
    );
  }, [filters?.parameter, filters?.subParameter]);

  const isParameterYDTAndYGT = useMemo(() => {
    return filters?.parameter === EnumDateMainParameters.YTD_YTG;
  }, [filters?.parameter]);

  return (
    <Grid2
      container
      component="main"
      className="p-6 md:py-8 md:px-16"
      spacing={3}
    >
      <Grid2 component="section" size={{ md: 9 }} className="space-y-8">
        <FiltersDashboard onChangeFilter={onChangeFilter} />

        {isParameterYDTAndYGT ? (
          <YTGAndYDTRechart
            data={dataYTGAndYDT}
            isLoading={isLoadingYTGAndYDT}
          />
        ) : (
          <MainRechart
            data={data}
            tagsSelected={filters?.tags}
            isLoading={isLoading}
          />
        )}

        <DashboardTable
          data={data}
          tagsSelected={filters?.tags}
          titleDate={titleDate?.title}
          headerDate={titleDate?.header}
          subParameter={filters?.subParameter}
          formatDate={titleDate?.format}
          isLoading={isLoading}
        />
      </Grid2>

      <Grid2 component="aside" size={{ md: 3 }}>
        <AsideDashboard />
      </Grid2>
    </Grid2>
  );
};
export default DashboardPage;
