import handleInput from './event/handleSubmit';
import { addItem, completedList } from './event/listEvent';
import { handleRenderingSortItem, handleSortList } from './event/sortEvent';
import { renderList } from './event/renderEvent';

import './css/style.css';
import { getElementByClassName, getElementById } from './utils/getElement';

const init = () => {
  const listArr: HTMLLIElement[] = [];
  renderList(listArr);
  handleInput(listArr, addItem);

  const listBox = getElementById<HTMLUListElement>('listBox');
  const selectedBTN = getElementByClassName('seleted_BTN');

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

    handleRenderingSortItem(listArr, selectedBTN[0] as HTMLButtonElement);
  };

  listBox.addEventListener('click', selectItem);

  handleSortList(listArr);

  completedList(listArr);
};

window.addEventListener('load', () => {
  init();
});
