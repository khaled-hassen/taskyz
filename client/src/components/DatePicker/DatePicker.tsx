import React from "react";
import { IconButton } from "../styles/Button";
import CalendarIcon from "../icons/CalendarIcon";
import { useDatePicker } from "../../hook/task/useDatePicker";
import { DatePickerContainer } from "../styles/DatePickerStyles";
import CancelIcon from "../icons/CancelIcon";
import CalendarModal from "../Modal/CalendarModal";
import { P } from "../styles/Text";

interface IProps {
  initialValue: Date | null;
  onChange(value: Date): void;
  onClear?(): void;
}

const DatePicker: React.FC<IProps> = (props) => {
  const {
    show,
    showClear,
    DAYS_NAMES,
    days,
    getMonthName,
    getDate,
    getCalendarYear,
    getMonthStartDay,
    isActive,
    previousMonth,
    nextMonth,
    handleChangeDate,
    displayClearBtn,
    hideClearBtn,
    clearDate,
    display,
    hide,
  } = useDatePicker(props.initialValue);

  return (
    <DatePickerContainer>
      <IconButton
        type="button"
        onClick={display}
        aria-label="Set date"
        onMouseOver={displayClearBtn}
        onMouseLeave={hideClearBtn}
      >
        {showClear ? (
          <IconButton
            type="button"
            aria-label="Clear date"
            onClick={clearDate(props.onClear || (() => {}))}
          >
            <CancelIcon />
          </IconButton>
        ) : (
          <CalendarIcon />
        )}
        <P>{getDate()}</P>
      </IconButton>

      <CalendarModal
        show={show}
        daysNames={DAYS_NAMES}
        days={days}
        getMonthName={getMonthName}
        getCalendarYear={getCalendarYear}
        previousMonth={previousMonth}
        nextMonth={nextMonth}
        getMonthStartDay={getMonthStartDay}
        onChange={(date) => handleChangeDate(date, props.onChange)()}
        isActive={isActive}
        onClose={hide}
      />
    </DatePickerContainer>
  );
};

export default DatePicker;
