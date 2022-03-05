import React from "react";
import { EditableH2 } from "../components/styles/Text";
import AddInput from "../components/Form/AddInput";
import Row from "../components/styles/Row";
import ProgressBar from "../components/styles/ProgressBar";
import { useCollection } from "../hook/collections/useCollection";
import { timeElapsed } from "../utils/time.utils";
import TasksTransition from "../components/Task/TasksTransition";
import { Page } from "../components/styles/Containers";
import { IconButton } from "../components/styles/Button";
import LeftArrowIcon from "../components/icons/LeftArrowIcon";
import { LoadingCollectionHeader } from "../components/LoadingIndicators/LoadingHeader";
import { Helmet } from "react-helmet";

interface IProps {
  withHeader: boolean;
}

const TasksPage: React.FC<IProps> = (props) => {
  const {
    loading,
    name,
    updatedAt,
    tasks,
    completion,
    onChange,
    onBlur,
    handleAddTask,
    handleUpdate,
    handleDeleteTask,
    changeCompletedTasks,
    goBack,
  } = useCollection();

  return (
    <Page withHeader={props.withHeader}>
      <Helmet>
        <title>Taskyz: {name}</title>
      </Helmet>

      {loading ? (
        <LoadingCollectionHeader />
      ) : (
        <>
          <Row centerItems className="mb-4">
            <IconButton
              aria-label="Back"
              className="transform -translate-x-2"
              onClick={goBack}
            >
              <LeftArrowIcon size={35} />
            </IconButton>
            <EditableH2
              className="ml-4"
              aria-label={`Edit ${name} collection name`}
              onChange={onChange}
              defaultValue={name}
              onBlur={onBlur}
            />
          </Row>
          <Row between centerItems>
            <p style={{ color: "hsla(var(--text-color), 0.6)" }}>
              Modified: {timeElapsed(updatedAt)}
            </p>
            <ProgressBar progress={completion} />
          </Row>
          <AddInput
            className="my-5"
            withDatePicker
            placeholder="Add a task"
            error="Task name is required"
            onAdd={handleAddTask}
          />
        </>
      )}
      <TasksTransition
        scrollable
        tasks={tasks}
        loading={loading}
        onChange={handleUpdate}
        onDelete={handleDeleteTask}
        onToggle={changeCompletedTasks}
      />
    </Page>
  );
};

export default TasksPage;
