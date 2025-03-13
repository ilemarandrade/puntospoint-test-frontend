import type { Meta, StoryObj } from '@storybook/react';
import CardPulso from '.';

const meta = {
  title: 'Components/CardPulso',
  component: CardPulso,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CardPulso>;

export default meta;
type Story = StoryObj<typeof meta>;

const exampleData = {
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

export const Default: Story = {
  args: {
    data: exampleData,
  },
};
