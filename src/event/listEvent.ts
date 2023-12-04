import { getElementById } from '../utils/getElement';
import { setElement } from '../utils/setElement';

interface IaddItem {
  (itemName: string, listArr: HTMLLIElement[]): void;
}

const listBox = getElementById<HTMLUListElement>('listBox');

const selectItem = (e: Event) => {
  let target = e.target as Element;

  if (target.className === 'li_content') {
    target = target.parentNode as Element;
  } else if (target.className.indexOf('listItem') === -1) {
    return;
  }

  if (target.className.indexOf('selected') !== -1) {
    target.className = 'listItem';
  } else {
    target.className += ' selected';
  }
};

listBox.addEventListener('click', selectItem);

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
  console.log(listArr);
};
