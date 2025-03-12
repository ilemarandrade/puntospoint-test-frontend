import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '.';
import AddIcon from '@mui/icons-material/Add';

describe('Button Component', () => {
  test('renders the button with default variant', () => {
    render(<Button>Label</Button>);
    const buttonElement = screen.getByRole('button', { name: /label/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('does not trigger onClick when disabled', () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Label
      </Button>
    );

    const buttonElement = screen.getByRole('button', { name: /label/i });

    expect(buttonElement).toBeDisabled();

    fireEvent.click(buttonElement);

    expect(handleClick).not.toHaveBeenCalled();
  });

  test('does not trigger onClick and hides label when loading', () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} loading>
        Label
      </Button>
    );

    const buttonElement = screen.getByRole('button', { name: /label/i });
    const loadingElement = screen.getByRole('progressbar');

    expect(buttonElement).toBeDisabled();

    expect(loadingElement).toBeVisible();

    fireEvent.click(buttonElement);

    expect(handleClick).not.toHaveBeenCalled();
  });

  test('renders the button with different variants', () => {
    const variants: ['contained', 'outlined', 'text'] = [
      'contained',
      'outlined',
      'text',
    ];

    variants.forEach((variant) => {
      const { container } = render(
        <Button variant={variant}>{variant}</Button>
      );

      expect(container).toMatchSnapshot();

      const buttonElement = screen.getByRole('button', { name: variant });
      expect(buttonElement).toHaveClass(`MuiButton-${variant}`);
    });
  });

  test('displays the correct icon', () => {
    const { container } = render(<Button startIcon={<AddIcon />} />);

    expect(container).toMatchSnapshot();
    const iconElement = screen.getByTestId('AddIcon');
    expect(iconElement).toBeInTheDocument();
  });

  test('handles onClick event', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Label</Button>);
    const buttonElement = screen.getByRole('button', { name: /label/i });
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders button with href', () => {
    render(<Button href="https://example.com">Go to Example</Button>);
    const buttonElement = screen.getByRole('link', { name: /go to example/i });
    expect(buttonElement).toHaveAttribute('href', 'https://example.com');
  });

  test('renders button with custom props', () => {
    render(<Button data-testid="custom-button">Custom Button</Button>);
    const buttonElement = screen.getByTestId('custom-button');
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders button label correctly', () => {
    const label = 'Submit';
    render(<Button>{label}</Button>);
    const buttonElement = screen.getByRole('button', { name: /submit/i });
    expect(buttonElement).toHaveTextContent(label);
  });
});
