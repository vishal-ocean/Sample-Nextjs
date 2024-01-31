import { UilArrowLeft, UilArrowRight } from '@/icons';
import { cn } from '@/utils';
import { forwardRef, useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';

interface FormDatePickerProps {
  onDateSelect?: (date: Date) => void;
  startDate?: Date; // Make sure 'startDate' is of type 'Date' or the correct type
  dateFormat?: string;
  isClearable?: boolean;
  placeholderText?: string;
  className?: string;
  maxDate?: Date;
  selected?: Date;
  onChange?: any;
  selectsRange?: any;
  endDate?: Date; // Make sure 'startDate' is of type 'Date' or the correct type
  minDate?: Date;
}
interface CustomHeaderProps {
  date: Date;
  changeYear: (year: number) => void;
  changeMonth: (month: number) => void;
  decreaseMonth: () => void;
  increaseMonth: () => void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
}

const getYears = (minDate?: number, maxDate?: number): number[] => {
  let startYear: number;
  let endYear: number;

  if (minDate && maxDate) {
    // both minDate and maxDate provided
    startYear = minDate;
    endYear = maxDate;
  } else if (minDate) {
    // only minDate provided
    startYear = minDate;
    endYear = minDate + 99;
  } else if (maxDate) {
    // only maxDate provided
    startYear = maxDate - 99;
    endYear = maxDate;
  } else {
    // neither minDate nor maxDate provided
    endYear = new Date().getFullYear();
    startYear = endYear - 99;
  }

  return Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );
};

export const DatePicker = forwardRef<any, FormDatePickerProps>(
  ({ onDateSelect, selected, maxDate, minDate, ...rest }, ref) => {
    let yearToShows = getYears(
      minDate?.getFullYear() || undefined,
      maxDate?.getFullYear() || undefined
    );

    const [selectedDate, setSelectedDate] = useState<Date | null>(
      selected || null
    );

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    function getMonthYear(date: Date) {
      const dt = new Date(date);

      const dtm = dt.getMonth();
      const dty = dt.getFullYear();
      return dtm + '/' + dty;
    }

    const handleDateChange = (date: Date | null) => {
      setSelectedDate(date);
      rest.onChange(date);
      if (onDateSelect) {
        if (date !== null) {
          onDateSelect(date);
        }
      }
    };

    useEffect(() => {
      setSelectedDate(selected || null);
    }, [selected]);

    return (
      <>
        <ReactDatePicker
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled
          }: CustomHeaderProps) => (
            <div className="flex justify-center gap-4 pb-4">
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                type="button"
                className={cn(prevMonthButtonDisabled && 'opacity-0')}
              >
                <UilArrowLeft className="dark:text-white"></UilArrowLeft>
              </button>
              <select
                className="text-black dark:text-white dark:!bg-gray-800"
                value={getMonthYear(date)}
                onChange={({ target: { value } }) => {
                  const [selectedMonth, selectedYear] = value.split('/');
                  changeMonth(parseInt(selectedMonth, 10));
                  changeYear(parseInt(selectedYear, 10));
                }}
              >
                {months.map((option, index) => (
                  <option
                    key={option}
                    value={`${index}/${new Date(date).getFullYear()}`}
                  >
                    {option}
                  </option>
                ))}
              </select>

              <select
                className="text-black dark:text-white dark:!bg-gray-800"
                value={new Date(date).getFullYear()}
                onChange={({ target: { value } }) =>
                  changeYear(parseInt(value, 10))
                }
              >
                {yearToShows.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                type="button"
                className={cn(nextMonthButtonDisabled && 'opacity-0')}
              >
                <UilArrowRight className="dark:text-white"></UilArrowRight>
              </button>
            </div>
          )}
          selected={selectedDate} // Use the state variable here
          onChange={handleDateChange} // Use the state updater function
          maxDate={maxDate}
          minDate={minDate}
          {...rest}
        />

        {/* {fieldState.error && <Error message={fieldState?.error?.message} />} */}
      </>
    );
  }
);

DatePicker.displayName = 'DatePicker';
