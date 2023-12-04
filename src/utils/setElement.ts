interface IsetElement {
  (name: keyof HTMLElementTagNameMap, content?: string): HTMLElementTagNameMap[keyof HTMLElementTagNameMap];
}

/**
 *
 * @param name {tagname} 생성할 html tag 이름
 * @param content {string} 생성한 tag에 자식 콘텐츠로 추가될 정보
 * @returns
 */

export const setElement: IsetElement = (name, content) => {
  const target = document.createElement(name);
  if (content) {
    target.insertAdjacentHTML('afterbegin', content);
  }
  return target;
};
