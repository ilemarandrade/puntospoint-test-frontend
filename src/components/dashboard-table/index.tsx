import { IMovementsData } from '@/types/recharts';
import Table from '../table';
import { EnumFiltersTags } from '@/types/filters';
import Pagination from '../table/pagination';
import { usePagination } from '@/hooks/use-pagination';
import {
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
    <div className="space-y-4 w-fit m-auto ">
      <div className="flex gap-2 justify-center">
        <Table
          title={titleDate}
          columns={columnsDate.map((col) => ({ ...col, header: headerDate }))}
          data={currentData}
        />

        {tagsSelected.includes(EnumFiltersTags.CLIENTS) && (
          <Table title="Clientes" columns={columnsClients} data={currentData} />
        )}
        {tagsSelected.includes(EnumFiltersTags.TRANSACTIONS) && (
          <Table
            title="Transacciones"
            columns={columnsTransactions}
            data={data}
            className="px-8"
          />
        )}
        {tagsSelected.includes(EnumFiltersTags.MONEY) && (
          <Table title="Dinero" columns={columnsMoney} data={currentData} />
        )}
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
