import { getElementById } from './utils/getElement';
import handleInput from './event/handleSubmit';
import { addItem } from './event/listEvent';

import './css/style.css';

const listArr = [];

const handleUpdate = () => {
  console.log(listArr);
};

const init = () => {
  handleInput(listArr, addItem);
};

window.addEventListener('load', () => {
  init();
});
