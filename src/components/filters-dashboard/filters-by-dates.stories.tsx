import type { Meta, StoryObj } from '@storybook/react';
import FiltersByDates from '.';

const meta = {
  title: 'Components/FiltersByDates',
  component: FiltersByDates,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof FiltersByDates>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
