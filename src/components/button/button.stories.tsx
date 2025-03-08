import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Button from '.';
import AddIcon from '@mui/icons-material/Add';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Contained: Story = {
  args: {
    variant: 'contained',
    children: 'Primary Button',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'Outlined Button',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    children: 'Text Button',
  },
};

export const ContainedWithIcon: Story = {
  args: {
    variant: 'contained',
    children: 'Label',
    startIcon: <AddIcon />,
  },
};

export const OutlinedWithIcon: Story = {
  args: {
    variant: 'outlined',
    children: 'Outlined Button',
    startIcon: <AddIcon />,
  },
};

export const TextWithIcon: Story = {
  args: {
    variant: 'text',
    children: 'Text Button',
    startIcon: <AddIcon />,
  },
};
