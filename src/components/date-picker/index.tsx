'use client';

import { useState } from 'react';
import {
  format,
  addMonths,
  subMonths,
  addYears,
  subYears,
  getDaysInMonth,
  startOfMonth,
  getDay,
  setDate,
  isSameDay,
  isWithinInterval,
  isBefore,
  getMonth,
  getYear,
  setMonth,
  setYear,
} from 'date-fns';
import clsx from 'clsx';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CheckIcon from '@mui/icons-material/Check';

type DatePickerProps = {
  initialDate?: {
    start: Date | null;
    end: Date | null;
  };
  onDateChange?: (date: Date) => void;
  onRangeChange?: (startDate: Date, endDate: Date) => void;
  className?: string;
  rangeMode?: boolean;
};

export function DatePicker({
  initialDate = {
    start: null,
    end: null,
  },
  onDateChange,
  onRangeChange,
  className,
  rangeMode = false,
}: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date | null>(initialDate.start);
  const [endDate, setEndDate] = useState<Date | null>(initialDate.end);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [view, setView] = useState<'calendar' | 'month' | 'year'>('calendar');
  const [isSelectingMonth, setIsSelectingMonth] = useState<boolean>(false);
  const [selectedMonths, setSelectedMonths] = useState<number[]>([]);
  console.log({ startDate, endDate });
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  const shortMonths = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ];

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handlePrevYear = () => {
    setCurrentDate(subYears(currentDate, 1));
  };

  const handleNextYear = () => {
    setCurrentDate(addYears(currentDate, 1));
  };

  const handleDateSelect = (day: number) => {
    const newDate = setDate(currentDate, day);

    if (rangeMode) {
      if (!startDate || (startDate && endDate)) {
        setStartDate(newDate);
        setEndDate(null);
      } else {
        if (isBefore(newDate, startDate)) {
          setEndDate(startDate);
          setStartDate(newDate);
        } else {
          setEndDate(newDate);
        }

        if (onRangeChange && startDate) {
          onRangeChange(
            isBefore(newDate, startDate) ? newDate : startDate,
            isBefore(newDate, startDate) ? startDate : newDate
          );
        }
      }
    } else {
      setSelectedDate(newDate);
      onDateChange?.(newDate);
    }
  };

  const handleMonthSelect = (month: number) => {
    if (isSelectingMonth) {
      const newSelectedMonths = [...selectedMonths];
      const monthIndex = newSelectedMonths.indexOf(month);

      if (monthIndex === -1) {
        newSelectedMonths.push(month);
      } else {
        newSelectedMonths.splice(monthIndex, 1);
      }

      setSelectedMonths(newSelectedMonths);
    } else {
      setCurrentDate(setMonth(currentDate, month));
      setView('calendar');
    }
  };

  const handleYearSelect = (year: number) => {
    setCurrentDate(setYear(currentDate, year));
    setView('calendar');
  };

  const handleCancel = () => {
    setSelectedDate(new Date());
    setCurrentDate(new Date());
    setStartDate(null);
    setEndDate(null);
    setSelectedMonths([]);
    setView('calendar');
  };

  const handleOK = () => {
    if (rangeMode && startDate && endDate) {
      onRangeChange?.(startDate, endDate);
    } else if (selectedMonths.length > 0) {
      console.log(
        'Selected months:',
        selectedMonths.map((m) => months[m])
      );
    } else {
      onDateChange?.(selectedDate);
    }
    setView('calendar');
    setIsSelectingMonth(false);
  };

  const isDateInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return isWithinInterval(date, { start: startDate, end: endDate });
  };

  const isRangeStart = (date: Date) => {
    if (!startDate) return false;
    return isSameDay(date, startDate);
  };

  const isRangeEnd = (date: Date) => {
    if (!endDate) return false;
    return isSameDay(date, endDate);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getDay(startOfMonth(currentDate));

    const daysFromPrevMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    const prevMonth = subMonths(currentDate, 1);
    const prevMonthDays = getDaysInMonth(prevMonth);

    const days = [];

    for (
      let i = prevMonthDays - daysFromPrevMonth + 1;
      i <= prevMonthDays;
      i++
    ) {
      const date = setDate(prevMonth, i);
      days.push(
        <div
          key={`prev-${i}`}
          className="flex items-center justify-center h-8 w-8 text-gray-400"
        >
          {i}
        </div>
      );
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = setDate(currentDate, i);
      const isSelected = rangeMode
        ? isRangeStart(date) || isRangeEnd(date)
        : isSameDay(date, selectedDate);

      const inRange = rangeMode && isDateInRange(date);

      days.push(
        <div
          key={i}
          className={clsx(
            'flex items-center justify-center h-8 w-8 cursor-pointer hover:bg-gray-200 hover:text-black rounded-full ',
            isSelected && 'rounded-full bg-primary text-white',
            inRange && !isSelected && 'bg-[#d6d1d6] rounded-none',
            !isSelected && !inRange && 'hover:bg-indigo-50'
          )}
          onClick={(e) => {
            handleDateSelect(i);
          }}
        >
          {i}
        </div>
      );
    }

    const totalCells = 42;
    const nextMonthDays = totalCells - days.length;
    const nextMonth = addMonths(currentDate, 1);

    for (let i = 1; i <= nextMonthDays; i++) {
      const date = setDate(nextMonth, i);
      days.push(
        <div
          key={`next-${i}`}
          className="flex items-center justify-center h-8 w-8 text-gray-400"
        >
          {i}
        </div>
      );
    }

    return days;
  };

  const renderMonths = () => {
    return months.map((month, index) => {
      const isSelected = isSelectingMonth
        ? selectedMonths.includes(index)
        : index === getMonth(currentDate);

      return (
        <div
          key={month}
          className={clsx(
            'p-3 cursor-pointer flex items-center',
            isSelected && 'bg-[#d6d1d6]'
          )}
          onClick={() => handleMonthSelect(index)}
        >
          {isSelected && <CheckIcon className="mr-2" fontSize="small" />}
          {month}
        </div>
      );
    });
  };

  const renderYears = () => {
    const currentYear = getYear(currentDate);
    const startYear = currentYear - 2;
    const years = [];

    for (let i = 0; i < 6; i++) {
      const year = startYear + i;
      const isSelected = year === currentYear;

      years.push(
        <div
          key={year}
          className={clsx(
            'p-3 cursor-pointer flex items-center',
            isSelected && 'bg-[#d6d1d6]'
          )}
          onClick={() => handleYearSelect(year)}
        >
          {isSelected && <CheckIcon className="mr-2" fontSize="small" />}
          {year}
        </div>
      );
    }

    return years;
  };

  return (
    <div
      className={clsx(
        'bg-[#E6E1E6] rounded-lg max-w-xs shadow-lg mt-4 min-w-[280px]',
        className
      )}
    >
      {view === 'calendar' && (
        <div className="flex flex-col p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrevMonth}
                className="p-1 rounded-full hover:bg-gray-200"
              >
                <KeyboardArrowLeftIcon fontSize="small" />
              </button>
              <span
                className="cursor-pointer text-sm"
                onClick={() => setView('month')}
              >
                {shortMonths[getMonth(currentDate)]}
              </span>
              <button
                onClick={handleNextMonth}
                className="p-1 rounded-full hover:bg-gray-200"
              >
                <KeyboardArrowRightIcon fontSize="small" />
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrevYear}
                className="p-1 rounded-full hover:bg-gray-200"
              >
                <KeyboardArrowLeftIcon fontSize="small" />
              </button>
              <span
                className="cursor-pointer text-sm"
                onClick={() => setView('year')}
              >
                {format(currentDate, 'yyyy')}
              </span>
              <button
                onClick={handleNextYear}
                className="p-1 rounded-full hover:bg-gray-200"
              >
                <KeyboardArrowRightIcon fontSize="small" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {['D', 'L', 'M', 'X', 'J', 'V', 'S'].map((day) => (
              <div
                key={day}
                className="flex items-center justify-center h-8 w-8 font-medium"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>

          <div className="flex justify-end mt-4">
            <div className="flex space-x-2">
              <button
                onClick={handleCancel}
                className="text-primary text-sm px-3 py-1 hover:bg-indigo-50 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleOK}
                className="text-primary text-sm px-3 py-1 hover:bg-indigo-50 rounded"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}

      {view === 'month' && (
        <div className="flex flex-col py-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex-1 flex justify-center">
              <div className="bg-primary text-white px-5 py-1 rounded-full w-fit ">
                {isSelectingMonth
                  ? 'Seleccionar Meses'
                  : months[getMonth(currentDate)]}
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div
                className="px-5 py-1 rounded-full w-fit cursor-pointer"
                onClick={() => setView('year')}
              >
                {format(currentDate, 'yyyy')}
              </div>
            </div>
          </div>

          <div className="flex flex-col overflow-y-auto max-h-64">
            {renderMonths()}
          </div>
        </div>
      )}

      {view === 'year' && (
        <div className="flex flex-col py-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex-1 flex justify-center">
              <div
                className=" px-5 py-1 rounded-full w-fit cursor-pointer"
                onClick={() => setView('month')}
              >
                {months[getMonth(currentDate)]}
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-primary text-white px-5 py-1 rounded-full w-fit">
                {format(currentDate, 'yyyy')}
              </div>
            </div>
          </div>

          <div className="flex flex-col divide-y overflow-y-auto max-h-64">
            {renderYears()}
          </div>
        </div>
      )}
    </div>
  );
}
