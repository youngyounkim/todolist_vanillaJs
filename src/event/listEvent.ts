import { getElementByClassName, getElementById } from '../utils/getElement';
import { setElement } from '../utils/setElement';
import { handleRenderingSortingItem } from './sortEvent';

interface IaddSelectListItemEvent {
  (listArr: HTMLLIElement[], listBox: HTMLElement): void;
}

interface IaddCompletedListEvent {
  (listArr: HTMLLIElement[], button: HTMLButtonElement): void;
}

/**
 * 클릭 시 완료된 todolist를 제거하는 이벤트
 * @param listArr {HTMLLIElement[]} 랜더링되는 리스트 배열
 * @param button {HTMLButtonElement} 클릭 될 이벤트
 */
export const addCompletedListEvent: IaddCompletedListEvent = (listArr, button) => {
  const selectedBTN = getElementByClassName('seleted_BTN');

  button.addEventListener('click', () => {
    for (let i = 0; i < listArr.length; i++) {
      if (listArr[i].className.indexOf('selected') !== -1) {
        listArr.splice(i, 1);
        i--;
      }
    }
    handleRenderingSortingItem(listArr, selectedBTN[0] as HTMLButtonElement);
  });
};

/**
 * 리스트의 아이템을 선택하여 selected 되도록 하는 이벤트
 * @param listArr {HTMLLIElement[]} 랜더링되는 리스트 배열
 * @param listBox {HTMLElement} 이벤트를 넣을 element
 */
export const addSelectListItemEvent: IaddSelectListItemEvent = (listArr, listBox) => {
  const selectedBTN = getElementByClassName('seleted_BTN');

  const selectItem = (e: Event) => {
    let target = e.target as HTMLElement;

    if (target.className === 'list_title') {
      target = target.parentNode as HTMLElement;
    } else if (target.className.indexOf('list_item') === -1) {
      return;
    }

    if (target.className.indexOf('dragging') === -1) {
      return;
    }

    if (target.className.indexOf('selected') !== -1) {
      target.classList.remove('selected');
    } else {
      target.classList.add('selected');
    }

    handleRenderingSortingItem(listArr, selectedBTN[0] as HTMLButtonElement);
  };

  listBox.addEventListener('mouseup', selectItem);
};
