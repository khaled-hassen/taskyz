import React, { useRef } from "react";
import { IconInputContainer } from "../styles/Input";
import { IInputForm } from "../../types/form.types";
import DatePicker from "../DatePicker/DatePicker";
import { useInput } from "../../hook/input/useInput";
import { IconButton } from "../styles/Button";
import PlusIcon from "../icons/PlusIcon";

interface IProps {
  error: string;
  placeholder: string;
  className?: string;
  withDatePicker?: boolean;
  onAdd(data: IInputForm): void;
}

const AddInput: React.FC<IProps> = (props) => {
  const {
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
  } = useInput(props.error, props.onAdd, props.withDatePicker);

  // to prevent submitting when focusing on input
  const firstTime = useRef(true);
  function handleAddClick(e: React.MouseEvent<HTMLButtonElement>) {
    const { clientX, clientY } = e.nativeEvent; // to submit for the first time when hitting the Enter key

    if (firstTime.current && clientX !== 0 && clientY !== 0) {
      e.preventDefault();
      input.current?.focus();
      firstTime.current = false;
    }
  }

  return (
    <IconInputContainer
      expanded={expanded}
      className={props.className}
      ref={container}
      onSubmit={submit}
      onClick={handleClick}
    >
      <div className="flex">
        <IconButton aria-label="Add" type="submit" onClick={handleAddClick}>
          <PlusIcon />
        </IconButton>
        <input
          autoComplete="off"
          placeholder={props.placeholder}
          onKeyDown={handleEscape}
          {...rest}
          ref={(elem) => {
            input.current = elem;
            ref(elem);
          }}
        />
      </div>
      {expanded && (
        <div className="mt-2">
          <DatePicker
            initialValue={date}
            onChange={handleDateChange}
            onClear={handleDateChange}
          />
        </div>
      )}
    </IconInputContainer>
  );
};

export default AddInput;
