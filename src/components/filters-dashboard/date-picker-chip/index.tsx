'use client';

import type React from 'react';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Popover } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { DatePicker } from '../../date-picker';
import Chip from '../../chip';

type DatePickerPopoverProps = {
  initialDate?: Date;
  onRangeChange?: (startDate: Date, endDate: Date) => void;
  onClick?: () => void;
  rangeMode?: boolean;
  buttonLabel?: string;
  className?: string;
  isSelected?: boolean;
};

function DatePickerPopover({
  initialDate = new Date(),
  onRangeChange,
  rangeMode = false,
  buttonLabel = 'Personalizado',
  className,
  onClick,
  isSelected = false,
}: DatePickerPopoverProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [dateRange, setDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onClick && onClick();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRangeChange = (start: Date, end: Date) => {
    setDateRange({ start, end });
    onRangeChange?.(start, end);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'date-picker-popover' : undefined;

  useEffect(() => {
    if (!isSelected) {
      setDateRange({ start: null, end: null });
    }
  }, [initialDate, isSelected]);

  return (
    <div className={className}>
      <Chip
        label={
          dateRange.start && dateRange.end
            ? `${format(dateRange.start, 'd MMM', { locale: es })} - ${format(
                dateRange.end,
                'd MMM',
                { locale: es }
              )}`
            : buttonLabel
        }
        icon={<CalendarTodayIcon />}
        variant={
          isSelected && (dateRange?.start || dateRange?.end || open)
            ? 'filled'
            : 'text'
        }
        onClick={handleClick}
      />

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{
          '& .MuiPopover-paper': {
            boxShadow: 'none',
            border: 'none',
            background: 'transparent',
          },
        }}
      >
        <DatePicker onRangeChange={handleRangeChange} rangeMode={rangeMode} />
      </Popover>
    </div>
  );
}

export default DatePickerPopover;
