import React from "react";
import { CardContainer } from "../styles/CardContainer";
import Modal from "../Modal/Modal";
import Row from "../styles/Row";
import { DangerButton, SuccessButton } from "../styles/Button";
import { H2, P } from "../styles/Text";

interface IProps {
  show: boolean;
  onReset(): void;
  onClose(): void;
}

const ResetConfigWarning: React.FC<IProps> = (props) => {
  function handleReset() {
    props.onReset();
    props.onClose();
  }

  return (
    <Modal show={props.show} onClose={props.onClose}>
      <CardContainer className="h-fit">
        <div className="flex flex-col">
          <H2>Reset config warning</H2>
          <P className="mt-5 mb-10">
            Are you sure want the reset your configuration to the default value
            ?
          </P>
          <Row between>
            <div className="w-24">
              <DangerButton className="py-1" onClick={handleReset}>
                Reset
              </DangerButton>
            </div>
            <div className="w-24">
              <SuccessButton className="py-1" onClick={props.onClose}>
                Cancel
              </SuccessButton>
            </div>
          </Row>
        </div>
      </CardContainer>
    </Modal>
  );
};

export default ResetConfigWarning;
