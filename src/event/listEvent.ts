import { getElementById } from '../utils/getElement';
import { setElement } from '../utils/setElement';

interface IrenderList {
  (listArr: string[]): void;
}

interface IaddItem {
  (itemName: string): void;
}

const listBox = getElementById<HTMLUListElement>('listBox');

export const renderList: IrenderList = (listArr) => {};

const deleteItem = (e: Event) => {
  const element = e.target as Element;
  const parent = element.parentNode;
  listBox.removeChild(parent);
};

export const addItem: IaddItem = (itemName) => {
  const item = setElement('li', `<p>${itemName}</p>`);
  const button = setElement('button');

  button.addEventListener('click', deleteItem);
  button.textContent = '삭제';

  item.appendChild(button);
  listBox.appendChild(item);
};
