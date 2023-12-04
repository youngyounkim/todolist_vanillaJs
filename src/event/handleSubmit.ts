import { getElementById } from '../utils/getElement';

interface IhandleSubmit {
  (listArr: string[], callback: (itemNmae: string) => void): void;
}

/**
 *
 * @param listArr {string[]} todoList의 아이템 배열
 * @param callback {function} 리스트가 추가될 때 실행될 callback 함수
 */

const handleSubmit: IhandleSubmit = (listArr, callback) => {
  const inputForm = getElementById<HTMLElement>('inputForm');
  const input = getElementById<HTMLInputElement>('toDoInput');

  inputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input && input.value !== '') {
      listArr.unshift(input.value);
      callback(input.value);
      input.value = '';
    }
  });
};

export default handleSubmit;
