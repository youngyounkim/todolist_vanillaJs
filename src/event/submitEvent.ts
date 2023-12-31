import { getElementById } from '../utils/getElement';

interface IhandleSubmit {
  (
    listArr: HTMLLIElement[],
    callback: (itemNmae: string, listArr: HTMLLIElement[], listbox: HTMLElement) => void,
    listbox: HTMLElement,
  ): void;
}

/**
 *
 * @param listArr {string[]} todoList의 아이템 배열
 * @param callback {function} 리스트가 추가될 때 실행될 callback 함수
 */

export const addSubmitEvent: IhandleSubmit = (listArr, callback, listBox) => {
  const inputForm = getElementById<HTMLElement>('input_form');
  const input = getElementById<HTMLInputElement>('to_do_input');

  inputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input && input.value !== '') {
      callback(input.value, listArr, listBox);
      input.value = '';
    }
  });
};
