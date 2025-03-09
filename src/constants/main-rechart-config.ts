import { EnumFiltersTags } from '@/types/filters';
import { ISalesData } from '@/types/recharts';
import { LegendType } from 'recharts';

interface IMainRechartConfig {
  value: string;
  typeLegend: LegendType;
  type: 'line' | 'bar';
  color: string;
  id: EnumFiltersTags;
  label: string;
  tooltip: string;
  keyAccessor: keyof ISalesData;
}

export const mainRechartConfig: IMainRechartConfig[] = [
  {
    keyAccessor: 'totalCustomers',
    value: 'Clientes totales',
    typeLegend: 'square',
    type: 'bar',
    color: '#358DEB',
    id: EnumFiltersTags.CLIENTS,
    label: 'Total de Clientes',
    tooltip: 'Número total de clientes registrados',
  },
  {
    keyAccessor: 'newCustomers',
    value: 'Clientes nuevos',
    typeLegend: 'square',
    type: 'bar',
    color: '#EB7635',
    id: EnumFiltersTags.CLIENTS,
    label: 'Clientes Nuevos',
    tooltip: 'Número de nuevos clientes en el periodo',
  },
  {
    keyAccessor: 'purchased',
    value: 'Compraron',
    typeLegend: 'square',
    type: 'bar',
    color: '#2DCF5A',
    id: EnumFiltersTags.CLIENTS,
    label: 'Clientes que Compraron',
    tooltip: 'Clientes que realizaron al menos una compra',
  },
  {
    keyAccessor: 'notPurchased',
    value: 'No compraron',
    typeLegend: 'square',
    type: 'bar',
    color: '#EB3535',
    id: EnumFiltersTags.CLIENTS,
    label: 'Clientes que No Compraron',
    tooltip: 'Clientes que no realizaron compras',
  },
  {
    keyAccessor: 'transactions',
    value: 'Transacciones',
    typeLegend: 'square',
    type: 'bar',
    color: '#358DEB',
    id: EnumFiltersTags.TRANSACTIONS,
    label: 'Total de Transacciones',
    tooltip: 'Número total de transacciones realizadas',
  },
  {
    keyAccessor: 'totalMoney',
    value: 'Dinero total',
    typeLegend: 'line',
    type: 'line',
    color: '#EB3535',
    id: EnumFiltersTags.MONEY,
    label: 'Dinero Total',
    tooltip: 'Total de dinero generado en ventas',
  },
  {
    keyAccessor: 'sales',
    value: 'Ventas',
    typeLegend: 'line',
    type: 'line',
    color: '#7A35EB',
    id: EnumFiltersTags.MONEY,
    label: 'Ventas Totales',
    tooltip: 'Total de ventas realizadas',
  },
  {
    keyAccessor: 'returns',
    value: 'Devoluciones',
    typeLegend: 'line',
    type: 'line',
    color: '#48454E',
    id: EnumFiltersTags.MONEY,
    label: 'Devoluciones Totales',
    tooltip: 'Total de devoluciones realizadas',
  },
  {
    keyAccessor: 'cashbackGenerated',
    value: 'Cashback generado',
    typeLegend: 'line',
    type: 'line',
    color: '#EB3535',
    id: EnumFiltersTags.CASHBACK,
    label: 'Cashback Generado',
    tooltip: 'Total de cashback generado en ventas',
  },
  {
    keyAccessor: 'cashbackAccumulated',
    value: 'Cashback acumulado',
    typeLegend: 'line',
    type: 'line',
    color: '#7A35EB',
    id: EnumFiltersTags.CASHBACK,
    label: 'Cashback Acumulado',
    tooltip: 'Total de cashback acumulado por clientes',
  },
  {
    value: 'Cashback total',
    typeLegend: 'line',
    type: 'line',
    color: '#EB35AD',
    id: EnumFiltersTags.CASHBACK,
    label: 'Cashback Total',
    tooltip: 'Total de cashback entregado a los clientes',
    keyAccessor: 'totalCashback',
  },
];

export const payloadLegend = mainRechartConfig.map((item) => ({
  value: item.value,
  type: item.typeLegend,
  color: item.color,
  id: item.id,
}));
