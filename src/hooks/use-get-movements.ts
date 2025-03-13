import getMovements from '@/services/get-movements';
import { IFiltersDasboard } from '@/types/recharts';
import { useQuery } from '@tanstack/react-query';

interface IParams {
  filters?: IFiltersDasboard;
}

const useGetMovements = (params?: IParams) => {
  return useQuery({
    queryKey: ['dashboard', params?.filters],
    queryFn: () => getMovements(params?.filters),
    refetchOnWindowFocus: false,
    enabled: !!params?.filters,
  });
};

export default useGetMovements;
