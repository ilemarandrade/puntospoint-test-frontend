import type { Meta, StoryObj } from '@storybook/react';
import Table, { Column } from '.';
import { columns, defaultData } from './data-mock';

const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Clientes',
    data: defaultData,
    columns: columns as Column<unknown>[],
  },
};

export const OneColumn: Story = {
  args: {
    title: 'Clientes',
    data: defaultData,
    columns: columns.filter(
      (row) => row.keyAccessor === 'firstName'
    ) as Column<unknown>[],
  },
};

export const TwoTables: Story = {
  args: {
    title: 'Clientes',
    data: defaultData,
    columns: columns as Column<unknown>[],
  },
  render: (args) => (
    <div className="flex gap-4">
      <Table
        {...{
          title: 'Clientes',
          data: defaultData,
          columns: columns.filter((row) => row.keyAccessor === 'firstName'),
        }}
      />
      <Table {...args} />
    </div>
  ),
};

export const ThreeTables: Story = {
  args: {
    title: 'Clientes',
    data: defaultData,
    columns: columns as Column<unknown>[],
  },
  render: (args) => (
    <div className="flex gap-4">
      <Table
        {...{
          title: 'Clientes',
          data: defaultData,
          columns: columns.filter((row) => row.keyAccessor === 'firstName'),
        }}
      />
      <Table
        {...{
          title: 'Clientes',
          data: defaultData,
          columns: columns.filter(
            (row) =>
              row.keyAccessor === 'firstName' ||
              row.keyAccessor === 'lastName' ||
              row.keyAccessor === 'age' ||
              row.keyAccessor === 'visits'
          ),
        }}
      />
      <Table
        {...{
          title: 'Clientes',
          data: defaultData,
          columns: columns.filter(
            (row) =>
              row.keyAccessor === 'firstName' || row.keyAccessor === 'lastName'
          ),
        }}
      />
    </div>
  ),
};
