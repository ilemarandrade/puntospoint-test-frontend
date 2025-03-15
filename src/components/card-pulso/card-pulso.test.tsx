import React from 'react';
import { render, screen } from '@testing-library/react';

import CardPulso from './';

describe('CardPulso Component', () => {
  const mockData = {
    date: new Date('2023-10-01T04:00:00Z'),
    clients: 1500,
    totalSales: 300,
    totalAmount: 50000,
    cashbackAccumulated: 2000,
    invoiced: [
      { date: '2023-09-15', amount: 15000 },
      { date: '2023-09-20', amount: 35000 },
    ],
  };

  test('renders correctly with provided data', () => {
    const { container } = render(<CardPulso data={mockData} />);
    expect(container).toMatchSnapshot();
  });
});
