import React, { useState } from "react";
import { CardContainer } from "../styles/CardContainer";
import Modal from "./Modal";
import { CustomizationModalContainer } from "../styles/ModalStyles";
import { useSearchImage } from "../../hook/image/useSearchImage";
import { useOpenImage } from "../../hook/image/useOpenImage";
import { useRecentlyOpened } from "../../hook/image/useRecentlyOpened";
import loadable from "@loadable/component";

const SearchImage = loadable(() => import("../Customization/SearchImage"));
const Customization = loadable(() => import("../Customization/Customization"));
const ColorCustomizer = loadable(
  () => import("../Customization/ColorCustomizer")
);

enum EOperation {
  NONE,
  SEARCH,
  CHANGE_COLORS,
}

interface IProps {
  show: boolean;
  onClose(): void;
}

const CustomizationModal: React.FC<IProps> = (props) => {
  const {
    clearResults,
    input,
    lastElementRef,
    ...searchRest
  } = useSearchImage();
  const { recentlyOpened, saveImage } = useRecentlyOpened();
  const { image, showImage, openImage, closeImage } = useOpenImage(saveImage);
  const [operation, setOperation] = useState(EOperation.NONE);

  return (
    <Modal large show={props.show} onClose={props.onClose}>
      <CustomizationModalContainer>
        <CardContainer noBorderSmall>
          {operation === EOperation.SEARCH && (
            <SearchImage
              ref={{ current: { lastElementRef, input } }}
              recentlyOpened={recentlyOpened}
              image={image}
              showImage={showImage}
              closeImage={closeImage}
              openImage={openImage}
              {...searchRest}
              onClose={() => setOperation(EOperation.NONE)}
            />
          )}
          {operation === EOperation.NONE && (
            <Customization
              image={image}
              showImage={showImage}
              openImage={openImage}
              closeImage={closeImage}
              onSearch={() => setOperation(EOperation.SEARCH)}
              onChangeColors={() => setOperation(EOperation.CHANGE_COLORS)}
              onClose={props.onClose}
            />
          )}
          {operation === EOperation.CHANGE_COLORS && (
            <ColorCustomizer onClose={() => setOperation(EOperation.NONE)} />
          )}
        </CardContainer>
      </CustomizationModalContainer>
    </Modal>
  );
};

export default CustomizationModal;
