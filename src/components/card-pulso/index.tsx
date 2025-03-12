import { formatNumber } from '@/utils/format-number';
import { Card } from '@mui/material';
import { useCallback } from 'react';

interface IProps {
  data: {
    date: Date;
    clients: number;
    totalSales: number;
    totalAmount: number;
    cashbackAccumulated: number;
    invoiced: {
      date: Date;
      amount: number;
    }[];
  };
}

const CardPulso: React.FC<IProps> = ({ data }) => {
  const {
    clients,
    totalSales,
    totalAmount,
    cashbackAccumulated,
    invoiced,
    date,
  } = data;

  const formatDate = useCallback((date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}`;
  }, []);

  return (
    <Card className="px-5 pt-2 pb-5 w-full space-y-2 rounded-2xl shadow-lg min-w-64">
      <h3 className="text-center font-semibold capitalize">
        {date.toLocaleDateString('es-ES', { month: 'long' })}
      </h3>
      <div className="flex justify-between">
        <p className="text-sm">Clientes</p>
        <p className="text-sm">{formatNumber(clients)}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-sm">Ventas Totales</p>
        <p className="text-sm">{formatNumber(totalSales)}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-sm">Monto Total</p>
        <p className="text-sm">${formatNumber(totalAmount)}</p>
      </div>

      <h3 className="font-semibold">Cashback</h3>

      <div className="flex justify-between">
        <p className="text-sm">Acumulado</p>
        <p className="text-sm">${formatNumber(cashbackAccumulated)}</p>
      </div>

      {invoiced?.length &&
        invoiced.map((invoice, index) => (
          <div className="flex justify-between" key={`invoice-${index}`}>
            <p className="text-sm">Facturado {formatDate(invoice.date)} </p>
            <p className="text-sm">${formatNumber(invoice.amount)}</p>
          </div>
        ))}
    </Card>
  );
};

export default CardPulso;
