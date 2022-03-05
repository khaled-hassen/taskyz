import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { getLoadingIndicator } from "../LoadingIndicators/LoadingTask";
import { ITask } from "../../types/graphql.types";
import { useAnimationOrder } from "../../hook/animation/useAnimationOrder";
import { CardTransitionContainer } from "../styles/CardContainer";
import Task from "./Task";

interface IProps {
  tasks: ITask[];
  loading: boolean;
  scrollable?: boolean;
  onChange(date: number): void;
  onDelete(id: string): void;
  onToggle(isDone: boolean): void;
}

const TasksTransition: React.FC<IProps> = (props) => {
  const [show, setShow] = useState(false);
  const { handleEnter, handleExit, handleExited } = useAnimationOrder("task");

  return (
    <CardTransitionContainer scrollable={props.scrollable}>
      {getLoadingIndicator(props.loading, () => setShow(true))}
      <TransitionGroup className="transition-group">
        {show &&
          props.tasks.map(({ id, name, dueDate, isDone }, idx) => (
            <CSSTransition
              key={id}
              timeout={300}
              onEnter={handleEnter(`${idx}`)}
              onExit={handleExit(`${props.tasks.length - idx - 1}`)}
              onExited={handleExited(idx)}
              classNames="fade-zoom"
              mountOnEnter
              unmountOnExit
            >
              <Task
                id={id}
                name={name}
                dueDate={dueDate}
                isDone={isDone}
                onChange={props.onChange}
                onDelete={props.onDelete}
                onToggle={props.onToggle}
              />
            </CSSTransition>
          ))}
      </TransitionGroup>
    </CardTransitionContainer>
  );
};

export default TasksTransition;
