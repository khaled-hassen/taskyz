import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IInputForm } from "../../types/form.types";
import { required } from "../../utils/form.utils";
import { useClickAway } from "../utils/useClickAway";
import { toast } from "react-hot-toast";

type SubmitHandler = (data: IInputForm) => void;

export function useInput(
  error: string,
  callback: SubmitHandler,
  withDate?: boolean
) {
  const input = useRef<HTMLInputElement | null>(null);
  const { register, handleSubmit, formState, reset } = useForm<IInputForm>();
  const [date, setDate] = useState<Date | null>(null);
  const { errors } = formState;
  const { ref, ...rest } = register("value", { validate: required });
  const { ref: container } = useClickAway<HTMLFormElement>(resetForm);
  const [expanded, setExpanded] = useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    handleSubmit(({ value }) => callback({ value, dueDate: date }))(e);
    input.current?.blur();
    resetForm();
  }

  function handleDateChange(value?: Date) {
    if (!withDate) return;

    if (value) setDate(value);
    else setDate(null);
    input.current?.focus();
  }

  function handleEscape({ key }: React.KeyboardEvent) {
    if (key === "Escape") input.current?.blur();
  }

  function resetForm() {
    reset();
    withDate && setDate(null);
    hidePicker();
  }

  function handleClick(e: React.MouseEvent) {
    if (e.target === container.current) input.current?.focus();
  }

  function hidePicker() {
    withDate && setExpanded(false);
  }

  function showPicker() {
    withDate && setExpanded(true);
  }

  useEffect(() => {
    if (errors.value) toast.error(error);
  }, [errors]);

  useEffect(() => {
    const ref = container.current;
    ref?.addEventListener("focusin", showPicker);
    return () => ref?.removeEventListener("focusin", showPicker);
  }, [container]);

  return {
    expanded,
    container,
    ref,
    input,
    date,
    rest,
    submit,
    handleClick,
    handleEscape,
    handleDateChange,
  };
}
