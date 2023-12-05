import { getElementById } from '../utils/getElement';

interface IrenderList {
  (listArr: HTMLLIElement[]): void;
}

const listBox = getElementById<HTMLUListElement>('list_box');

/**
 * 전달된 배열을 listBox에 랜더링
 * @param listArr {HTMLLIElement[]} 랜더링할 리스트 배열
 */
export const renderList: IrenderList = (listArr) => {
  listBox.replaceChildren(...listArr);
};
