import ytgydtDataMock from '@/datamock/ytg-ytd-mock';

const getYtgAndYtg = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return ytgydtDataMock;
};

export default getYtgAndYtg;
