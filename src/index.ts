import { getElementById } from './utils/getElement';
import handleInput from './event/handleSubmit';
import { addItem, renderList } from './event/listEvent';

import './css/style.css';

const init = () => {
  const listArr: string[] = [];
  renderList(listArr);
  handleInput(listArr, addItem);
};

window.addEventListener('load', () => {
  init();
});
