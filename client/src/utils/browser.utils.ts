export const getBackdropSupport = () =>
  CSS.supports("backdrop-filter", "blur()");

export const getIsTouchScreen = () =>
  "ontouchstart" in document.documentElement;
