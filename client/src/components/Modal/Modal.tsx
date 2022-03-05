import React from "react";
import ReactDOM from "react-dom";
import { ModalContainer } from "../styles/ModalStyles";
import { CSSTransition } from "react-transition-group";

interface IProps {
  show: boolean;
  large?: boolean;
  onClose(): void;
}

const Modal: React.FC<IProps> = (props) => {
  function handleEscape({ key }: React.KeyboardEvent) {
    if (key === "Escape") props.onClose();
  }

  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      timeout={300}
      classNames="fade"
      mountOnEnter
      unmountOnExit
    >
      <ModalContainer
        large={props.large}
        onMouseDown={props.onClose}
        onKeyDown={handleEscape}
      >
        {React.Children.map(props.children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child, {
                onMouseDown: (e: any) => e.stopPropagation(),
              })
            : child
        )}
      </ModalContainer>
    </CSSTransition>,
    document.getElementById("modal")!
  );
};

export default Modal;
