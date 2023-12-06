import { fireEvent } from '@testing-library/dom';

import render from './testUtils/render';
import document from './testUtils/document';

import { addListItem } from '../utils/setListElement';
import { addSubmitEvent } from '../event/submitEvent';

render(`<section class="list_wrap">
<form id="input_form">
  <input id="to_do_input" placeholder="Create your schedule" />
</form>
<span class="button_wrap">
  <button class="sorting_button seleted_BTN">All</button>
  <button class="sorting_button">Active</button>
  <button class="sorting_button">Completed</button>
</span>
<ul id="list_box"></ul>
<div class="completed_wrap">
  <button id="completed_button">Clear Completed</button>
</div>
</section>`);

describe('submit event 테스트', () => {
  const listArr: HTMLLIElement[] = [];

  const listBox = document.getElementById('list_box');
  const input = document.getElementById('to_do_input');
  input.value = 'todo';

  addSubmitEvent(listArr, addListItem, listBox);

  test('submit input 초기화 테스트', () => {
    fireEvent.submit(input);

    expect(input.value).toEqual('');
  });

  test('todolist 리스트 배열 추가 테스트', () => {
    fireEvent.submit(input);

    const listItem = listArr[0];
    expect(listItem.textContent.indexOf('todo')).not.toEqual(-1);
  });

  test('todolist ul 추가 테스트', () => {
    fireEvent.submit(input);

    expect(listBox.firstElementChild.textContent.indexOf('todo')).not.toEqual(-1);
  });
});
