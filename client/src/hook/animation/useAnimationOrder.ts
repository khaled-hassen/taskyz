export function useAnimationOrder(classSuffix?: string) {
  const className = `item-${classSuffix}`;
  const animationClassName = "slide-up-animation";

  function handleEnter(order: string) {
    return (node: HTMLElement) => {
      node.classList.add(className);
      node.style.setProperty("--order", order);
    };
  }

  function handleExit(order: string) {
    return (node: HTMLElement) => node.style.setProperty("--order", order);
  }

  function handleExited(idx: number) {
    if (!classSuffix) return undefined;
    return () => {
      const itemsNodes = document.getElementsByClassName(className);
      for (let i = idx + 1; i < itemsNodes.length; ++i) {
        const item = itemsNodes.item(i);
        if (!item) continue;
        item.classList.add(animationClassName);
        item.addEventListener("animationend", () =>
          item.classList.remove(animationClassName)
        );
      }
    };
  }

  return { handleEnter, handleExit, handleExited };
}
