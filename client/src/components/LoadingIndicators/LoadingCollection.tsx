import React from "react";
import { CollectionCard } from "../styles/CardContainer";
import Row from "../styles/Row";
import { CSSTransition } from "react-transition-group";
import { useAnimationOrder } from "../../hook/animation/useAnimationOrder";

interface IProps {}

const LoadingCollection: React.FC<IProps> = (props) => {
  return (
    <CollectionCard>
      <div className="animate-pulse opacity-20">
        <Row between centerItems className="mb-5">
          <div
            style={{ backgroundColor: "hsl(var(--text-color))" }}
            className="h-4 w-1/2 rounded-full"
          />
          <div
            style={{ backgroundColor: "hsl(var(--text-color))" }}
            className="h-4 w-20 sm:w-1/5 rounded-full"
          />
        </Row>
        <div
          style={{ backgroundColor: "hsl(var(--text-color))" }}
          className="h-4 w-1/4 rounded-full"
        />
      </div>
    </CollectionCard>
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
            <LoadingCollection />
          </CSSTransition>
        ))}
      </>
    );
  })();
}
