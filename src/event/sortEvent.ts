import { getElementByClassName } from '../utils/getElement';
import { renderList } from './renderEvent';

interface IhandleRenderingSortingItem {
  (listArr: HTMLLIElement[], target: HTMLButtonElement): void;
}

interface IhandleSortList {
  (listArr: HTMLLIElement[], buttons: HTMLCollectionOf<Element>): void;
}

/**
 * 소팅 버튼 클릭 시 클릭 된 버튼을 기준으로 sorting하여 리스트를 리랜더링 하기 위한 함수
 * @param listArr {HTMLLIElement[]} 랜더링 할 리스트
 * @param target 선택된 button element
 */
export const handleRenderingSortingItem: IhandleRenderingSortingItem = (listArr, target) => {
  switch (target.textContent) {
    case 'All':
      renderList(listArr);
      break;

    case 'Active':
      const activeArr = listArr.filter((item) => {
        if (item.className.indexOf('select') === -1) {
          return true;
        }
        return false;
      });
      renderList(activeArr);
      break;

    case 'Completed':
      const completedArr = listArr.filter((item) => {
        if (item.className.indexOf('select') !== -1) {
          return true;
        }
        return false;
      });
      renderList(completedArr);
      break;

    default:
      renderList(listArr);
      break;
  }
};

/**
 * todolist를 sorting하기 위해 button에 이벤트를 추가
 * @param listArr {HTMLLIElement[]} 이밴트 실행 시 갱신하여 랜더링할 리스트
 */
export const addSortingListEvent: IhandleSortList = (listArr, buttons) => {
  Array.from(buttons).forEach((el) => {
    el.addEventListener('click', (e) => {
      const target = e.target as HTMLButtonElement;

      Array.from(buttons).forEach((el) => {
        el.classList.remove('seleted_BTN');
      });

      target.classList.add('seleted_BTN');

      handleRenderingSortingItem(listArr, target);
    });
  });
};
