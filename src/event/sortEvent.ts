import { getElementByClassName } from '../utils/getElement';
import { renderList } from './renderEvent';

interface IhandleSortList {
  (listArr: HTMLLIElement[]): void;
}

export const handleSortList: IhandleSortList = (listArr) => {
  const buttons = getElementByClassName('sorting_button');

  Array.from(buttons).forEach((el) => {
    el.addEventListener('click', (e) => {
      const target = e.target as HTMLButtonElement;

      switch (target.textContent) {
        case 'All':
          renderList(listArr);
          break;
        case 'Active':
          const activeArr = listArr.filter((el) => {
            if (el.className.indexOf('select') === -1) {
              return true;
            }
            return false;
          });
          renderList(activeArr);

          break;
        case 'Completed':
          const completedArr = listArr.filter((el) => {
            if (el.className.indexOf('select') !== -1) {
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
    });
  });
};
