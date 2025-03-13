import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardPulso from './';

describe('CardPulso Component', () => {
  const mockData = {
    date: new Date('2023-10-01'),
    clients: 150,
    totalSales: 200,
    totalAmount: 5000,
    cashbackAccumulated: 300,
    invoiced: [
      { date: '2023-09-28', amount: 1500 },
      { date: '2023-09-29', amount: 2000 },
      { date: '2023-09-30', amount: 1500 },
    ],
  };

  test('renders correctly with provided data', () => {
    const { container } = render(<CardPulso data={mockData} />);

    expect(container).toMatchSnapshot();

    expect(screen.getByText(/Octubre/i)).toBeInTheDocument();

    expect(screen.getByText('Clientes')).toBeInTheDocument();
    expect(screen.getByText('1.500')).toBeInTheDocument();

    expect(screen.getByText('Ventas Totales')).toBeInTheDocument();
    expect(screen.getByText('300')).toBeInTheDocument();

    expect(screen.getByText('Monto Total')).toBeInTheDocument();
    expect(screen.getByText('$50.000')).toBeInTheDocument();

    expect(screen.getByText('Cashback')).toBeInTheDocument();
    expect(screen.getByText('Acumulado')).toBeInTheDocument();
    expect(screen.getByText('$2.000')).toBeInTheDocument();

    expect(screen.getByText('Facturado 15/09')).toBeInTheDocument();
    expect(screen.getByText('$15.000')).toBeInTheDocument();

    expect(screen.getByText('Facturado 20/09')).toBeInTheDocument();
    expect(screen.getByText('$35.000')).toBeInTheDocument();
  });
});
