import { getElementByClassName, getElementById } from '../utils/getElement';
import { setElement } from '../utils/setElement';
import { renderList } from './renderEvent';
import { handleRenderingSortItem } from './sortEvent';

interface IaddItem {
  (itemName: string, listArr: HTMLLIElement[]): void;
}

const listBox = getElementById<HTMLUListElement>('listBox');

const setLiItem = (itemName: string, listArr: HTMLLIElement[]) => {
  const item = setElement('li', `<p class="li_content">${itemName}</p>`);

  item.className += 'listItem';

  const button = setElement('button');

  button.addEventListener('click', (e: Event) => {
    const element = e.target as Element;
    const parent = element.parentNode;
    listArr.forEach((el, idx) => {
      if (el === item) {
        listArr.splice(idx, 1);
      }
    });
    listBox.removeChild(parent);
  });
  button.textContent = '삭제';

  item.appendChild(button);
  return item;
};

export const addItem: IaddItem = (itemName, listArr) => {
  const item = setLiItem(itemName, listArr);
  listArr.unshift(item as HTMLLIElement);
  listBox.prepend(item);
};

export const completedList = (listArr: HTMLLIElement[]) => {
  const button = getElementById<HTMLButtonElement>('completed_button');
  const selectedBTN = getElementByClassName('seleted_BTN');

  button.addEventListener('click', () => {
    for (let i = 0; i < listArr.length; i++) {
      if (listArr[i].className.indexOf('selected') !== -1) {
        listArr.splice(i, 1);
        i--;
      }
    }
    handleRenderingSortItem(listArr, selectedBTN[0] as HTMLButtonElement);
  });
};
