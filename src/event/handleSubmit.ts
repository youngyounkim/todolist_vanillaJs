import { getElementById } from '../utils/getElement';

interface IhandleSubmit {
  (listArr: string[], callback: () => void): void;
}

/**
 *
 * @param listArr {string[]} todoList의 아이템 배열
 * @param callback {function}
 */
const handleSubmit: IhandleSubmit = (listArr, callback) => {
  const inputForm = getElementById<HTMLElement>('inputForm');
  const input = getElementById<HTMLInputElement>('toDoInput');

  inputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input && input.value !== '') {
      listArr.unshift(input.value);
      input.value = '';
      callback();
    }
  });
};

export default handleSubmit;
