import { faker } from '@faker-js/faker';

const ytgydtDataMock = {
  ytg: [
    {
      year: '2021',
      amount: faker.number.int({ min: 1000, max: 100000 }),
    },
    {
      year: '2022',
      amount: faker.number.int({ min: 1000, max: 100000 }),
    },
  ],
  ytd: [
    {
      year: '2021',
      amount: faker.number.int({ min: 1000, max: 100000 }),
    },
    {
      year: '2022',
      amount: faker.number.int({ min: 1000, max: 100000 }),
    },
  ],
};

export default ytgydtDataMock;
