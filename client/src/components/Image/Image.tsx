import React, { forwardRef } from "react";
import { ImageContainer } from "../styles/ImageStyles";
import { IImage } from "../../types/style.types";

interface IProps {
  image: IImage;
  onClick(): void;
}

const Image = forwardRef<HTMLDivElement, IProps>(({ image, onClick }, ref) => {
  return (
    <ImageContainer ref={ref} onClick={onClick}>
      <img src={image.url} alt={image.alt} />
    </ImageContainer>
  );
});

export default Image;
