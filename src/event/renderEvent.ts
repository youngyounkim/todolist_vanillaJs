import { getElementById } from '../utils/getElement';

interface IrenderList {
  (listArr: HTMLLIElement[]): void;
}

const listBox = getElementById<HTMLUListElement>('listBox');

export const renderList: IrenderList = (listArr) => {
  listBox.replaceChildren(...listArr);
};
