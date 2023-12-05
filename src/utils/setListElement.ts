import { setElement } from './setElement';

interface IsetLiItem {
  (
    itemName: string,
    listArr: HTMLLIElement[],
    listBox: HTMLElement,
  ): HTMLElementTagNameMap[keyof HTMLElementTagNameMap];
}

interface IaddItem {
  (itemName: string, listArr: HTMLLIElement[], listBox: HTMLElement): void;
}

/**
 * 추가할 아이템 element를 생성하는 함수
 * @param itemName 추가할 todolist의 이름
 * @param listArr {HTMLLIElement[]} 랜더링되는 리스트 배열
 * @returns 생성된 element를 반환
 */
const setLiItem: IsetLiItem = (itemName, listArr, listBox) => {
  const item = setElement('li', `<p class="list_title">${itemName}</p>`);

  item.classList.add('list_item');

  const button = setElement('button');

  item.addEventListener('mousedown', () => {
    item.classList.add('dragging');
  });

  button.addEventListener('click', (e: Event) => {
    const element = e.target as Element;
    const parent = element.parentNode;
    listArr.forEach((el, idx) => {
      if (el === item) {
        listArr.splice(idx, 1);
      }
    });
    listBox.removeChild(parent);
  });
  button.textContent = '삭제';

  item.appendChild(button);
  return item;
};

/**
 * todolist에 아이템을 추가하는 이벤트
 * @param itemName 추가할 todolist의 이름
 * @param listArr {HTMLLIElement[]} 랜더링되는 리스트 배열
 */
export const addListItem: IaddItem = (itemName, listArr, listBox) => {
  const item = setLiItem(itemName, listArr, listBox);
  listArr.unshift(item as HTMLLIElement);
  listBox.prepend(item);
};