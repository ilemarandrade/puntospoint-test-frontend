import { axiosInstance } from '@/root/axios';
import { IYTGYTDData } from '@/types/recharts';

const getYTGAndYTD: () => Promise<IYTGYTDData> = async () => {
  try {
    const response = await axiosInstance.get<IYTGYTDData>('/api/ytg-ytd');

    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export default getYTGAndYTD;
