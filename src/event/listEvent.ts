import { getElementById } from '../utils/getElement';
import { setElement } from '../utils/setElement';

interface IrenderList {
  (listArr: string[]): void;
}

interface IaddItem {
  (itemName: string): void;
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

const deleteItem = (e: Event) => {
  const element = e.target as Element;
  const parent = element.parentNode;
  listBox.removeChild(parent);
};

const setLiItem = (itemName: string) => {
  const item = setElement('li', `<p class="li_content">${itemName}</p>`);

  item.className += 'listItem';

  const button = setElement('button');

  button.addEventListener('click', deleteItem);
  button.textContent = '삭제';

  item.appendChild(button);
  return item;
};

export const addItem: IaddItem = (itemName) => {
  const item = setLiItem(itemName);
  listBox.appendChild(item);
};

export const renderList: IrenderList = (listArr) => {
  const items = listArr.map((el) => setLiItem(el));
  listBox.replaceChildren(...items);
};
