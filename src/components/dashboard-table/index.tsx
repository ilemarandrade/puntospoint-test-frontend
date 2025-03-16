import { IMovementsData } from '@/types/recharts';
import Table from '../table';
import { EnumFiltersTags } from '@/types/filters';
import Pagination from '../table/pagination';
import { usePagination } from '@/hooks/use-pagination';
import {
  columnsCashback,
  columnsClients,
  columnsDate,
  columnsMoney,
  columnsTransactions,
} from '@/constants/tables/columns';
import { useMemo } from 'react';

interface IProps {
  data?: IMovementsData[];
  tagsSelected?: EnumFiltersTags[];
  titleDate?: string;
  headerDate?: string;
  subParameter?: string;
  formatDate?: (date: string) => string;
  isLoading?: boolean;
}

const DashboardTable: React.FC<IProps> = ({
  data,
  tagsSelected = [],
  titleDate = '',
  headerDate = '',
  formatDate,
  isLoading,
}) => {
  const dataPreparedToMonthsAndDays = useMemo(() => {
    if (formatDate) {
      return data?.map((row) => ({
        ...row,
        date: typeof row.date === 'string' ? formatDate(row.date) : row.date,
      }));
    }

    return data;
  }, [data, formatDate]);

  const {
    itemsPerPage,
    currentPage,
    totalPages,
    canNextPage,
    canPrevPage,
    currentData,
    nextPage,
    prevPage,
    goToPage,
    setItemsPerPage,
  } = usePagination({
    data: dataPreparedToMonthsAndDays || [],
    initialItemsPerPage: 10,
    initialPage: 1,
  });

  if (!data?.length) return null;

  return (
    <div className="space-y-4 w-fit m-auto hidden md:block max-w-full">
      <div className="max-w-full overflow-x-auto">
        <div className="flex gap-2 m-auto">
          <Table
            title={titleDate}
            columns={columnsDate.map((col) => ({ ...col, header: headerDate }))}
            data={currentData}
            dataTestid="table-date"
          />

          {tagsSelected.includes(EnumFiltersTags.CLIENTS) && (
            <Table
              title="Clientes"
              columns={columnsClients}
              data={currentData}
              dataTestid="table-clients"
            />
          )}
          {tagsSelected.includes(EnumFiltersTags.TRANSACTIONS) && (
            <Table
              title="Transacciones"
              columns={columnsTransactions}
              data={currentData}
              className="px-8"
              dataTestid="table-transactions"
            />
          )}
          {tagsSelected.includes(EnumFiltersTags.MONEY) && (
            <Table
              title="Dinero"
              columns={columnsMoney}
              data={currentData}
              dataTestid="table-money"
            />
          )}
          {tagsSelected.includes(EnumFiltersTags.CASHBACK) && (
            <Table
              title="Cashback"
              columns={columnsCashback}
              data={currentData}
              dataTestid="table-cashback"
            />
          )}
        </div>
      </div>

      <Pagination
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        totalPages={totalPages}
        prevPage={prevPage}
        nextPage={nextPage}
        goToPage={goToPage}
        canNextPage={canNextPage}
        canPrevPage={canPrevPage}
        setItemsPerPage={setItemsPerPage}
      />
    </div>
  );
};

export default DashboardTable;
