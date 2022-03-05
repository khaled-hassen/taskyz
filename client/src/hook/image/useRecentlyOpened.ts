import { useEffect, useState } from "react";
import { IImage } from "../../types/style.types";

export function useRecentlyOpened() {
  const keyName = "recently-opened";
  const maxRecent = 6;
  const [recentlyOpened, setRecentlyOpened] = useState<IImage[]>([]);

  function saveImageLocalstorage(image: IImage) {
    const cache = localStorage.getItem(keyName);
    if (cache) {
      const recentlyOpened: IImage[] = JSON.parse(cache);
      // find if the image exists
      const idx = recentlyOpened.findIndex((img) => img.url === image.url);
      recentlyOpened.unshift(image);
      if (idx !== -1) recentlyOpened.splice(idx + 1, 1); // remove duplicate
      localStorage.setItem(
        keyName,
        JSON.stringify(recentlyOpened.slice(0, maxRecent))
      );
    } else localStorage.setItem(keyName, JSON.stringify([image]));
  }

  function saveImageInMemory(image: IImage) {
    setRecentlyOpened((prev) => {
      const idx = prev.findIndex((img) => img.url === image.url);
      if (idx === -1) return [image, ...prev].slice(0, maxRecent);
      return [image, ...prev.slice(0, idx), ...prev.slice(idx + 1)].slice(
        0,
        maxRecent
      );
    });
  }

  function saveImage(image: IImage) {
    saveImageInMemory(image);

    return new Promise((resolve) => {
      saveImageLocalstorage(image);
      resolve(true);
    });
  }

  function getRecentlyOpened(): Promise<IImage[]> {
    return new Promise((resolve) => {
      const cache = localStorage.getItem(keyName);
      if (!cache) resolve([]);
      else resolve(JSON.parse(cache));
    });
  }

  useEffect(() => {
    getRecentlyOpened().then((images) => setRecentlyOpened(images));
  }, []);

  return { recentlyOpened, saveImage };
}
