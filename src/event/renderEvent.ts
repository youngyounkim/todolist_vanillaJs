import { getElementById } from '../utils/getElement';

interface IrenderList {
  (listArr: HTMLLIElement[]): void;
}

const listBox = getElementById<HTMLUListElement>('list_box');

export const renderList: IrenderList = (listArr) => {
  listBox.replaceChildren(...listArr);
};
