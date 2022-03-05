import React, { useEffect, useState } from "react";
import {
  addMonths,
  compareAsc,
  format,
  getDaysInMonth,
  getYear,
  setDate,
  startOfMonth,
} from "date-fns";
import { getIsTouchScreen } from "../../utils/browser.utils";

export function useDatePicker(initialValue: Date | null) {
  const touchScreen = getIsTouchScreen();
  const [show, setShow] = useState(false);
  const [dateNullable, setDateNullable] = useState(initialValue === null);
  const [showClear, setShowClear] = useState(touchScreen && !dateNullable);
  const [activeDate, setActiveDate] = useState(initialValue || new Date());
  const [calendar, setCalendar] = useState(setDate(new Date(), 1));
  const [days, setDays] = useState<Date[]>([]);
  const DAYS_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getMonthStartDay = () => startOfMonth(calendar).getDay();
  const getMonthName = () => format(calendar, "LLLL");
  const getCalendarYear = () => getYear(calendar);
  const getDate = () =>
    dateNullable ? "Due Date" : format(activeDate, "EEE, MMM d, y");
  const display = () => setShow(true);
  const hide = () => setShow(false);
  const previousMonth = () => setCalendar((prev) => addMonths(prev, -1));
  const nextMonth = () => setCalendar((prev) => addMonths(prev, 1));
  const isActive = (date: Date) => !compareAsc(activeDate, date);

  function changeDate(date: Date) {
    setActiveDate(date);
    if (touchScreen) setShowClear(true);
    if (dateNullable) setDateNullable(false);
  }

  function handleChangeDate(date: Date, callback: (value: Date) => void) {
    return () => {
      changeDate(date);
      hide();
      callback(date);
    };
  }

  function displayClearBtn() {
    if (!dateNullable && !touchScreen) setShowClear(true);
  }

  function hideClearBtn() {
    if (!dateNullable && !touchScreen) setShowClear(false);
  }

  function clearDate(callback: () => void) {
    return (e: React.MouseEvent) => {
      e.stopPropagation();
      setDateNullable(true);
      if (touchScreen) setShowClear(false);
      callback();
    };
  }

  useEffect(() => {
    // refresh the number of days in the new calendar
    const days = [];
    for (let i = 1; i <= getDaysInMonth(calendar); i++)
      days.push(setDate(calendar, i));
    setDays(days);
  }, [calendar]);

  useEffect(() => {
    // to open the new date after changing the date
    setCalendar(activeDate);
  }, [activeDate]);

  return {
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
  };
}
