import type { Meta, StoryObj } from '@storybook/react';
import Rechart from '.';
import ytgydtDataMock from '@/datamock/ytg-ytd-mock';

const meta = {
  title: 'Components/YTGAndYDTRechart',
  component: Rechart,
  parameters: {
    layout: 'centered',
  },
  render: (args) => (
    <div className="w-[80vw]">
      <Rechart {...args} />
    </div>
  ),
} satisfies Meta<typeof Rechart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Clients: Story = {
  args: {
    data: ytgydtDataMock,
  },
};
