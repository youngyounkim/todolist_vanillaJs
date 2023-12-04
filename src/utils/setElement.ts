interface IsetElement {
  (
    name: keyof HTMLElementTagNameMap,
    content?: string,
    InsertPosition?: 'afterbegin' | 'afterend' | 'beforebegin' | 'beforeend',
  ): HTMLElementTagNameMap[keyof HTMLElementTagNameMap];
}

export const setElement: IsetElement = (name, content, InsertPosition = 'afterbegin') => {
  const target = document.createElement(name);
  if (content) {
    target.insertAdjacentHTML(InsertPosition, content);
  }
  return target;
};
