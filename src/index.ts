import handleInput from './event/handleSubmit';
import { addItem } from './event/listEvent';
import { handleSortList } from './event/sortEvent';
import { renderList } from './event/renderEvent';

import './css/style.css';

const init = () => {
  const listArr: HTMLLIElement[] = [];
  renderList(listArr);
  handleInput(listArr, addItem);
  handleSortList(listArr);
};

window.addEventListener('load', () => {
  init();
});
