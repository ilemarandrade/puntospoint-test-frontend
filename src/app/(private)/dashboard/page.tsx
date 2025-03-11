'use client';

import AsideDashboard from '@/components/aside-dashboard';
import DashboardTable from '@/components/dashboard-table';
import FiltersDashboard from '@/components/filters-dashboard';
import MainRechart from '@/components/recharts/main-recharts';
import useGetMovements from '@/hooks/use-get-movements';
import { IFiltersDasboard } from '@/types/recharts';
import { getTitleAndHeaderTheDateTable } from '@/utils/get-title-and-header-the-date-table';
import { Grid2 } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';

const DashboardPage = () => {
  const [filters, setFilters] = useState<IFiltersDasboard>();

  const { data, isLoading } = useGetMovements({ filters });

  const onChangeFilter = useCallback((filter: IFiltersDasboard) => {
    setFilters(filter);
  }, []);

  const titleDate = useMemo(() => {
    return getTitleAndHeaderTheDateTable(
      filters?.parameter,
      filters?.subParameter
    );
  }, [filters?.parameter, filters?.subParameter]);

  console.log({ titleDate });

  return (
    <Grid2 container component="main" className="py-8 px-16" spacing={3}>
      <Grid2 component="section" size={{ md: 9 }} className="space-y-8">
        <FiltersDashboard onChangeFilter={onChangeFilter} />

        <MainRechart
          data={data}
          tagsSelected={filters?.tags}
          isLoading={isLoading}
        />

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
