import { addSubmitEvent } from './event/submitEvent';
import { addListItem, addCompletedListEvent, addSelectListItemEvent } from './event/listEvent';
import { addSortingListEvent } from './event/sortEvent';
import { renderList } from './event/renderEvent';
import { addDropTargetEvent, dragEvent } from './event/dragEvent';

import './css/style.css';
import './css/reset.css';
import { getElementByClassName, getElementById } from './utils/getElement';

const init = () => {
  const listArr: HTMLLIElement[] = [];

  const listBox = getElementById<HTMLElement>('list_box');
  const sortingBtn = getElementByClassName('sorting_button');
  const completedButton = getElementById<HTMLButtonElement>('completed_button');

  renderList(listArr);

  addSubmitEvent(listArr, addListItem, listBox);

  addSortingListEvent(listArr, sortingBtn);

  addSelectListItemEvent(listArr, listBox);

  addCompletedListEvent(listArr, completedButton);

  dragEvent(listArr, listBox);

  addDropTargetEvent();
};

window.addEventListener('load', () => {
  init();
});
