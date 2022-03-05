import { useEffect, useState } from "react";
import { ICollectionQuery, ITask } from "../../types/graphql.types";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import {
  CollectionQuery,
  UpdateCollectionMutation,
} from "../../graphql/collection.graphql";
import {
  AddTaskMutation,
  DeleteTaskMutation,
} from "../../graphql/task.graphql";
import { useDelayedChange } from "../input/useDelayedChange";
import { IInputForm } from "../../types/form.types";
import { getCompletion } from "../../utils/task.utils";
import { toast } from "react-hot-toast";
import { getApolloError } from "../../utils/form.utils";

export function useCollection() {
  const [updatedAt, setUpdatedAt] = useState(0);
  const [name, setName] = useState("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [completedTasks, setCompletedTasks] = useState(0.0);
  const [completion, setCompletion] = useState(0);
  const { onChange, onBlur } = useDelayedChange(handleChange);

  const history = useHistory();
  const id = history.location.pathname.split("/")[2];

  const { loading } = useQuery<ICollectionQuery>(CollectionQuery, {
    variables: { id },
    fetchPolicy: "cache-and-network",
    onCompleted: handleCollectionQueryComplete,
    onError: () => history.replace("/404"),
  });

  const [addTask] = useMutation(AddTaskMutation);
  const [updateCollection] = useMutation(UpdateCollectionMutation);
  const [deleteTask] = useMutation(DeleteTaskMutation);

  function handleCollectionQueryComplete({ collection }: ICollectionQuery) {
    setUpdatedAt(collection.updatedAt);
    setName(collection.name);
    setTasks(
      collection.tasks?.map((task) => ({
        ...task,
        dueDate: task.dueDate ? new Date(task.dueDate) : null,
      })) || []
    );
    setCompletedTasks(collection.completedTasks);
  }

  async function handleChange(name: string) {
    try {
      const { data } = await toast.promise(
        updateCollection({ variables: { id, newName: name } }),
        {
          loading: "Saving collection...",
          success: "Collection saved",
          error: (error) => getApolloError(error),
        }
      );
      if (data?.updateCollection) {
        setName(name);
        setUpdatedAt(data.updateCollection.updatedAt);
      }
    } catch (_) {}
  }

  async function handleAddTask({ value, dueDate }: IInputForm) {
    try {
      const { data } = await toast.promise(
        addTask({ variables: { id, name: value, dueDate } }),
        {
          loading: "Adding task...",
          success: "Task added",
          error: (error) => getApolloError(error),
        }
      );
      if (data && data.addTask) setTasks((prev) => [...prev, data.addTask]);
    } catch (_) {}
  }

  function handleDeleteTask(id: string) {
    toast
      .promise(deleteTask({ variables: { id } }), {
        loading: "Deleting task...",
        success: "Task deleted",
        error: (error) => getApolloError(error),
      })
      .then(() => setTasks((prev) => prev.filter((task) => task.id !== id)))
      .catch((_) => {});
  }

  function changeCompletedTasks(isDone: boolean) {
    if (isDone) setCompletedTasks((prev) => prev + 1);
    else setCompletedTasks((prev) => prev - 1);
  }

  function handleUpdate(date: number) {
    setUpdatedAt(date);
  }

  // Set completion percentage
  useEffect(() => {
    if (completedTasks > tasks.length) setCompletedTasks(tasks.length);
    setCompletion(getCompletion(completedTasks, tasks.length));
  }, [tasks, completedTasks]);

  function goBack() {
    history.push("/collections");
  }

  return {
    name,
    updatedAt,
    tasks,
    completion,
    loading,
    onChange,
    onBlur,
    handleAddTask,
    handleUpdate,
    handleDeleteTask,
    changeCompletedTasks,
    goBack,
  };
}
