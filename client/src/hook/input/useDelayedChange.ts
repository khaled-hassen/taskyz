import { ChangeEvent, FocusEvent, useEffect, useRef } from "react";
import { isEmpty } from "../../utils/form.utils";
import { DelayedChangeCallback } from "../../types/form.types";

export function useDelayedChange(
  callback: DelayedChangeCallback,
  emptyCb?: Function
) {
  const timer = useRef<NodeJS.Timeout>();

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.trim();
    if (isEmpty(value)) {
      clearTimeout(timer.current!);
      return emptyCb?.();
    }

    clearTimeout(timer.current!);
    // the edit collection mutation will be sent if the user didn't update the name in the last [ms] seconds this will prevent mutation spamming
    const ms = 500;
    timer.current = setTimeout(() => triggerCallback(value), ms);
  }

  function onBlur(e: FocusEvent<HTMLInputElement>) {
    if (isEmpty(e.target.value)) e.target.value = e.target.defaultValue;
  }

  async function triggerCallback(value: string) {
    callback(value);
    if (timer.current) clearTimeout(timer.current);
  }
  // clear timer
  useEffect(() => () => clearTimeout(timer.current!), []);

  return { onChange, onBlur };
}
