import React from 'react';
import TableMui from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Tooltip } from '@mui/material';

export type Column<T> = {
  header: string;
  keyAccessor: keyof T;
  render?: (row: T) => React.ReactNode;
  renderTooltip?: (row: T) => React.ReactNode;
};

interface IProps<IData> {
  title: string;
  columns: Column<IData>[];
  data: IData[];
  className?: string;
}

const Table = <IData,>({
  title,
  columns,
  data,
  className = '',
}: IProps<IData>): React.ReactElement => {
  const numberOfColumns = columns.length;
  return (
    <div
      className={`${
        numberOfColumns !== 1 ? 'p-4' : 'py-4 px-1.5'
      } bg-[#e6e1e6] rounded-[10px] ${className}`}
    >
      <h4 className="text-center text-sm mb-4 font-medium text-[#48454E]">
        {title}
      </h4>
      <TableContainer numberOfColumns={numberOfColumns}>
        <TableMui aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell align="center" key={index} className="text-nowrap">
                  {column.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {columns.map((column, colIndex) => {
                  const value = column.render
                    ? column.render(row)
                    : row[column.keyAccessor];
                  return (
                    <Tooltip
                      title={String(
                        column.renderTooltip
                          ? column.renderTooltip(row)
                          : row[column.keyAccessor]
                      )}
                      key={colIndex}
                    >
                      <TableCell
                        align="center"
                        key={colIndex}
                        className="text-nowrap"
                      >
                        <>{!!value ? value : '-'}</>
                      </TableCell>
                    </Tooltip>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </TableMui>
      </TableContainer>
    </div>
  );
};

export default Table;
