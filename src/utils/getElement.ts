export const getElementById = <T>(id): T => {
  const target = document.getElementById(id) as T | null;

  return target;
};

export const getElementByClassName = (name): HTMLCollectionOf<Element> => {
  const target = document.getElementsByClassName(name) as HTMLCollectionOf<Element> | null;

  return target;
};
