'use client';

import AsideDashboard from '@/components/aside-dashboard';
import FiltersDashboard from '@/components/filters-dashboard';
import MainRechart from '@/components/recharts/main-recharts';
import useGetMovements from '@/hooks/use-get-movements';
import { IFiltersDasboard } from '@/types/recharts';
import { Grid2 } from '@mui/material';
import { useCallback, useState } from 'react';

const DashboardPage = () => {
  const [filters, setFilters] = useState<IFiltersDasboard>();

  const { data } = useGetMovements({ filters });

  const onChangeFilter = useCallback((filter: IFiltersDasboard) => {
    setFilters(filter);
  }, []);

  return (
    <Grid2 container component="main" className="py-8 px-16" spacing={3}>
      <Grid2 component="section" size={{ md: 9 }} className="space-y-8">
        <FiltersDashboard onChangeFilter={onChangeFilter} />

        <MainRechart data={data} tagsSelected={filters?.tags} />
      </Grid2>
      <Grid2 component="aside" size={{ md: 3 }}>
        <AsideDashboard />
      </Grid2>
    </Grid2>
  );
};
export default DashboardPage;
