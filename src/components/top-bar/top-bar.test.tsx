import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import TopBar from '.';
import { linksMenu } from '@/constants/links-menu';

jest.mock('@mui/material', () => {
  return {
    ...jest.requireActual('@mui/material'),
    useMediaQuery: () => false,
  };
});

describe('TopBar Component', () => {
  test('renders links with correct href attributes', () => {
    const { container } = render(<TopBar />);

    linksMenu.forEach((link) => {
      const anchorElement = screen.getByText(link.title);
      expect(anchorElement).toBeInTheDocument();
      expect(anchorElement).toHaveAttribute('href', link.url);
    });

    expect(container).toMatchSnapshot();
  });

  test('opens and closes the menu', async () => {
    render(<TopBar />);

    expect(screen.queryByText('Editar perfil')).not.toBeInTheDocument();
    expect(screen.queryByText('Cerrar Sesion')).not.toBeInTheDocument();

    const button = screen.getByTestId('ExpandMoreRoundedIcon');

    fireEvent.click(button);

    expect(screen.queryByText('Editar perfil')).toBeVisible();
    expect(screen.queryByText('Cerrar Sesion')).toBeVisible();

    fireEvent.click(screen.getByTestId('LogoutRoundedIcon'));

    await waitFor(() => {
      expect(screen.queryByText('Editar perfil')).not.toBeVisible();
    });
    expect(screen.queryByText('Cerrar Sesion')).not.toBeVisible();
  });
});
