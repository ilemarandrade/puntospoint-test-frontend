import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Chip from './';
import { CarCrashRounded } from '@mui/icons-material';

describe('Chip', () => {
  test('renders with label', () => {
    const { container } = render(<Chip label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  test('renders with icon', () => {
    const { container } = render(
      <Chip label="Test Label" icon={<CarCrashRounded />} />
    );
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByTestId('CarCrashRoundedIcon')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  test('renders with delete icon and calls onDelete', () => {
    const handleDelete = jest.fn();

    const { container } = render(
      <Chip label="Test Label" onDelete={handleDelete} />
    );

    const clearIcon = screen.getByTestId('ClearRoundedIcon');

    expect(clearIcon).toBeInTheDocument();

    fireEvent.click(clearIcon);
    expect(handleDelete).toHaveBeenCalledTimes(1);

    expect(container).toMatchSnapshot();
  });

  test('renders and calls onClick', () => {
    const handleClick = jest.fn();

    const { container } = render(
      <Chip label="Test Label" onClick={handleClick} />
    );

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);

    expect(container).toMatchSnapshot();
  });

  test('renders outlined chip', () => {
    const { container } = render(
      <Chip label="Test Label" variant="outlined" />
    );

    expect(screen.getByText('Test Label')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  test('renders outlined chip with icon', () => {
    const { container } = render(
      <Chip label="Test Label" icon={<CarCrashRounded />} variant="outlined" />
    );
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByTestId('CarCrashRoundedIcon')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  test('renders outlined chip with delete', () => {
    const handleDelete = jest.fn();

    const { container } = render(
      <Chip label="Test Label" onDelete={handleDelete} variant="outlined" />
    );

    const clearIcon = screen.getByTestId('ClearRoundedIcon');

    expect(clearIcon).toBeInTheDocument();

    fireEvent.click(clearIcon);
    expect(handleDelete).toHaveBeenCalledTimes(1);

    expect(container).toMatchSnapshot();
  });
});

test('renders outlined chip and calls onClick', () => {
  const handleClick = jest.fn();

  const { container } = render(
    <Chip label="Test Label" onClick={handleClick} variant="outlined" />
  );

  const button = screen.getByRole('button');

  expect(button).toBeInTheDocument();

  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(1);

  expect(container).toMatchSnapshot();
});
