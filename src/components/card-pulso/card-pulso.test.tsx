import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardPulso from './';

describe('CardPulso Component', () => {
  const mockData = {
    date: new Date('2023-10-01T04:00:00Z'),
    clients: 1500,
    totalSales: 300,
    totalAmount: 50000,
    cashbackAccumulated: 2000,
    invoiced: [
      { date: new Date('2023-09-15T04:00:00Z'), amount: 15000 },
      { date: new Date('2023-09-20T04:00:00Z'), amount: 35000 },
    ],
  };

  test('renders correctly with provided data', () => {
    render(<CardPulso data={mockData} />);

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
