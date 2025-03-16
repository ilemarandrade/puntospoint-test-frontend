import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from '.';
import { columns, defaultData } from './data-mock';

describe('Table Component', () => {
  test('renders the table with correct data', () => {
    const { container } = render(
      <Table
        title="Test Table"
        columns={columns}
        data={defaultData}
        dataTestid="testId"
      />
    );

    expect(screen.getByText('Test Table')).toBeInTheDocument();

    columns.forEach((column) => {
      expect(screen.getByText(column.header)).toBeInTheDocument();
    });

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    container.querySelectorAll('tbody tr').forEach((row, indexRow) => {
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      row.querySelectorAll('td').forEach((currentColumn, index) => {
        const isRender = !!columns[index].render;
        const plainText = defaultData[indexRow][columns[index].keyAccessor];

        if (isRender) {
          const { container: customRenderFromColumn } = render(
            <>
              {columns[index].render &&
                columns[index].render(defaultData[indexRow] as any)}
            </>
          );

          expect(currentColumn.innerHTML).toContain(
            customRenderFromColumn.innerHTML
          );
        } else {
          expect(currentColumn).toHaveTextContent(plainText.toString());
        }
      });
    });
    expect(container).toMatchSnapshot();
  });
});
