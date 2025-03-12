import type { Meta, StoryObj } from '@storybook/react';
import Chip from './';
import { CarCrashRounded } from '@mui/icons-material';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Label',
  },
};

export const ChipFilledWithIcon: Story = {
  args: {
    label: 'Label',
    icon: <CarCrashRounded />,
  },
};

export const ChipFilledWithIconAndDelete: Story = {
  args: {
    label: 'Label',
    icon: <CarCrashRounded />,
    onDelete: () => {},
  },
};

export const ChipFilledWithDelete: Story = {
  args: {
    label: 'Label',
    onDelete: () => {},
  },
};

export const ChipFilledDisabled: Story = {
  args: {
    label: 'Label',
    disabled: true,
    icon: <CarCrashRounded />,
    onDelete: () => {},
  },
};

export const ChipOutlined: Story = {
  args: {
    label: 'Label',
    variant: 'outlined',
  },
};

export const ChipOutlinedWithIcon: Story = {
  args: {
    label: 'Label',
    icon: <CarCrashRounded />,
    variant: 'outlined',
  },
};

export const ChipOutlinedWithIconAndDelete: Story = {
  args: {
    label: 'Label',
    icon: <CarCrashRounded />,
    onDelete: () => {},
    variant: 'outlined',
  },
};

export const ChipOutlinedWithDelete: Story = {
  args: {
    label: 'Label',
    onDelete: () => {},
    variant: 'outlined',
  },
};

export const ChipOutlinedDisabled: Story = {
  args: {
    label: 'Label',
    disabled: true,
    variant: 'outlined',
    icon: <CarCrashRounded />,
    onDelete: () => {
      console.log('delete');
    },
    onClick: () => {
      console.log('click');
    },
  },
};
