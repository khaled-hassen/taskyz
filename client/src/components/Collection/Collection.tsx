import React from "react";
import Row from "../styles/Row";
import { H2 } from "../styles/Text";
import { IconButton } from "../styles/Button";
import TrashIcon from "../icons/TrashIcon";
import { getCompletion } from "../../utils/task.utils";
import ProgressBar from "../styles/ProgressBar";
import { CollectionCard } from "../styles/CardContainer";
import { timeElapsed } from "../../utils/time.utils";

interface IProps {
  name: string;
  completedTasks: number;
  totalTasks: number;
  updatedAt: number;
  onClick(): void;
  onDelete?(): void;
}

const Collection: React.FC<IProps> = (props) => {
  function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    props.onDelete?.();
  }

  return (
    <CollectionCard clickable onClick={props.onClick}>
      <Row between centerItems className="mb-2">
        <H2>{props.name}</H2>
        <ProgressBar
          progress={getCompletion(props.completedTasks, props.totalTasks)}
        />
      </Row>
      <Row centerItems between>
        <p style={{ color: "hsla(var(--text-color), 0.6)" }}>
          Modified: {timeElapsed(props.updatedAt)}
        </p>
        {props.onDelete && (
          <IconButton
            className="self-start delete-btn"
            aria-label="Delete"
            onClick={handleDelete}
          >
            <TrashIcon />
          </IconButton>
        )}
      </Row>
    </CollectionCard>
  );
};

export default Collection;
