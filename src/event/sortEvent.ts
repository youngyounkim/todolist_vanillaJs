import { getElementByClassName } from '../utils/getElement';
import { renderList } from './renderEvent';

interface IhandleSortList {
  (listArr: HTMLLIElement[]): void;
}

export const handleRenderingSortItem = (listArr: HTMLLIElement[], target: HTMLButtonElement) => {
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

export const handleSortList: IhandleSortList = (listArr) => {
  const buttons = getElementByClassName('sorting_button');

  Array.from(buttons).forEach((el) => {
    el.addEventListener('click', (e) => {
      const target = e.target as HTMLButtonElement;

      Array.from(buttons).forEach((el) => {
        el.classList.remove('seleted_BTN');
      });

      target.className += ' seleted_BTN';

      handleRenderingSortItem(listArr, target);
    });
  });
};
