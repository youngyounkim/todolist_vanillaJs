import { getElementById } from './utils/getElement';
import handleInput from './event/handleSubmit';
import { addItem, renderList } from './event/listEvent';

import './css/style.css';
import { handleSortList } from './event/sortEvent';

const init = () => {
  const listArr: HTMLLIElement[] = [];
  renderList(listArr);
  handleInput(listArr, addItem);
  handleSortList(listArr);
};

window.addEventListener('load', () => {
  init();
});
