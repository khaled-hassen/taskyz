import React from "react";
import Row from "../styles/Row";
import { IconButton } from "../styles/Button";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import RightArrowIcon from "../icons/RightArrowIcon";
import {
  CalendarContainer,
  DatesContainer,
  DateText,
} from "../styles/DatePickerStyles";
import Modal from "./Modal";
import { P } from "../styles/Text";

interface IProps {
  show: boolean;
  daysNames: string[];
  days: Date[];
  getMonthName(): string;
  getCalendarYear(): number;
  previousMonth(): void;
  nextMonth(): void;
  getMonthStartDay(): number;
  onChange(date: Date): void;
  isActive(date: Date): boolean;
  onClose(): void;
}

const CalendarModal: React.FC<IProps> = (props) => {
  return (
    <Modal show={props.show} onClose={props.onClose}>
      <CalendarContainer>
        <Row between centerItems>
          <Row id="date">
            <P>{props.getMonthName()}</P>
            <P>{props.getCalendarYear()}</P>
          </Row>
          <Row centerItems>
            <IconButton type="button" onClick={props.previousMonth}>
              <LeftArrowIcon />
            </IconButton>
            <IconButton type="button" onClick={props.nextMonth}>
              <RightArrowIcon />
            </IconButton>
          </Row>
        </Row>

        <Row centerItems between id="days">
          {props.daysNames.map((day) => (
            <p key={day}>{day}</p>
          ))}
        </Row>

        <DatesContainer monthStartDay={props.getMonthStartDay()}>
          <div />
          {props.days.map((date) => (
            <DateText
              key={date.getDate()}
              onClick={() => props.onChange(date)}
              active={props.isActive(date)}
            >
              {date.getDate()}
            </DateText>
          ))}
        </DatesContainer>
      </CalendarContainer>
    </Modal>
  );
};

export default CalendarModal;
