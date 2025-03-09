import type { Meta, StoryObj } from '@storybook/react';
import MainRechart from '.';
import { EnumFiltersTags } from '@/types/filters';
import { data } from './data-mock';

const meta = {
  title: 'Components/MainRechart',
  component: MainRechart,
  parameters: {
    layout: 'centered',
  },
  args: {
    data: data,
  },
  render: (args) => (
    <div className="w-[80vw]">
      <MainRechart {...args} />
    </div>
  ),
} satisfies Meta<typeof MainRechart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Clients: Story = {
  args: {
    tagsSelected: [EnumFiltersTags.CLIENTS],
  },
};

export const Transactions = {
  args: {
    tagsSelected: [EnumFiltersTags.TRANSACTIONS],
  },
};

export const Money = {
  args: {
    tagsSelected: [EnumFiltersTags.MONEY],
  },
};

export const CashbackSelected = {
  args: {
    tagsSelected: [EnumFiltersTags.CASHBACK],
  },
};

export const ClientsAndMoney = {
  args: {
    tagsSelected: [EnumFiltersTags.CLIENTS, EnumFiltersTags.MONEY],
  },
};

export const ClientsAndCashback = {
  args: {
    tagsSelected: [EnumFiltersTags.CLIENTS, EnumFiltersTags.CASHBACK],
  },
};

export const TransactionsAndCashback = {
  args: {
    tagsSelected: [EnumFiltersTags.TRANSACTIONS, EnumFiltersTags.CASHBACK],
  },
};

export const TransactionsAndMoney = {
  args: {
    tagsSelected: [EnumFiltersTags.TRANSACTIONS, EnumFiltersTags.MONEY],
  },
};
