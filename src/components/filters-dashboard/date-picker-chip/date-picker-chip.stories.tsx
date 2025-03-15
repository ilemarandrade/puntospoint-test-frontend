import type { Meta, StoryObj } from '@storybook/react';
import DatePickerChip from '.';

const meta = {
  title: 'Components/DatePickerChip',
  component: DatePickerChip,
  render: (args) => (
    <div className="flex justify-center">
      <DatePickerChip {...args} />
    </div>
  ),
} satisfies Meta<typeof DatePickerChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rangeMode: true,
    isSelected: true,
  },
};
