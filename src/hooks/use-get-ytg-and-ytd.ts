import getYTGAndYTD from '@/services/get-ytg-and-ytd';
import { useQuery } from '@tanstack/react-query';

interface IParams {
  enabled?: boolean;
}

const useGetYTGAndYtd = (params?: IParams) => {
  return useQuery({
    queryKey: ['ytg-ytd'],
    queryFn: getYTGAndYTD,
    refetchOnWindowFocus: false,
    enabled: params?.enabled,
  });
};

export default useGetYTGAndYtd;
