'use client';

import type React from 'react';
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  Box,
  Typography,
  type SelectChangeEvent,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface IProps {
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
  prevPage: () => void;
  nextPage: () => void;
  goToPage: (page: number) => void;
  canPrevPage: boolean;
  canNextPage: boolean;
  setItemsPerPage: (value: number) => void;
}

const Pagination: React.FC<IProps> = ({
  itemsPerPage,
  currentPage,
  totalPages,
  prevPage,
  nextPage,
  canPrevPage,
  canNextPage,
  setItemsPerPage,
}) => {
  const handleItemsPerPageChange = (event: SelectChangeEvent) => {
    setItemsPerPage(Number(event.target.value));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mt: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Filas por página
        </Typography>
        <FormControl size="small" sx={{ minWidth: 80 }}>
          <Select
            value={itemsPerPage.toString()}
            onChange={handleItemsPerPageChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Filas por página' }}
          >
            {[5, 10, 20, 50, 100].map((pageSize) => (
              <MenuItem key={pageSize} value={pageSize.toString()}>
                {pageSize}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Página {currentPage} de {totalPages}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={prevPage}
            disabled={!canPrevPage}
            sx={{ minWidth: 'unset', p: 1 }}
          >
            <ChevronLeftIcon fontSize="small" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={nextPage}
            disabled={!canNextPage}
            sx={{ minWidth: 'unset', p: 1 }}
          >
            <ChevronRightIcon fontSize="small" />
            <span className="sr-only">Página siguiente</span>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Pagination;
