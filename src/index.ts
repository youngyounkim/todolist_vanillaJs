import handleInput from './event/handleSubmit';
import { addItem, completedList } from './event/listEvent';
import { handleRenderingSortItem, handleSortList } from './event/sortEvent';
import { renderList } from './event/renderEvent';

import './css/style.css';
import './css/reset.css';
import { getElementByClassName, getElementById } from './utils/getElement';
import { dragEvent } from './event/dragEvent';

const init = () => {
  const listArr: HTMLLIElement[] = [];
  renderList(listArr);
  handleInput(listArr, addItem);

  const listBox = getElementById<HTMLUListElement>('list_box');
  const selectedBTN = getElementByClassName('seleted_BTN');

  const selectItem = (e: Event) => {
    let target = e.target as HTMLElement;

    if (target.className === 'list_title') {
      target = target.parentNode as HTMLElement;
    } else if (target.className.indexOf('list_item') === -1) {
      return;
    }

    if (target.className.indexOf('selected') !== -1) {
      target.className = 'list_item';
    } else {
      target.className += ' selected';
    }

    handleRenderingSortItem(listArr, selectedBTN[0] as HTMLButtonElement);
  };

  listBox.addEventListener('click', selectItem);

  handleSortList(listArr);

  completedList(listArr);

  dragEvent(listArr);
};

window.addEventListener('load', () => {
  init();
});
