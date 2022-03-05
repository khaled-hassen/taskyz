import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UpdateTaskMutation } from "../../graphql/task.graphql";
import { useDelayedChange } from "../input/useDelayedChange";
import { toast } from "react-hot-toast";
import { getApolloError } from "../../utils/form.utils";

interface IUpdateTaskParams {
  newName: string | null;
  isDone: boolean | null;
  dueDate: Date | null;
}
type Action = "NAME" | "TOGGLE" | "DATE";

export function useTask(
  id: string,
  initName: string,
  initIsDone: boolean,
  initDueDate: Date | null,
  onToggle: (isDone: boolean) => void
) {
  const [name, setName] = useState(initName);
  const [isDone, setIsDone] = useState(initIsDone);
  const [dueDate, setDueDate] = useState(initDueDate);
  const { onChange, onBlur } = useDelayedChange(handleChange);
  const [updateTask] = useMutation(UpdateTaskMutation);

  function handleChange(name: string) {
    handleUpdateTask({ newName: name, isDone: null, dueDate: null }, "NAME");
  }

  function toggleCompletion() {
    handleUpdateTask(
      { newName: null, isDone: !isDone, dueDate: null },
      "TOGGLE"
    );
  }

  const handleChangeDueDate = (dueDate: Date) =>
    handleUpdateTask({ newName: null, isDone: null, dueDate }, "DATE");
  const handleClearDate = () =>
    handleUpdateTask({ newName: null, isDone: null, dueDate: null }, "DATE");

  async function handleUpdateTask(args: IUpdateTaskParams, action: Action) {
    try {
      await toast.promise(updateTask({ variables: { id, ...args } }), {
        loading: "Saving task...",
        success: "Task saved",
        error: (error) => getApolloError(error),
      });

      if (action === "NAME") if (args.newName !== null) setName(args.newName);
      if (action === "DATE") setDueDate(args.dueDate);
      if (action === "TOGGLE") {
        onToggle(!isDone);
        setIsDone((prev) => !prev);
      }
    } catch (_) {}
  }

  return {
    name,
    isDone,
    dueDate,
    onChange,
    onBlur,
    toggleCompletion,
    handleChangeDueDate,
    handleClearDate,
  };
}
