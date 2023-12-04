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

export const addItem: IaddItem = (itemName) => {
  const item = setElement('li', `<p>${itemName}</p><button>제거</button>`);
  listBox.appendChild(item);
};
