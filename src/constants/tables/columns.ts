import { Column } from '@/components/table';
import { IMovementsData } from '@/types/recharts';
import formatAmount from '@/utils/format-amount';

export const columnsDate: Column<IMovementsData>[] = [
  {
    header: 'Fecha',
    keyAccessor: 'date',
  },
];

export const columnsClients: Column<IMovementsData>[] = [
  {
    header: 'Clientes Totales',
    keyAccessor: 'totalCustomers',
  },
  {
    header: 'Clientes Nuevos',
    keyAccessor: 'newCustomers',
  },
  {
    header: 'Compraron',
    keyAccessor: 'purchased',
  },
  {
    header: 'No Compraron',
    keyAccessor: 'notPurchased',
  },
];

export const columnsTransactions: Column<IMovementsData>[] = [
  {
    header: 'Totales',
    keyAccessor: 'transactions',
  },
];

export const columnsMoney: Column<IMovementsData>[] = [
  {
    header: 'Total Dinero',
    keyAccessor: 'totalMoney',
    render: (row) => formatAmount(row.totalMoney),
  },
  {
    header: 'Ventas',
    keyAccessor: 'sales',
    render: (row) => formatAmount(row.sales),
  },
  {
    header: 'Devoluciones',
    keyAccessor: 'returns',
    render: (row) => formatAmount(row.returns),
  },
];
