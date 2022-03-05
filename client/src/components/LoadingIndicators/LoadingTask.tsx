import React from "react";
import { TaskCardContainer } from "../styles/CardContainer";
import Row from "../styles/Row";
import { useAnimationOrder } from "../../hook/animation/useAnimationOrder";
import { CSSTransition } from "react-transition-group";

interface IProps {}

const LoadingTask: React.FC<IProps> = (props) => {
  return (
    <TaskCardContainer>
      <div className="animate-pulse opacity-20">
        <Row centerItems className="mb-5 gap-4">
          <div className="rounded-full bg-custom-white h-4 w-4" />
          <div className="h-4 bg-custom-white w-1/2 rounded-full" />
        </Row>
        <div className="h-4 bg-custom-white w-1/4 rounded-full" />
      </div>
    </TaskCardContainer>
  );
};

export function getLoadingIndicator(loading = false, onDone?: () => void) {
  return (() => {
    const indicators = [1, 2, 3];
    const { handleEnter, handleExit } = useAnimationOrder();

    return (
      <>
        {indicators.map((_, idx) => (
          <CSSTransition
            key={idx}
            in={loading}
            timeout={300}
            onEnter={handleEnter(`${idx}`)}
            onExit={handleExit(`${indicators.length - idx - 1}`)}
            onEntered={onDone}
            onExited={onDone}
            classNames="fade-zoom"
            mountOnEnter
            unmountOnExit
          >
            <LoadingTask />
          </CSSTransition>
        ))}
      </>
    );
  })();
}
