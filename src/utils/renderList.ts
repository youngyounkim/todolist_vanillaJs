import { getElementById } from './getElement';

interface IrenderList {
  (listArr: HTMLLIElement[], listBox?: HTMLElement): void;
}

/**
 * 전달된 배열을 listBox에 랜더링
 * @param listArr {HTMLLIElement[]} 랜더링할 리스트 배열
 * @param listBox {HTMLElement} 아이템을 추가할 타겟 element
 */
export const renderList: IrenderList = (listArr, listBox) => {
  if (!listBox) {
    listBox = getElementById<HTMLElement>('list_box');
  }
  listBox.replaceChildren(...listArr);
};
