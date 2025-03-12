import type { Meta, StoryObj } from '@storybook/react';
import SwitchCustom from './';

const meta = {
  title: 'Components/SwitchCustom',
  component: SwitchCustom,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SwitchCustom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => {},
  },
};
