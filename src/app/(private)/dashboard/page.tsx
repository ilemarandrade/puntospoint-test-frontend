import AsideDashboard from '@/components/aside-dashboard';
import FiltersDashboard from '@/components/filters-dashboard';
import MainRechart from '@/components/recharts/main-recharts';
import { data } from '@/components/recharts/main-recharts/data-mock';
import { EnumFiltersTags } from '@/types/filters';
import { Grid2 } from '@mui/material';

const DashboardPage = () => {
  return (
    <Grid2 container component="main" className="py-8 px-16" spacing={3}>
      <Grid2 component="section" size={{ md: 9 }} className="space-y-8">
        <FiltersDashboard />
        <MainRechart data={data} tagsSelected={[EnumFiltersTags.CLIENTS]} />
      </Grid2>
      <Grid2 component="aside" size={{ md: 3 }}>
        <AsideDashboard />
      </Grid2>
    </Grid2>
  );
};
export default DashboardPage;
