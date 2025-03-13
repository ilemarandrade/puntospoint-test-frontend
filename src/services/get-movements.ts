import { axiosInstance } from '@/root/axios';
import { IFiltersDasboard, IMovementsData } from '@/types/recharts';
import queryString from 'query-string';

const getMovements: (
  params?: IFiltersDasboard
) => Promise<IMovementsData[]> = async (params) => {
  try {
    const paramsString = params ? queryString.stringify(params) : '';

    const response = await axiosInstance.get<IMovementsData[]>(
      `/api/movements?${paramsString}`
    );

    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export default getMovements;
