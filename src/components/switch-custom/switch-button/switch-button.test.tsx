import React from 'react';
import { screen, fireEvent, render } from '@testing-library/react';
import SwitchButton from './';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';

describe('SwitchButton', () => {
  const handleClick = jest.fn();

  beforeEach(() => {
    handleClick.mockClear();
  });

  test('renders with children', () => {
    render(
      <SwitchButton onClick={handleClick}>
        <BarChartRoundedIcon />
        <span className="text-sm">Gráfico</span>
      </SwitchButton>
    );

    expect(screen.getByText('Gráfico')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('isActive prop applies styles correctly', () => {
    const { rerender } = render(
      <SwitchButton isActive={false} onClick={handleClick}>
        <BarChartRoundedIcon />
        <span className="text-sm">Gráfico</span>
      </SwitchButton>
    );

    expect(screen.getByRole('button')).toHaveStyle(
      'background-color: transparent'
    );

    // Rerender with isActive true
    rerender(
      <SwitchButton isActive={true} onClick={handleClick}>
        <BarChartRoundedIcon />
        <span className="text-sm">Gráfico</span>
      </SwitchButton>
    );

    expect(screen.getByRole('button')).not.toHaveStyle(
      'background-color: transparent'
    );
  });

  test('calls onClick when clicked', () => {
    render(
      <SwitchButton onClick={handleClick}>
        <BarChartRoundedIcon />
        <span className="text-sm">Gráfico</span>
      </SwitchButton>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
