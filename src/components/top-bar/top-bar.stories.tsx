import type { Meta, StoryObj } from '@storybook/react';
import TopBar from './';

const meta = {
  title: 'Components/TopBar',
  component: TopBar,
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
