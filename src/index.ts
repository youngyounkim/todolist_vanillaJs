import { getElementById } from './utils/getElement';
import handleInput from './event/handleSubmit';

import './css/style.css';

const listArr = [];

const handleUpdate = () => {
  console.log(listArr);
};

const init = () => {
  handleInput(listArr, handleUpdate);
};

window.addEventListener('load', () => {
  init();
});
