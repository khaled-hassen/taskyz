import React from "react";
import Row from "../styles/Row";
import { IconButton } from "../styles/Button";
import { EditableH3 } from "../styles/Text";
import DatePicker from "../DatePicker/DatePicker";
import { TaskCardContainer } from "../styles/CardContainer";
import { useTask } from "../../hook/task/useTask";
import CheckIcon from "../icons/CheckIcon";
import TrashIcon from "../icons/TrashIcon";

interface IProps {
  id: string;
  name: string;
  isDone: boolean;
  dueDate: Date | null;
  onDelete(id: string): void;
  onChange(date: number): void;
  onToggle(isDone: boolean): void;
}

const Task: React.FC<IProps> = (props) => {
  const {
    name,
    isDone,
    dueDate,
    onChange,
    onBlur,
    toggleCompletion,
    handleChangeDueDate,
    handleClearDate,
  } = useTask(
    props.id,
    props.name,
    props.isDone,
    props.dueDate,
    props.onToggle
  );

  return (
    <TaskCardContainer>
      <Row centerItems id="content">
        <IconButton aria-label="check-uncheck" onClick={toggleCompletion}>
          <CheckIcon size={28} checked={isDone} />
        </IconButton>
        <EditableH3
          defaultValue={name}
          aria-label={`Edit ${name} task name`}
          className={"ml-4 " + (isDone ? "line-through opacity-60" : "")}
          onChange={onChange}
          onBlur={onBlur}
        />
      </Row>
      <Row between centerItems>
        <DatePicker
          initialValue={dueDate}
          onChange={handleChangeDueDate}
          onClear={handleClearDate}
        />
        <IconButton
          className="self-start delete-btn"
          aria-label="Delete"
          onClick={(e) => {
            e.stopPropagation();
            props.onDelete(props.id);
          }}
        >
          <TrashIcon />
        </IconButton>
      </Row>
    </TaskCardContainer>
  );
};

export default Task;
