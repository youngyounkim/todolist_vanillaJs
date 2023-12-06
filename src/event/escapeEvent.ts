import { getElementByClassName } from '../utils/getElement';
import { handleRenderingSortingItem } from './sortEvent';

interface IaddKeyboardEvent {
  (listArr: HTMLLIElement[], listBox: HTMLElement): void;
}

/**
 * esc 키 입력 시 모든 이벤트를 종료하는 이벤트
 * @param listArr {HTMLLIElement[]} 랜더링되는 리스트 배열
 */
export const addEscapeKeyboardEvent: IaddKeyboardEvent = (listArr) => {
  const selectedBTN = getElementByClassName('seleted_BTN');
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      listArr.map((el) => {
        el.classList?.remove('drop_target', 'dragging');
      });
      handleRenderingSortingItem(listArr, selectedBTN[0] as HTMLButtonElement);
    }
  });
};
