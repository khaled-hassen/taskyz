import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { getLoadingIndicator } from "../LoadingIndicators/LoadingCollection";
import Collection from "./Collection";
import { ICollection } from "../../types/graphql.types";
import { useAnimationOrder } from "../../hook/animation/useAnimationOrder";
import { CardTransitionContainer } from "../styles/CardContainer";

interface IProps {
  collections: ICollection[];
  loading: boolean;
  scrollable?: boolean;
  onClick(id: string): void;
  onDelete?(id: string): void;
}

const CollectionsTransition: React.FC<IProps> = (props) => {
  const [show, setShow] = useState(false);
  const { handleEnter, handleExit, handleExited } = useAnimationOrder(
    "collection"
  );

  return (
    <CardTransitionContainer scrollable={props.scrollable}>
      {getLoadingIndicator(props.loading, () => setShow(true))}
      <TransitionGroup className="transition-group">
        {show &&
          props.collections.map((collection, idx) => (
            <CSSTransition
              key={collection.id}
              timeout={300}
              onEnter={handleEnter(`${idx}`)}
              onExit={handleExit(`${props.collections.length - idx - 1}`)}
              onExited={handleExited(idx)}
              classNames="fade-zoom"
              mountOnEnter
              unmountOnExit
            >
              <Collection
                name={collection.name}
                updatedAt={collection.updatedAt}
                completedTasks={collection.completedTasks}
                totalTasks={collection.totalTasks}
                onClick={() => props.onClick(collection.id)}
                onDelete={
                  props.onDelete
                    ? () => props.onDelete!(collection.id)
                    : undefined
                }
              />
            </CSSTransition>
          ))}
      </TransitionGroup>
    </CardTransitionContainer>
  );
};

export default CollectionsTransition;
