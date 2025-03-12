import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import MainRechart from '.';
import { EnumFiltersTags } from '@/types/filters';
import { data } from './data-mock';
import { exportTableCsv } from '@/utils/export-table-csv';

jest.mock('../../../utils/export-table-csv', () => ({
  exportTableCsv: jest.fn(),
}));

const renderComponent = (tagsSelected: EnumFiltersTags[]) => {
  return render(
    <div className="w-[80vw]">
      <MainRechart data={data} tagsSelected={tagsSelected} />
    </div>
  );
};

describe('MainRechart Component', () => {
  it('renders correctly with Clients tag', async () => {
    const { container } = renderComponent([EnumFiltersTags.CLIENTS]);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with Transactions tag', () => {
    const { container } = renderComponent([EnumFiltersTags.TRANSACTIONS]);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with Money tag', () => {
    const { container } = renderComponent([EnumFiltersTags.MONEY]);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with Cashback tag', () => {
    const { container } = renderComponent([EnumFiltersTags.CASHBACK]);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with Clients and Money tags', () => {
    const { container } = renderComponent([
      EnumFiltersTags.CLIENTS,
      EnumFiltersTags.MONEY,
    ]);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with Clients and Cashback tags', () => {
    const { container } = renderComponent([
      EnumFiltersTags.CLIENTS,
      EnumFiltersTags.CASHBACK,
    ]);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with Transactions and Cashback tags', () => {
    const { container } = renderComponent([
      EnumFiltersTags.TRANSACTIONS,
      EnumFiltersTags.CASHBACK,
    ]);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with Transactions and Money tags', () => {
    const { container } = renderComponent([
      EnumFiltersTags.TRANSACTIONS,
      EnumFiltersTags.MONEY,
    ]);
    expect(container).toMatchSnapshot();
  });

  it('exports table data to CSV', () => {
    renderComponent([EnumFiltersTags.CLIENTS]);

    const exportButton = screen.getByTestId('export-table');

    fireEvent.click(exportButton);

    expect(exportTableCsv).toHaveBeenCalled();
  });
});
