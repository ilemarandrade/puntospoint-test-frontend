import { Column } from '@/components/table';
import { IMovementsData } from '@/types/recharts';

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
    render: (row) => `$${Number(row.totalMoney).toLocaleString()}`,
  },
  {
    header: 'Ventas',
    keyAccessor: 'sales',
    render: (row) => `$${Number(row.totalMoney).toLocaleString()}`,
  },
  {
    header: 'Devoluciones',
    keyAccessor: 'returns',
    render: (row) => `$${Number(row.totalMoney).toLocaleString()}`,
  },
];
