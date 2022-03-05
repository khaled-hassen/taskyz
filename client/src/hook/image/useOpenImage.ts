import { useState } from "react";
import { IImage } from "../../types/style.types";

export function useOpenImage(saveImage: (image: IImage) => Promise<any>) {
  const [showImage, setShowImage] = useState(false);
  const [image, setImage] = useState<IImage | null>(null);

  function openImage(image: IImage) {
    setShowImage(true);
    setImage(image);
    // save recently opened images
    saveImage(image).then().catch();
  }

  function closeImage() {
    setShowImage(false);
    setImage(null);
  }

  return { showImage, image, openImage, closeImage };
}
